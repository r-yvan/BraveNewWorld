# Quick Start Guide

Get the Government ERP Payroll Management System up and running in minutes!

## Prerequisites

- Java 21 installed
- PostgreSQL 14+ installed and running
- Maven 3.8+ installed

## Step 1: Database Setup

Create the PostgreSQL database:

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE payroll_erp;

# Exit
\q
```

## Step 2: Clone and Configure

```bash
# Navigate to project directory
cd spring-boot-2025

# Copy environment file
cp .env.example .env

# Edit .env with your database credentials (if different from defaults)
```

## Step 3: Build the Project

```bash
mvn clean install
```

## Step 4: Run the Application

```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

## Step 5: Verify Installation

Open your browser and navigate to:

```
http://localhost:8080/swagger-ui.html
```

You should see the Swagger API documentation.

## Step 6: Test the API

### Login as Admin

```bash
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@gov.rw",
    "password": "Admin@123"
  }'
```

Copy the `accessToken` from the response.

### Get Current User

```bash
curl -X GET http://localhost:8080/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Default Test Users

| Email | Password | Role |
|-------|----------|------|
| admin@gov.rw | Admin@123 | ROLE_ADMIN |
| manager@gov.rw | Manager@123 | ROLE_MANAGER |
| employee@gov.rw | Employee@123 | ROLE_EMPLOYEE |

## Quick Test Workflow

1. **Login as Admin** to get access token
2. **Create an Employee** using POST /api/v1/employees
3. **Process Payroll** using POST /api/v1/payroll/process
4. **Approve Payroll** using PUT /api/v1/payroll/{id}/approve
5. **Login as Employee** to view payslips
6. **View Payslips** using GET /api/v1/payslips/my
7. **Download Payslip** using GET /api/v1/payslips/{id}/download

## Using Docker (Alternative)

If you prefer Docker:

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down
```

## Troubleshooting

### Port 8080 already in use

Change the port in `application.yml`:

```yaml
server:
  port: 8081
```

### Database connection error

Verify PostgreSQL is running:

```bash
pg_isready -U postgres
```

Check database credentials in `application.yml`.

### JWT token expired

Login again to get a new token. Access tokens expire after 24 hours.

## Next Steps

- Read the [README.md](README.md) for detailed documentation
- Check [API_TESTING_GUIDE.md](API_TESTING_GUIDE.md) for complete API reference
- Explore the Swagger UI at http://localhost:8080/swagger-ui.html

## Support

For issues or questions, please create an issue in the repository.

---

**You're all set! 🎉**
