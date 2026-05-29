# API Testing Guide

Complete guide for testing the Government ERP Payroll Management System API.

## Base URL

```
http://localhost:8080/api/v1
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

---

## 1. Authentication Endpoints

### 1.1 Register User

**POST** `/auth/register`

```json
{
  "email": "newuser@gov.rw",
  "password": "Password@123",
  "roles": ["ROLE_EMPLOYEE"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "tokenType": "Bearer",
    "email": "newuser@gov.rw",
    "roles": ["ROLE_EMPLOYEE"]
  },
  "timestamp": "2026-05-28T10:00:00"
}
```

### 1.2 Login

**POST** `/auth/login`

```json
{
  "email": "admin@gov.rw",
  "password": "Admin@123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "tokenType": "Bearer",
    "email": "admin@gov.rw",
    "roles": ["ROLE_ADMIN"]
  },
  "timestamp": "2026-05-28T10:00:00"
}
```

### 1.3 Refresh Token

**POST** `/auth/refresh`

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 1.4 Get Current User

**GET** `/auth/me`

**Headers:**
```
Authorization: Bearer <access-token>
```

---

## 2. Employee Endpoints

### 2.1 Create Employee

**POST** `/employees`

**Headers:**
```
Authorization: Bearer <access-token>
Content-Type: application/json
```

**Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@gov.rw",
  "district": "Kigali",
  "mobile": "+250788123456",
  "dateOfBirth": "1990-01-15",
  "employeeCode": "EMP001",
  "joiningDate": "2020-01-01",
  "status": "ACTIVE",
  "department": "Finance",
  "position": "Accountant",
  "baseSalary": 500000
}
```

### 2.2 Get All Employees

**GET** `/employees?page=0&size=10&sortBy=createdAt&sortDir=desc`

**Headers:**
```
Authorization: Bearer <access-token>
```

### 2.3 Get Employee by ID

**GET** `/employees/{id}`

**Headers:**
```
Authorization: Bearer <access-token>
```

### 2.4 Update Employee

**PUT** `/employees/{id}`

**Headers:**
```
Authorization: Bearer <access-token>
Content-Type: application/json
```

**Body:** (Same as Create Employee)

### 2.5 Delete Employee

**DELETE** `/employees/{id}`

**Headers:**
```
Authorization: Bearer <access-token>
```

### 2.6 Search Employees

**GET** `/employees/search?query=john&page=0&size=10`

**Headers:**
```
Authorization: Bearer <access-token>
```

### 2.7 Get Employees by Status

**GET** `/employees/status/ACTIVE?page=0&size=10`

**Headers:**
```
Authorization: Bearer <access-token>
```

---

## 3. Payroll Endpoints

### 3.1 Process Payroll

**POST** `/payroll/process`

**Headers:**
```
Authorization: Bearer <access-token>
Content-Type: application/json
```

**Body:**
```json
{
  "month": 5,
  "year": 2026,
  "remarks": "May 2026 payroll processing"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payroll processed successfully",
  "data": {
    "id": 1,
    "month": 5,
    "year": 2026,
    "processedDate": "2026-05-28",
    "status": "PENDING",
    "approvedBy": null,
    "approvedDate": null,
    "remarks": "May 2026 payroll processing",
    "payslipCount": 50
  },
  "timestamp": "2026-05-28T10:00:00"
}
```

### 3.2 Get All Payrolls

**GET** `/payroll?page=0&size=10`

**Headers:**
```
Authorization: Bearer <access-token>
```

### 3.3 Get Payroll by ID

**GET** `/payroll/{id}`

**Headers:**
```
Authorization: Bearer <access-token>
```

### 3.4 Approve Payroll

**PUT** `/payroll/{id}/approve`

**Headers:**
```
Authorization: Bearer <access-token>
```

**Note:** Only users with ROLE_ADMIN can approve payroll.

---

## 4. Payslip Endpoints

### 4.1 Get My Payslips

**GET** `/payslips/my?page=0&size=10`

**Headers:**
```
Authorization: Bearer <access-token>
```

**Response:**
```json
{
  "success": true,
  "message": "Payslips retrieved successfully",
  "data": {
    "content": [
      {
        "id": 1,
        "employeeName": "John Doe",
        "employeeCode": "EMP001",
        "month": 5,
        "year": 2026,
        "baseSalary": 500000,
        "houseAmount": 70000,
        "transportAmount": 70000,
        "grossSalary": 640000,
        "employeeTax": 150000,
        "pension": 30000,
        "medicalInsurance": 25000,
        "others": 25000,
        "totalDeductions": 230000,
        "netSalary": 270000,
        "paymentStatus": "PAID"
      }
    ],
    "page": 0,
    "size": 10,
    "totalElements": 1,
    "totalPages": 1,
    "last": true
  },
  "timestamp": "2026-05-28T10:00:00"
}
```

### 4.2 Get Payslip by ID

**GET** `/payslips/{id}`

**Headers:**
```
Authorization: Bearer <access-token>
```

### 4.3 Download Payslip PDF

**GET** `/payslips/{id}/download`

