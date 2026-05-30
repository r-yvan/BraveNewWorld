# Binary Supermarket - Online Shopping System

A complete e-commerce solution for Binary Supermarket in Kimironko Sector, Gasabo District. This system enables customers to shop online with a shopping cart, while maintaining complete separation between frontend and backend.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Detailed Setup](#detailed-setup)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Usage Guide](#usage-guide)

---

## Overview

**Problem**: Binary Supermarket customers wanted the ability to order and purchase products online instead of only shopping physically.

**Solution**: A modern web-based shopping system with:
- Spring Boot REST API backend with PostgreSQL database
- Next.js (TypeScript) frontend with clean UI
- JWT authentication for secure customer access
- Real-time shopping cart with checkout functionality
- Complete separation of concerns (no business logic in frontend)

---

## Features

### Product Management
✅ Register products with details (code, name, type, price, image)  
✅ Manage product quantities with ADD/REMOVE operations  
✅ Track stock availability in real-time  
✅ Display products with images and pricing  

### Customer & Authentication
✅ Customer registration (name, email, phone, password)  
✅ Secure login with JWT tokens  
✅ Password encryption (BCrypt)  
✅ Session management  

### Shopping Cart & Checkout
✅ Add multiple products to cart  
✅ Adjust quantities (+/- controls)  
✅ Remove items from cart  
✅ Real-time total calculation  
✅ Stock validation during checkout  
✅ Automatic inventory updates  

### Purchase History & Reporting
✅ Store all purchase records  
✅ Generate detailed purchase reports  
✅ View customer purchase history  

### Security & API
✅ JWT-based authentication  
✅ CORS configuration  
✅ Protected endpoints  
✅ Swagger UI for API testing  

---

## Technology Stack

### Backend
- **Framework**: Spring Boot 3.2.1
- **Database**: PostgreSQL
- **ORM**: Spring Data JPA
- **Security**: Spring Security + JWT (jjwt 0.12.3)
- **API Docs**: Swagger/OpenAPI 3
- **Build Tool**: Maven
- **Utilities**: Lombok

### Frontend
- **Framework**: Next.js 14.1.0
- **Language**: TypeScript 5.3.3
- **UI Library**: React 18.2.0
- **HTTP Client**: Axios 1.6.5
- **Styling**: CSS3

---

## Project Structure

```
binary-supermarket/
├── backend/                          # Spring Boot Application
│   ├── src/main/
│   │   ├── java/rw/ac/binarysupermarket/
│   │   │   ├── ShoppingSystemApplication.java    # Main application
│   │   │   ├── model/                            # Database entities
│   │   │   │   ├── Product.java                  # Product table
│   │   │   │   ├── Quantity.java                 # Quantity table
│   │   │   │   ├── Customer.java                 # Customer table
│   │   │   │   └── Purchased.java                # Purchased table
│   │   │   ├── repository/                       # JPA repositories
│   │   │   │   ├── ProductRepository.java
│   │   │   │   ├── QuantityRepository.java
│   │   │   │   ├── CustomerRepository.java
│   │   │   │   └── PurchasedRepository.java
│   │   │   ├── service/                          # Business logic
│   │   │   │   ├── ProductService.java
│   │   │   │   ├── CustomerService.java
│   │   │   │   └── PurchaseService.java
│   │   │   ├── controller/                       # REST API endpoints
│   │   │   │   ├── AuthController.java           # /api/auth/*
│   │   │   │   ├── ProductController.java        # /api/products/*
│   │   │   │   └── PurchaseController.java       # /api/purchases/*
│   │   │   ├── security/                         # JWT & Security
│   │   │   │   ├── SecurityConfig.java
│   │   │   │   ├── JwtUtil.java
│   │   │   │   └── JwtAuthFilter.java
│   │   │   └── dto/                              # Data transfer objects
│   │   │       ├── AuthRequest.java
│   │   │       ├── AuthResponse.java
│   │   │       ├── CartItemDTO.java
│   │   │       ├── CheckoutRequest.java
│   │   │       └── PurchaseReportDTO.java
│   │   └── resources/
│   │       ├── application.properties            # Configuration
│   │       └── db-trigger.sql                    # Database trigger
│   ├── pom.xml                                   # Maven dependencies
│   └── .gitignore
│
├── frontend/                         # Next.js Application
│   ├── app/                          # App router pages
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Home page (redirect)
│   │   ├── globals.css               # Global styles
│   │   ├── login/
│   │   │   └── page.tsx              # Login page
│   │   ├── register/
│   │   │   └── page.tsx              # Registration page
│   │   └── products/
│   │       └── page.tsx              # Products & cart page
│   ├── lib/                          # API client (no business logic)
│   │   ├── api.ts                    # Axios instance
│   │   ├── auth.ts                   # Auth API calls
│   │   ├── products.ts               # Product API calls
│   │   └── cart.ts                   # Cart API calls
│   ├── types/
│   │   └── index.ts                  # TypeScript interfaces
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.js
│   ├── .env.local                    # Environment variables
│   └── .gitignore
│
└── README.md                         # This file
```

---

## Quick Start

### Prerequisites
- Java 17 or higher
- Maven 3.6+
- PostgreSQL 12+
- Node.js 18+
- npm or yarn

### Step 1: Setup PostgreSQL Database
```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE binary_supermarket;

# Exit
\q
```

### Step 2: Start Backend
```bash
cd backend
./mvnw spring-boot:run
```

Wait for message: "Started ShoppingSystemApplication"

### Step 3: Add Products via Swagger
1. Open browser: http://localhost:8080/swagger-ui.html
2. Find "product-controller" section
3. Click POST `/api/products`
4. Click "Try it out"
5. Add sample product:
```json
{
  "name": "Laptop",
  "productType": "Electronics",
  "price": 800000,
  "image": "https://via.placeholder.com/300"
}
```
6. Click "Execute"

### Step 4: Add Quantity
1. In Swagger, find POST `/api/products/quantity`
2. Click "Try it out"
3. Add quantity:
```json
{
  "productCode": 1,
  "quantity": 50,
  "operation": "ADD"
}
```
4. Click "Execute"

Repeat steps 3-4 to add more products.

### Step 5: Start Frontend
Open new terminal:
```bash
cd frontend
npm install
npm run dev
```

### Step 6: Use Application
1. Open http://localhost:3000
2. Click "Sign Up"
3. Fill registration form
4. Login with your credentials
5. Browse products
6. Add items to cart
7. Checkout

---

## Detailed Setup

### Backend Configuration

#### 1. Database Setup
Create PostgreSQL database:
```sql
CREATE DATABASE binary_supermarket;
```

#### 2. Configure Application
Edit `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/binary_supermarket
spring.datasource.username=postgres
spring.datasource.password=your_password

# Change JWT secret for production
jwt.secret=your-secret-key-change-this-in-production-minimum-256-bits
jwt.expiration=86400000
```

#### 3. Run Backend
```bash
cd backend
./mvnw clean install
./mvnw spring-boot:run
```

Backend will start on `http://localhost:8080`

#### 4. Optional: Apply Database Trigger
Execute `backend/src/main/resources/db-trigger.sql` in PostgreSQL to add automatic total calculation trigger.

### Frontend Configuration

#### 1. Install Dependencies
```bash
cd frontend
npm install
```

#### 2. Configure API URL
Edit `frontend/.env.local` if backend is not on localhost:8080:
```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

#### 3. Run Frontend
```bash
npm run dev
```

Frontend will start on `http://localhost:3000`

---

## API Documentation

### Base URL
```
http://localhost:8080/api
```

### Authentication
Most endpoints require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

### Endpoints

#### 1. Customer Registration
**POST** `/auth/register`

Request:
```json
{
  "firstname": "John",
  "phone": "+250788123456",
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "id": 1,
  "firstname": "John",
  "phone": "+250788123456",
  "email": "john@example.com"
}
```

#### 2. Customer Login
**POST** `/auth/login`

Request:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "email": "john@example.com",
  "firstname": "John"
}
```

#### 3. Get All Products
**GET** `/products`

Response:
```json
[
  {
    "code": 1,
    "name": "Bag",
    "productType": "Accessories",
    "price": 25000,
    "inDate": "2025-01-23",
    "image": "https://example.com/bag.jpg",
    "availableQuantity": 100
  }
]
```

#### 4. Create Product (Admin - via Swagger)
**POST** `/products`

Request:
```json
{
  "name": "Laptop",
  "productType": "Electronics",
  "price": 500000,
  "image": "https://example.com/laptop.jpg"
}
```

#### 5. Add Quantity (Admin - via Swagger)
**POST** `/products/quantity`

Request:
```json
{
  "productCode": 1,
  "quantity": 50,
  "operation": "ADD"
}
```

#### 6. Checkout
**POST** `/purchases/checkout` (Requires Authentication)

Request:
```json
{
  "items": [
    {
      "productCode": 1,
      "quantity": 2
    },
    {
      "productCode": 2,
      "quantity": 1
    }
  ]
}
```

Response:
```json
"Checkout successful"
```

#### 7. Purchase Report
**GET** `/purchases/report`

Response:
```json
[
  {
    "no": 11,
    "customerName": "Mugabo",
    "date": "2025-08-01",
    "productId": 1,
    "productName": "Bag",
    "quantity": 20,
    "unitPrice": 25000,
    "total": 500000
  }
]
```

---

## Database Schema

### products
| Column | Type | Description |
|--------|------|-------------|
| code | BIGINT (PK) | Auto-increment product ID |
| name | VARCHAR | Product name |
| product_type | VARCHAR | Category/type |
| price | DOUBLE | Unit price |
| in_date | DATE | Date added |
| image | VARCHAR | Image URL |
| available_quantity | INTEGER | Stock quantity |

### quantities
| Column | Type | Description |
|--------|------|-------------|
| id | BIGINT (PK) | Auto-increment |
| product_code | BIGINT (FK) | References products |
| quantity | INTEGER | Quantity amount |
| operation | VARCHAR | ADD or REMOVE |
| date | DATE | Operation date |

### customers
| Column | Type | Description |
|--------|------|-------------|
| id | BIGINT (PK) | Auto-increment |
| firstname | VARCHAR | Customer name |
| phone | VARCHAR (UNIQUE) | Phone number |
| email | VARCHAR (UNIQUE) | Email address |
| password | VARCHAR | Encrypted password |

### purchased
| Column | Type | Description |
|--------|------|-------------|
| id | BIGINT (PK) | Auto-increment |
| product_code | BIGINT (FK) | References products |
| customer_id | BIGINT (FK) | References customers |
| quantity | INTEGER | Quantity purchased |
| total | DOUBLE | Total price |
| date | DATE | Purchase date |

---

## Usage Guide

### For Administrators (via Swagger)

1. **Access Swagger UI**: http://localhost:8080/swagger-ui.html

2. **Add Products**:
   - Navigate to `product-controller`
   - Use POST `/api/products`
   - Add product details

3. **Manage Quantities**:
   - Use POST `/api/products/quantity`
   - Set operation to "ADD" or "REMOVE"

4. **View Reports**:
   - Use GET `/api/purchases/report`
   - View all purchase history

### For Customers (via Web Interface)

1. **Registration**:
   - Visit http://localhost:3000
   - Click "Sign Up"
   - Fill in name, phone, email, password
   - Submit form

2. **Login**:
   - Enter email and password
   - Click "Login"

3. **Shopping**:
   - Browse available products
   - Click "Add to Cart" on desired items
   - Adjust quantities using +/- buttons
   - View cart total in real-time

4. **Checkout**:
   - Review cart items
   - Click "Checkout"
   - Confirm purchase
   - Cart clears automatically

---

## Sample Products to Add

### Product 1: Bag
```json
{
  "name": "Bag",
  "productType": "Accessories",
  "price": 25000,
  "image": "https://via.placeholder.com/300/FF6B6B/FFFFFF?text=Bag"
}
```
Quantity: `{"productCode": 1, "quantity": 100, "operation": "ADD"}`

### Product 2: Smartphone
```json
{
  "name": "Smartphone",
  "productType": "Electronics",
  "price": 350000,
  "image": "https://via.placeholder.com/300/4ECDC4/FFFFFF?text=Phone"
}
```
Quantity: `{"productCode": 2, "quantity": 50, "operation": "ADD"}`

### Product 3: Rice
```json
{
  "name": "Rice 5kg",
  "productType": "Food",
  "price": 5000,
  "image": "https://via.placeholder.com/300/95E1D3/FFFFFF?text=Rice"
}
```
Quantity: `{"productCode": 3, "quantity": 200, "operation": "ADD"}`

### Product 4: Cooking Oil
```json
{
  "name": "Cooking Oil 2L",
  "productType": "Food",
  "price": 8000,
  "image": "https://via.placeholder.com/300/F38181/FFFFFF?text=Oil"
}
```
Quantity: `{"productCode": 4, "quantity": 150, "operation": "ADD"}`

---

## Troubleshooting

### Backend won't start
- Check PostgreSQL is running: `sudo service postgresql status`
- Verify database credentials in `application.properties`
- Ensure port 8080 is available: `lsof -i :8080`
- Check Java version: `java -version` (requires Java 17+)

### Frontend can't connect
- Verify backend is running on port 8080
- Check CORS configuration in `SecurityConfig.java`
- Verify API URL in `.env.local`
- Clear browser cache and localStorage

### Authentication issues
- Clear browser localStorage
- Check JWT secret is properly configured
- Verify token expiration settings
- Re-register and login with new account

### Database connection errors
- Verify PostgreSQL is running
- Check database exists: `psql -U postgres -l`
- Verify credentials match `application.properties`
- Check PostgreSQL accepts connections on port 5432

---

## Ports Used
- **Backend API**: http://localhost:8080
- **Frontend Web**: http://localhost:3000
- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **PostgreSQL**: localhost:5432

---

## Design Principles

1. **Separation of Concerns**: Backend and frontend are completely separate
2. **No Business Logic in Frontend**: All calculations and validations in backend
3. **RESTful API**: Clean, standard REST endpoints
4. **Security First**: JWT authentication, password encryption, CORS
5. **Type Safety**: TypeScript for frontend type checking
6. **Documentation**: Swagger for interactive API documentation
7. **Scalability**: Modular architecture, easy to extend

---

## License
This project is developed for Binary Supermarket, Kimironko Sector, Gasabo District.

---

## Support
For issues or questions, please refer to the API documentation at http://localhost:8080/swagger-ui.html when the backend is running.
