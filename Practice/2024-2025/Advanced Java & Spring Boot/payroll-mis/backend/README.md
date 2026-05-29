# Government ERP Payroll Management System

A production-ready REST API backend for Government ERP Payroll Management System built with Spring Boot 3, Java 21, PostgreSQL, and JWT authentication.

## 🚀 Features

- **Authentication & Authorization**
  - JWT-based authentication with access and refresh tokens
  - Role-based access control (ADMIN, MANAGER, EMPLOYEE)
  - BCrypt password encryption
  - Secure endpoints with Spring Security

- **Employee Management**
  - CRUD operations for employees
  - Employee search and filtering
  - Status management (ACTIVE, INACTIVE, SUSPENDED, TERMINATED)
  - Pagination and sorting support

- **Payroll Processing**
  - Automated payroll calculation
  - Monthly payroll processing
  - Configurable deductions (Tax, Pension, Medical Insurance, etc.)
  - Allowances (House, Transport)
  - Payroll approval workflow

- **Payslip Management**
  - Automatic payslip generation
  - PDF payslip download
  - Employee access to own payslips
  - Payment status tracking

- **Deduction Management**
  - Dynamic deduction configuration
  - Percentage-based calculations
  - Active/inactive deduction management

- **Employee Notifications**
  - Automatic payment notifications
  - Message history tracking
  - Read/unread status

- **Database Features**
  - PostgreSQL triggers for payroll approval
  - Stored procedures for salary calculations
  - Audit logging
  - Soft delete support

## 🛠️ Technology Stack

- **Java 21**
- **Spring Boot 3.3.0**
- **Spring Security** with JWT
- **Spring Data JPA** with Hibernate
- **PostgreSQL** database
- **MapStruct** for DTO mapping
- **Lombok** for boilerplate reduction
- **Swagger/OpenAPI** for API documentation
- **Maven** for dependency management
- **BCrypt** for password hashing

## 📋 Prerequisites

- Java 21 or higher
- Maven 3.8+
- PostgreSQL 14+
- Git

## 🔧 Installation & Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd spring-boot-2025
```

### 2. Configure PostgreSQL

Create a PostgreSQL database:

```sql
CREATE DATABASE payroll_erp;
```

### 3. Update application configuration

Edit `src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/payroll_erp
    username: your_username
    password: your_password
```

### 4. Build the project

```bash
mvn clean install
```

### 5. Run the application

```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

## 📚 API Documentation

Once the application is running, access the Swagger UI at:

```
http://localhost:8080/swagger-ui.html
```

API documentation is also available at:

```
http://localhost:8080/api-docs
```

## 🔐 Default Users

The system comes with pre-configured test users:

| Email | Password | Role |
|-------|----------|------|
| admin@gov.rw | Admin@123 | ROLE_ADMIN |
| manager@gov.rw | Manager@123 | ROLE_MANAGER |
| employee@gov.rw | Employee@123 | ROLE_EMPLOYEE |

## 📡 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/refresh` - Refresh access token
- `GET /api/v1/auth/me` - Get current user

### Employees
- `GET /api/v1/employees` - Get all employees (paginated)
- `GET /api/v1/employees/{id}` - Get employee by ID
- `POST /api/v1/employees` - Create employee
- `PUT /api/v1/employees/{id}` - Update employee
- `DELETE /api/v1/employees/{id}` - Delete employee
- `GET /api/v1/employees/search?query={query}` - Search employees

### Payroll
- `POST /api/v1/payroll/process` - Process payroll
- `GET /api/v1/payroll` - Get all payrolls (paginated)
- `GET /api/v1/payroll/{id}` - Get payroll by ID
- `PUT /api/v1/payroll/{id}/approve` - Approve payroll

### Payslips
- `GET /api/v1/payslips/my` - Get my payslips (paginated)
- `GET /api/v1/payslips/{id}` - Get payslip by ID
- `GET /api/v1/payslips/{id}/download` - Download payslip PDF

