// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';
export const TOKEN_KEY = 'erp_token';
export const REFRESH_TOKEN_KEY = 'erp_refresh_token';
export const USER_KEY = 'erp_user';

// Roles
export const ROLES = {
  ADMIN: 'ROLE_ADMIN',
  MANAGER: 'ROLE_MANAGER',
  EMPLOYEE: 'ROLE_EMPLOYEE',
} as const;

// Employee Status
export const EMPLOYEE_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  SUSPENDED: 'SUSPENDED',
} as const;

// Payroll Status
export const PAYROLL_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  PAID: 'PAID',
  REJECTED: 'REJECTED',
} as const;

// Deduction Types
export const DEDUCTION_TYPES = {
  TAX: 'TAX',
  PENSION: 'PENSION',
  MEDICAL: 'MEDICAL',
  OTHER: 'OTHER',
  HOUSE: 'HOUSE',
  TRANSPORT: 'TRANSPORT',
} as const;

// Default Deductions
export const DEFAULT_DEDUCTIONS = [
  { name: 'Employee Tax', type: 'TAX', percentage: 15 },
  { name: 'Pension', type: 'PENSION', percentage: 5 },
  { name: 'Medical Insurance', type: 'MEDICAL', percentage: 3 },
  { name: 'Others', type: 'OTHER', percentage: 2 },
];

// Months
export const MONTHS = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' },
];

// Years
export const YEARS = Array.from({ length: 5 }, (_, i) => ({
  value: new Date().getFullYear() - 2 + i,
  label: (new Date().getFullYear() - 2 + i).toString(),
}));

// Districts (Rwanda Districts)
export const DISTRICTS = [
  'Kicukiro',
  'Gasabo',
  'Nyarugenge',
  'Nyarugaburiro',
  'Nyanza',
  'Gisagara',
  'Muhanga',
  'Kigali',
  'Rwamagana',
  'Gitarama',
];

// Departments
export const DEPARTMENTS = [
  'Finance',
  'Human Resources',
  'Operations',
  'Information Technology',
  'Legal',
  'Administration',
  'Planning',
  'Monitoring & Evaluation',
];

// Positions
export const POSITIONS = [
  'Director',
  'Manager',
  'Senior Officer',
  'Officer',
  'Assistant Officer',
  'Support Staff',
];

// Message Types
export const MESSAGE_TYPES = {
  SALARY_NOTIFICATION: 'SALARY_NOTIFICATION',
  APPROVAL_NOTIFICATION: 'APPROVAL_NOTIFICATION',
  SYSTEM: 'SYSTEM',
  GENERAL: 'GENERAL',
} as const;

// Chart Colors
export const CHART_COLORS = {
  primary: '#000000',
  secondary: '#6B7280',
  accent: '#3B82F6',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  muted: '#E5E7EB',
} as const;

// Gradient Colors
export const GRADIENTS = {
  primary: ['#000000', '#6B7280'],
  salary: ['#3B82F6', '#1E40AF'],
  success: ['#10B981', '#047857'],
  warning: ['#F59E0B', '#D97706'],
} as const;
