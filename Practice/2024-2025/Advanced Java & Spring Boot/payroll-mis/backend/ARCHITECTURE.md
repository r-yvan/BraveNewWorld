# System Architecture

Comprehensive architecture documentation for the Government ERP Payroll Management System.

## Table of Contents

1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Architecture Layers](#architecture-layers)
4. [Database Design](#database-design)
5. [Security Architecture](#security-architecture)
6. [API Design](#api-design)
7. [Business Logic](#business-logic)
8. [Data Flow](#data-flow)

---

## Overview

The Government ERP Payroll Management System is built using a **layered architecture** pattern with clear separation of concerns. The system follows **SOLID principles** and implements **clean code** practices.

### Key Architectural Principles

- **Separation of Concerns**: Each layer has a specific responsibility
- **Dependency Injection**: Spring's IoC container manages dependencies
- **DTO Pattern**: Data Transfer Objects for API communication
- **Repository Pattern**: Data access abstraction
- **Service Layer**: Business logic encapsulation
- **Global Exception Handling**: Centralized error management

---

## Technology Stack

### Core Technologies

- **Java 21**: Latest LTS version with modern language features
- **Spring Boot 3.3.0**: Application framework
- **Spring Security 6**: Authentication and authorization
- **Spring Data JPA**: Data persistence
- **Hibernate**: ORM framework
- **PostgreSQL 14+**: Relational database

### Supporting Libraries

- **JWT (jjwt 0.12.5)**: Token-based authentication
- **MapStruct 1.5.5**: DTO mapping
- **Lombok**: Boilerplate code reduction
- **SpringDoc OpenAPI 2.5.0**: API documentation
- **BCrypt**: Password hashing
- **Maven**: Build and dependency management

---

## Architecture Layers

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│  (Controllers, DTOs, Exception Handler) │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│          Service Layer                  │
│     (Business Logic, Validation)        │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│        Repository Layer                 │
│      (Data Access, Queries)             │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│         Database Layer                  │
│  (PostgreSQL, Triggers, Procedures)     │
└─────────────────────────────────────────┘
```

### 1. Presentation Layer

**Location**: `com.government.payroll.controller`

**Responsibilities**:
- Handle HTTP requests/responses
- Input validation
- DTO transformation
- API documentation

**Components**:
- `AuthController`: Authentication endpoints
- `EmployeeController`: Employee management
- `PayrollController`: Payroll processing
- `PayslipController`: Payslip operations
- `DeductionController`: Deduction management
- `MessageController`: Employee notifications

### 2. Service Layer

**Location**: `com.government.payroll.service`

**Responsibilities**:
- Business logic implementation
- Transaction management
- Data validation
- Authorization checks

**Components**:
- `AuthService`: Authentication and user management
- `EmployeeService`: Employee CRUD operations
- `PayrollService`: Payroll processing logic
- `PayslipService`: Payslip generation and retrieval
- `DeductionService`: Deduction management
- `MessageService`: Notification handling

### 3. Repository Layer

**Location**: `com.government.payroll.repository`

**Responsibilities**:
- Database operations
- Query execution
- Data persistence

**Components**:
- `UserRepository`
- `RoleRepository`
- `EmployeeRepository`
- `EmploymentRepository`
- `PayrollRepository`
- `PayslipRepository`
- `DeductionRepository`
- `MessageRepository`

### 4. Security Layer

**Location**: `com.government.payroll.security`, `com.government.payroll.config`

**Responsibilities**:
- Authentication
- Authorization
- JWT token management
- Security configuration

**Components**:
- `JwtService`: Token generation and validation
- `JwtAuthenticationFilter`: Request filtering
- `UserDetailsServiceImpl`: User loading
- `SecurityConfig`: Security configuration

### 5. Data Transfer Layer

**Location**: `com.government.payroll.dto`

**Responsibilities**:
- API request/response models
- Data validation
- API documentation

**Components**:
- Request DTOs: `LoginRequest`, `EmployeeRequest`, etc.
- Response DTOs: `AuthResponse`, `EmployeeResponse`, etc.
- Generic wrappers: `ApiResponse`, `PageResponse`

### 6. Entity Layer

**Location**: `com.government.payroll.entity`

**Responsibilities**:
- Database table mapping
- Entity relationships
- Data constraints

**Components**:
- `User`, `Role`, `Employee`, `Employment`
- `Payroll`, `Payslip`, `Deduction`, `Message`

---

## Database Design

### Entity Relationship Diagram

```
┌─────────┐       ┌──────────┐
│  User   │───────│   Role   │
└─────────┘       └──────────┘
     │
     │ 1:1
     │
┌──────────┐      ┌────────────┐
│ Employee │──────│ Employment │
└──────────┘      └────────────┘
     │
     │ 1:N
     │
┌──────────┐      ┌──────────┐
│ Payslip  │──────│ Payroll  │
└──────────┘      └──────────┘
     │
     │
┌──────────┐
│ Message  │
└──────────┘
```

### Key Relationships

1. **User ↔ Role**: Many-to-Many
   - A user can have multiple roles
   - A role can be assigned to multiple users

2. **User ↔ Employee**: One-to-One
   - Each user can have one employee profile
   - Each employee is linked to one user account

3. **Employee ↔ Employment**: One-to-One
   - Each employee has one employment record
   - Contains department, position, and salary

4. **Employee ↔ Payslip**: One-to-Many
   - An employee can have multiple payslips
   - Each payslip belongs to one employee

5. **Payroll ↔ Payslip**: One-to-Many
   - A payroll contains multiple payslips
   - Each payslip belongs to one payroll

6. **Employee ↔ Message**: One-to-Many
   - An employee can have multiple messages
   - Each message belongs to one employee

### Database Features

#### Indexes
- Email fields (users, employees)
- Employee code
- Status fields
- Foreign keys
- Composite indexes (month, year)

#### Constraints
- Unique constraints (email, employee code)
- Foreign key constraints
- Not null constraints
- Check constraints

#### Triggers
- `process_payroll_approval`: Auto-update payslips and create messages
- `audit_employee_changes`: Log employee status changes

#### Stored Procedures
- `calculate_employee_salary`: Calculate salary breakdown
- `get_payroll_summary`: Get payroll statistics

---

## Security Architecture

### Authentication Flow

```
1. User submits credentials
        ↓
2. AuthenticationManager validates
        ↓
3. UserDetailsService loads user
        ↓
4. Password verified with BCrypt
        ↓
5. JWT tokens generated
        ↓
6. Tokens returned to client
```

### Authorization Flow

```
1. Client sends request with JWT
        ↓
2. JwtAuthenticationFilter extracts token
        ↓
3. JwtService validates token
        ↓
4. UserDetails loaded
        ↓
5. SecurityContext updated
        ↓
6. Method security checks roles
        ↓
7. Request processed or denied
```

### Security Features

1. **Password Security**
   - BCrypt hashing (strength 10)
   - No plain text storage
   - Secure password validation

2. **JWT Security**
   - HMAC-SHA256 signing
   - Configurable expiration
   - Refresh token support
   - Token validation on each request

3. **Role-Based Access Control**
   - Method-level security
   - URL-based security
   - Custom authorization logic

4. **CORS Configuration**
   - Configurable origins
   - Credential support
   - Method restrictions

---

## API Design

### RESTful Principles

- **Resource-based URLs**: `/api/v1/employees/{id}`
- **HTTP methods**: GET, POST, PUT, DELETE
- **Status codes**: 200, 201, 400, 401, 403, 404, 409, 500
- **JSON format**: Request and response bodies

### Response Format

#### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "timestamp": "2026-05-28T10:00:00"
}
```

#### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "data": null,
  "timestamp": "2026-05-28T10:00:00"
}
```

### Pagination

```json
{
  "content": [...],
  "page": 0,
  "size": 10,
  "totalElements": 100,
  "totalPages": 10,
  "last": false
}
```

---

## Business Logic

### Payroll Processing

#### Calculation Formula

```
1. Allowances:
   House = Base Salary × 14%
   Transport = Base Salary × 14%

2. Gross Salary:
   Gross = Base Salary + House + Transport

3. Deductions:
   Tax = Base Salary × 30%
   Pension = Base Salary × 6%
   Medical = Base Salary × 5%
   Others = Base Salary × 5%
   Total Deductions = Tax + Pension + Medical + Others

4. Net Salary:
   Net = Base Salary - Total Deductions
```

#### Processing Rules

1. Only ACTIVE employees are processed
2. Duplicate payroll for same month/year is prevented
3. Deductions cannot exceed gross salary
4. All calculations use 2 decimal precision
5. Rounding uses HALF_UP strategy

### Approval Workflow

```
1. Payroll created with PENDING status
2. Admin reviews payroll
3. Admin approves payroll
4. Trigger updates payslip status to PAID
5. Messages created for all employees
6. Payroll status changed to APPROVED
```

---

## Data Flow

### Employee Creation Flow

```
Client Request
    ↓
Controller validates input
    ↓
Service checks duplicates
    ↓
Mapper converts DTO to Entity
    ↓
Repository saves to database
    ↓
Entity converted to Response DTO
    ↓
Response sent to client
```

### Payroll Processing Flow

```
Process Request
    ↓
Validate month/year
    ↓
Check for duplicates
    ↓
Fetch active employees
    ↓
Fetch deduction rates
    ↓
For each employee:
    - Calculate allowances
    - Calculate deductions
    - Calculate net salary
    - Create payslip
    ↓
Save payroll record
    ↓
Return response
```

### Payroll Approval Flow

```
Approval Request
    ↓
Validate payroll exists
    ↓
Check status is PENDING
    ↓
Update payroll status
    ↓
Database trigger fires
    ↓
For each payslip:
    - Update status to PAID
    - Create payment message
    ↓
Return response
```

---

## Performance Considerations

### Database Optimization

1. **Indexes**: Strategic indexing on frequently queried fields
2. **Lazy Loading**: Fetch associations only when needed
3. **Batch Processing**: Batch inserts for payslips
4. **Connection Pooling**: HikariCP for efficient connections
5. **Query Optimization**: Custom queries for complex operations

### Caching Strategy

- Consider adding Redis for:
  - User sessions
  - Deduction rates
  - Frequently accessed data

### Pagination

- All list endpoints support pagination
- Default page size: 10
- Maximum page size: 100

---

## Scalability

### Horizontal Scaling

- Stateless application design
- JWT tokens (no server-side sessions)
- Database connection pooling
- Load balancer ready

### Vertical Scaling

- JVM tuning options
- Database optimization
- Connection pool sizing

---

## Monitoring & Logging

### Logging Levels

- **ERROR**: Critical errors
- **WARN**: Warning conditions
- **INFO**: General information
- **DEBUG**: Detailed debugging
- **TRACE**: Very detailed tracing

### Log Files

- Console output
- File: `logs/payroll-erp.log`
- Rotation: 30 days, 10MB max

---

## Future Enhancements

1. **Microservices**: Split into smaller services
2. **Event-Driven**: Use message queues (RabbitMQ/Kafka)
3. **Caching**: Implement Redis caching
4. **Async Processing**: Background job processing
5. **API Gateway**: Centralized API management
6. **Service Discovery**: Eureka/Consul integration

---

**Architecture designed for scalability, maintainability, and security.**
