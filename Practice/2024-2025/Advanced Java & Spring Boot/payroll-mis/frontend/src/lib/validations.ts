import { z } from 'zod';

// Auth Schemas
export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const ResetPasswordSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(6, 'Current password is required'),
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Employee Schema
export const EmployeeSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  district: z.string().min(1, 'District is required'),
  mobile: z.string().min(10, 'Mobile number must be at least 10 digits'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  employeeCode: z.string().min(1, 'Employee code is required'),
  department: z.string().min(1, 'Department is required'),
  position: z.string().min(1, 'Position is required'),
  baseSalary: z.number().min(0, 'Base salary must be greater than 0'),
  status: z.enum(['ACTIVE', 'INACTIVE', 'SUSPENDED']),
  joiningDate: z.string().min(1, 'Joining date is required'),
});

// Payroll Schema
export const PayrollSchema = z.object({
  month: z.number().min(1).max(12),
  year: z.number().min(2000).max(2100),
});

// Deduction Schema
export const DeductionSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.enum(['TAX', 'PENSION', 'MEDICAL', 'OTHER', 'HOUSE', 'TRANSPORT']),
  percentage: z.number().min(0).max(100),
  amount: z.number().min(0).optional(),
  isActive: z.boolean().optional(),
});

// Password Change Schema
export const PasswordChangeSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type LoginFormData = z.infer<typeof LoginSchema>;
export type ForgotPasswordFormData = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof ResetPasswordSchema>;
export type ChangePasswordFormData = z.infer<typeof ChangePasswordSchema>;
export type EmployeeFormData = z.infer<typeof EmployeeSchema>;
export type PayrollFormData = z.infer<typeof PayrollSchema>;
export type DeductionFormData = z.infer<typeof DeductionSchema>;
