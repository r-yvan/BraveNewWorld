-- Initialize Roles
INSERT INTO roles (name, description, created_at, updated_at, deleted) VALUES
('ROLE_ADMIN', 'Administrator with full system access', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
('ROLE_MANAGER', 'Manager with employee and payroll management access', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
('ROLE_EMPLOYEE', 'Employee with limited access to own data', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false)
ON CONFLICT (name) DO NOTHING;

-- Initialize Default Deductions
INSERT INTO deductions (deduction_name, percentage, description, is_active, created_at, updated_at, deleted) VALUES
('EmployeeTax', 30.0, 'Employee income tax deduction', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
('Pension', 6.0, 'Pension contribution deduction', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
('MedicalInsurance', 5.0, 'Medical insurance deduction', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
('Others', 5.0, 'Other miscellaneous deductions', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
('House', 14.0, 'House allowance (added to salary)', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
('Transport', 14.0, 'Transport allowance (added to salary)', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false)
ON CONFLICT (deduction_name) DO NOTHING;

-- Create Admin User (password: Admin@123)
INSERT INTO users (email, password, enabled, created_at, updated_at, deleted) VALUES
('admin@gov.rw', '$2a$10$xqYhZvKZJz5Z5Z5Z5Z5Z5uK5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false)
ON CONFLICT (email) DO NOTHING;

-- Create Manager User (password: Manager@123)
INSERT INTO users (email, password, enabled, created_at, updated_at, deleted) VALUES
('manager@gov.rw', '$2a$10$xqYhZvKZJz5Z5Z5Z5Z5Z5uK5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false)
ON CONFLICT (email) DO NOTHING;

-- Create Employee User (password: Employee@123)
INSERT INTO users (email, password, enabled, created_at, updated_at, deleted) VALUES
('employee@gov.rw', '$2a$10$xqYhZvKZJz5Z5Z5Z5Z5Z5uK5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false)
ON CONFLICT (email) DO NOTHING;

-- Assign Roles to Users
INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id FROM users u, roles r
WHERE u.email = 'admin@gov.rw' AND r.name = 'ROLE_ADMIN'
ON CONFLICT DO NOTHING;

INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id FROM users u, roles r
WHERE u.email = 'manager@gov.rw' AND r.name = 'ROLE_MANAGER'
ON CONFLICT DO NOTHING;

INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id FROM users u, roles r
WHERE u.email = 'employee@gov.rw' AND r.name = 'ROLE_EMPLOYEE'
ON CONFLICT DO NOTHING;

-- Create Sample Employees
INSERT INTO employees (first_name, last_name, email, district, mobile, date_of_birth, employee_code, joining_date, status, user_id, created_at, updated_at, deleted)
SELECT 'John', 'Doe', 'employee@gov.rw', 'Kigali', '+250788123456', '1990-01-15', 'EMP001', '2020-01-01', 'ACTIVE', u.id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false
FROM users u WHERE u.email = 'employee@gov.rw'
ON CONFLICT (email) DO NOTHING;

INSERT INTO employees (first_name, last_name, email, district, mobile, date_of_birth, employee_code, joining_date, status, created_at, updated_at, deleted) VALUES
('Jane', 'Smith', 'jane.smith@gov.rw', 'Kigali', '+250788234567', '1992-03-20', 'EMP002', '2021-02-01', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
('Bob', 'Johnson', 'bob.johnson@gov.rw', 'Musanze', '+250788345678', '1988-07-10', 'EMP003', '2019-06-15', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false)
ON CONFLICT (email) DO NOTHING;

-- Create Employment Records
INSERT INTO employments (department, position, base_salary, employee_id, created_at, updated_at, deleted)
SELECT 'Finance', 'Accountant', 500000, e.id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false
FROM employees e WHERE e.employee_code = 'EMP001'
ON CONFLICT (employee_id) DO NOTHING;

INSERT INTO employments (department, position, base_salary, employee_id, created_at, updated_at, deleted)
SELECT 'HR', 'HR Manager', 700000, e.id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false
FROM employees e WHERE e.employee_code = 'EMP002'
ON CONFLICT (employee_id) DO NOTHING;

INSERT INTO employments (department, position, base_salary, employee_id, created_at, updated_at, deleted)
SELECT 'IT', 'Software Developer', 800000, e.id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false
FROM employees e WHERE e.employee_code = 'EMP003'
ON CONFLICT (employee_id) DO NOTHING;