### Deductions
- `GET /api/v1/deductions` - Get all deductions
- `PUT /api/v1/deductions/{id}` - Update deduction

### Messages
- `GET /api/v1/messages/my` - Get my messages (paginated)
- `GET /api/v1/messages` - Get all messages (Admin/Manager only)

## 🔒 Security

### JWT Authentication

All protected endpoints require a valid JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Role-Based Access Control

- **ROLE_ADMIN**: Full system access
  - Approve payroll
  - View analytics
  - Manage all resources

- **ROLE_MANAGER**: Employee and payroll management
  - Manage employees
  - Process payroll
  - Manage deductions

- **ROLE_EMPLOYEE**: Limited access
  - View own profile
  - View own payslips
  - Download payslips

## 💾 Database Schema

### Core Entities

- **users** - System users with authentication
- **roles** - User roles
- **employees** - Employee information
- **employments** - Employment details (department, position, salary)
- **payrolls** - Monthly payroll records
- **payslips** - Individual employee payslips
- **deductions** - Configurable deductions
- **messages** - Employee notifications

### Relationships

- User ↔ Employee (One-to-One)
- Employee ↔ Employment (One-to-One)
- Employee ↔ Payslip (One-to-Many)
- Payroll ↔ Payslip (One-to-Many)
- Employee ↔ Message (One-to-Many)

## 🧮 Payroll Calculation Logic

### Gross Salary Calculation
```
Gross Salary = Base Salary + House Allowance + Transport Allowance
House Allowance = Base Salary × 14%
Transport Allowance = Base Salary × 14%
```

### Deductions
```
Employee Tax = Base Salary × 30%
Pension = Base Salary × 6%
Medical Insurance = Base Salary × 5%
Others = Base Salary × 5%
Total Deductions = Employee Tax + Pension + Medical Insurance + Others
```

### Net Salary
```
Net Salary = Base Salary - Total Deductions
```

## 🐳 Docker Support

### Build Docker image

```bash
docker build -t payroll-erp:latest .
```

### Run with Docker Compose

```bash
docker-compose up -d
```

## 🧪 Testing

Run unit tests:

```bash
mvn test
```

Run integration tests:

```bash
mvn verify
```

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| DATABASE_URL | PostgreSQL connection URL | jdbc:postgresql://localhost:5432/payroll_erp |
| DATABASE_USERNAME | Database username | postgres |
| DATABASE_PASSWORD | Database password | postgres |
| JWT_SECRET | JWT signing secret | (auto-generated) |
| SERVER_PORT | Application port | 8080 |

## 🔄 Database Migrations

The application uses Hibernate's `ddl-auto` for schema management. For production, consider using Flyway or Liquibase.

## 📊 Monitoring & Logging

Logs are written to:
- Console (stdout)
- File: `logs/payroll-erp.log`

Log levels can be configured in `application.yml`.

## 🤝 Integration with Frontend

This backend is designed to work seamlessly with the Next.js frontend located at `/frontend`. 

CORS is configured to allow requests from:
- `http://localhost:3000` (development)

## 🚀 Deployment

### Production Checklist

1. Update `application-prod.yml` with production database credentials
2. Set strong JWT secret via environment variable
3. Enable HTTPS/TLS
4. Configure proper CORS origins
5. Set up database backups
6. Configure monitoring and alerting
7. Review and adjust logging levels
8. Set up CI/CD pipeline

### Running in Production

```bash
java -jar -Dspring.profiles.active=prod target/payroll-erp-1.0.0.jar
```

## 📄 License

MIT License

## 👥 Support

For support, email support@gov.rw or create an issue in the repository.

## 🎯 Future Enhancements

- [ ] Email notifications
- [ ] Advanced reporting and analytics
- [ ] Bulk employee import
- [ ] Leave management integration
- [ ] Performance reviews
- [ ] Multi-currency support
- [ ] Advanced audit logging
- [ ] Two-factor authentication

---

**Built with ❤️ for Government ERP System**
