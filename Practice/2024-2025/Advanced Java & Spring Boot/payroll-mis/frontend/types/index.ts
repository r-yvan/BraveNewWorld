// Authentication Types
export type Role = 'ROLE_ADMIN' | 'ROLE_MANAGER' | 'ROLE_EMPLOYEE';

export interface User {
  id: number;
  email: string;
  fullName: string;
  role: Role;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  role: Role;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

// Employee Types
export type EmployeeStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  district: string;
  mobile: string;
  dateOfBirth: string;
  employeeCode: string;
  department: string;
  position: string;
  baseSalary: number;
  status: EmployeeStatus;
  joiningDate: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateEmployeeRequest {
  firstName: string;
  lastName: string;
  email: string;
  district: string;
  mobile: string;
  dateOfBirth: string;
  employeeCode: string;
  department: string;
  position: string;
  baseSalary: number;
  status: EmployeeStatus;
  joiningDate: string;
}

export interface EmployeeResponse {
  content: Employee[];
  totalPages: number;
  totalElements: number;
  currentPage: number;
  pageSize: number;
}

// Payroll Types
export type PayrollStatus = 'PENDING' | 'APPROVED' | 'PAID' | 'REJECTED';

export interface Payroll {
  id: number;
  month: number;
  year: number;
  status: PayrollStatus;
  grossSalary: number;
  netSalary: number;
  totalDeductions: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface PayrollRequest {
  month: number;
  year: number;
}

export interface PayrollResponse {
  content: Payroll[];
  totalPages: number;
  totalElements: number;
  currentPage: number;
  pageSize: number;
}

// Payslip Types
export interface Deduction {
  id: number;
  name: string;
  type: 'TAX' | 'PENSION' | 'MEDICAL' | 'OTHER' | 'ALLOWANCE';
  amount: number;
  percentage?: number;
}

export interface Payslip {
  id: number;
  employeeId: number;
  month: number;
  year: number;
  baseSalary: number;
  houseAllowance: number;
  transportAllowance: number;
  grossSalary: number;
  deductions: Deduction[];
  netSalary: number;
  paymentStatus: 'PENDING' | 'PAID';
  createdAt?: string;
  paidDate?: string;
}

// Deduction Types
export interface DeductionConfig {
  id: number;
  name: string;
  type: string;
  percentage: number;
  amount: number;
  isActive: boolean;
}

// Message Types
export interface Message {
  id: number;
  recipientId: number;
  senderId: number;
  subject: string;
  content: string;
  isRead: boolean;
  createdAt: string;
  type: 'SALARY_NOTIFICATION' | 'APPROVAL_NOTIFICATION' | 'SYSTEM' | 'GENERAL';
}

// Analytics Types
export interface DashboardAnalytics {
  totalEmployees: number;
  activeEmployees: number;
  pendingPayrolls: number;
  paidPayrolls: number;
  totalSalaryAmount: number;
  totalDeductions: number;
  monthlyPayrollData: MonthlyPayrollData[];
  employeeStatusData: StatusCount[];
  deductionsBreakdown: DeductionBreakdown[];
}

export interface MonthlyPayrollData {
  month: string;
  total: number;
  paid: number;
  pending: number;
}

export interface StatusCount {
  status: string;
  count: number;
}

export interface DeductionBreakdown {
  name: string;
  value: number;
  percentage: number;
}

// Pagination Types
export interface PaginationParams {
  page: number;
  size: number;
  search?: string;
  sortBy?: string;
  sortDirection?: 'ASC' | 'DESC';
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PagedResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  currentPage: number;
  pageSize: number;
}