**Headers:**
```
Authorization: Bearer <access-token>
```

**Response:** PDF file download

---

## 5. Deduction Endpoints

### 5.1 Get All Deductions

**GET** `/deductions`

**Headers:**
```
Authorization: Bearer <access-token>
```

**Response:**
```json
{
  "success": true,
  "message": "Deductions retrieved successfully",
  "data": [
    {
      "id": 1,
      "deductionName": "EmployeeTax",
      "percentage": 30.0,
      "description": "Employee income tax deduction",
      "isActive": true
    },
    {
      "id": 2,
      "deductionName": "Pension",
      "percentage": 6.0,
      "description": "Pension contribution deduction",
      "isActive": true
    }
  ],
  "timestamp": "2026-05-28T10:00:00"
}
```

### 5.2 Update Deduction

**PUT** `/deductions/{id}`

**Headers:**
```
Authorization: Bearer <access-token>
Content-Type: application/json
```

**Body:**
```json
{
  "percentage": 32.0,
  "description": "Updated employee tax rate"
}
```

**Note:** Only users with ROLE_ADMIN can update deductions.

---

## 6. Message Endpoints

### 6.1 Get My Messages

**GET** `/messages/my?page=0&size=10`

**Headers:**
```
Authorization: Bearer <access-token>
```

**Response:**
```json
{
  "success": true,
  "message": "Messages retrieved successfully",
  "data": {
    "content": [
      {
        "id": 1,
        "employeeName": "John Doe",
        "message": "Dear John Doe, Your salary of 5/2026 from GOVERNMENT ERP amount 270000 has been credited successfully.",
        "month": 5,
        "year": 2026,
        "isRead": false,
        "createdAt": "2026-05-28T10:00:00"
      }
    ],
    "page": 0,
    "size": 10,
    "totalElements": 1,
    "totalPages": 1,
    "last": true
  },
  "timestamp": "2026-05-28T10:00:00"
}
```

### 6.2 Get All Messages (Admin/Manager)

**GET** `/messages?page=0&size=10`

**Headers:**
```
Authorization: Bearer <access-token>
```

**Note:** Only users with ROLE_ADMIN or ROLE_MANAGER can access all messages.

---

## Testing Workflow

### Complete Testing Sequence

1. **Login as Admin**
   ```bash
   POST /auth/login
   {
     "email": "admin@gov.rw",
     "password": "Admin@123"
   }
   ```
   Save the `accessToken` for subsequent requests.

2. **Create Employees**
   ```bash
   POST /employees
   # Create multiple employees with different departments and salaries
   ```

3. **View All Employees**
   ```bash
   GET /employees?page=0&size=10
   ```

4. **Process Payroll**
   ```bash
   POST /payroll/process
   {
     "month": 5,
     "year": 2026,
     "remarks": "May 2026 payroll"
   }
   ```

5. **View Payroll**
   ```bash
   GET /payroll/{id}
   ```

6. **Approve Payroll**
   ```bash
   PUT /payroll/{id}/approve
   ```

7. **Login as Employee**
   ```bash
   POST /auth/login
   {
     "email": "employee@gov.rw",
     "password": "Employee@123"
   }
   ```

8. **View My Payslips**
   ```bash
   GET /payslips/my
   ```

9. **Download Payslip**
   ```bash
   GET /payslips/{id}/download
   ```

10. **View My Messages**
    ```bash
    GET /messages/my
    ```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation failed",
  "data": {
    "email": "Email must be valid",
    "baseSalary": "Base salary must be positive"
  },
  "timestamp": "2026-05-28T10:00:00"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Invalid email or password",
  "timestamp": "2026-05-28T10:00:00"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Access denied: Insufficient permissions",
  "timestamp": "2026-05-28T10:00:00"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Employee not found with id: '123'",
  "timestamp": "2026-05-28T10:00:00"
}
```

### 409 Conflict
```json
{
  "success": false,
  "message": "Employee already exists with email: 'john.doe@gov.rw'",
  "timestamp": "2026-05-28T10:00:00"
}
```

---

## cURL Examples

### Login
```bash
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@gov.rw",
    "password": "Admin@123"
  }'
```

### Create Employee
```bash
curl -X POST http://localhost:8080/api/v1/employees \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@gov.rw",
    "employeeCode": "EMP001",
    "joiningDate": "2020-01-01",
    "department": "Finance",
    "position": "Accountant",
    "baseSalary": 500000
  }'
```

### Process Payroll
```bash
curl -X POST http://localhost:8080/api/v1/payroll/process \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "month": 5,
    "year": 2026,
    "remarks": "May 2026 payroll"
  }'
```

---

## Postman Collection

Import the following environment variables in Postman:

- `base_url`: `http://localhost:8080/api/v1`
- `access_token`: (Set after login)
- `refresh_token`: (Set after login)

---

## Notes

- All timestamps are in ISO 8601 format
- Pagination starts at page 0
- Default page size is 10
- Maximum page size is 100
- All monetary values are in RWF (Rwandan Francs)
- Dates are in format: YYYY-MM-DD

---

**Happy Testing! 🚀**
