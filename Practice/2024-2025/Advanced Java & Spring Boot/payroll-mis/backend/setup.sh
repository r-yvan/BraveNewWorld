#!/bin/bash

# Government ERP Payroll Management System - Setup Script
# This script automates the setup process

set -e

echo "=========================================="
echo "Government ERP Payroll System Setup"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Java is installed
echo "Checking Java installation..."
if command -v java &> /dev/null; then
    JAVA_VERSION=$(java -version 2>&1 | awk -F '"' '/version/ {print $2}' | cut -d'.' -f1)
    if [ "$JAVA_VERSION" -ge 21 ]; then
        echo -e "${GREEN}✓ Java $JAVA_VERSION found${NC}"
    else
        echo -e "${RED}✗ Java 21 or higher is required${NC}"
        exit 1
    fi
else
    echo -e "${RED}✗ Java is not installed${NC}"
    exit 1
fi

# Check if Maven is installed
echo "Checking Maven installation..."
if command -v mvn &> /dev/null; then
    MVN_VERSION=$(mvn -version | head -n 1 | awk '{print $3}')
    echo -e "${GREEN}✓ Maven $MVN_VERSION found${NC}"
else
    echo -e "${RED}✗ Maven is not installed${NC}"
    exit 1
fi

# Check if PostgreSQL is installed
echo "Checking PostgreSQL installation..."
if command -v psql &> /dev/null; then
    PG_VERSION=$(psql --version | awk '{print $3}')
    echo -e "${GREEN}✓ PostgreSQL $PG_VERSION found${NC}"
else
    echo -e "${YELLOW}⚠ PostgreSQL not found. Please install PostgreSQL 14+${NC}"
fi

echo ""
echo "=========================================="
echo "Database Setup"
echo "=========================================="
echo ""

# Ask for database credentials
read -p "Enter PostgreSQL username (default: postgres): " DB_USER
DB_USER=${DB_USER:-postgres}

read -sp "Enter PostgreSQL password: " DB_PASS
echo ""

read -p "Enter database name (default: payroll_erp): " DB_NAME
DB_NAME=${DB_NAME:-payroll_erp}

# Create database
echo ""
echo "Creating database..."
PGPASSWORD=$DB_PASS psql -U $DB_USER -h localhost -c "CREATE DATABASE $DB_NAME;" 2>/dev/null || echo -e "${YELLOW}Database may already exist${NC}"

# Update application.yml
echo ""
echo "Updating configuration..."
cat > src/main/resources/application.yml << EOF
spring:
  application:
    name: Government ERP Payroll System
  
  datasource:
    url: jdbc:postgresql://localhost:5432/$DB_NAME
    username: $DB_USER
    password: $DB_PASS
    driver-class-name: org.postgresql.Driver
    hikari:
      maximum-pool-size: 10
      minimum-idle: 5
      connection-timeout: 30000
      idle-timeout: 600000
      max-lifetime: 1800000
  
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect
        format_sql: true
        use_sql_comments: true
        jdbc:
          batch_size: 20
        order_inserts: true
        order_updates: true
    open-in-view: false
  
  jackson:
    serialization:
      write-dates-as-timestamps: false
    time-zone: UTC
    default-property-inclusion: non_null

jwt:
  secret: \${JWT_SECRET:404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970}
  expiration: 86400000
  refresh-expiration: 604800000

springdoc:
  api-docs:
    path: /api-docs
  swagger-ui:
    path: /swagger-ui.html
    enabled: true
    operations-sorter: method
    tags-sorter: alpha
  show-actuator: false

server:
  port: 8080
  error:
    include-message: always
    include-binding-errors: always
    include-stacktrace: on_param
    include-exception: false
  compression:
    enabled: true
    mime-types: application/json,application/xml,text/html,text/xml,text/plain

logging:
  level:
    root: INFO
    com.government.payroll: DEBUG
    org.springframework.security: DEBUG
    org.hibernate.SQL: DEBUG
    org.hibernate.type.descriptor.sql.BasicBinder: TRACE
  pattern:
    console: "%d{yyyy-MM-dd HH:mm:ss} - %msg%n"
    file: "%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n"
  file:
    name: logs/payroll-erp.log
    max-size: 10MB
    max-history: 30

app:
  cors:
    allowed-origins: http://localhost:3000
    allowed-methods: GET,POST,PUT,DELETE,OPTIONS
    allowed-headers: "*"
    allow-credentials: true
  
  payroll:
    deductions:
      employee-tax: 30.0
      pension: 6.0
      medical-insurance: 5.0
      others: 5.0
      house: 14.0
      transport: 14.0
EOF

echo -e "${GREEN}✓ Configuration updated${NC}"

echo ""
echo "=========================================="
echo "Building Project"
echo "=========================================="
echo ""

# Build the project
echo "Running Maven build..."
mvn clean install -DskipTests

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Build successful${NC}"
else
    echo -e "${RED}✗ Build failed${NC}"
    exit 1
fi

echo ""
echo "=========================================="
echo "Setup Complete!"
echo "=========================================="
echo ""
echo "To start the application, run:"
echo -e "${GREEN}mvn spring-boot:run${NC}"
echo ""
echo "Or with Docker:"
echo -e "${GREEN}docker-compose up -d${NC}"
echo ""
echo "Access the application at:"
echo "  - API: http://localhost:8080"
echo "  - Swagger UI: http://localhost:8080/swagger-ui.html"
echo ""
echo "Default test users:"
echo "  - Admin: admin@gov.rw / Admin@123"
echo "  - Manager: manager@gov.rw / Manager@123"
echo "  - Employee: employee@gov.rw / Employee@123"
echo ""
echo -e "${GREEN}Happy coding! 🚀${NC}"
