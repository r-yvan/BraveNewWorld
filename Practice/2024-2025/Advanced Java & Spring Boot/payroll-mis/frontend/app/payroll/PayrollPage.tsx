'use client';

import { PayrollManagement } from '@/src/features/payroll/PayrollManagement';
import { CreditCard } from 'lucide-react';

export function PayrollPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <CreditCard className="h-6 w-6" />
          <h1 className="text-3xl font-bold">Payroll Management</h1>
        </div>
        <p className="mt-2 text-muted-foreground">
          Process, approve, and manage payroll for all employees
        </p>
      </div>

      {/* Main content */}
      <PayrollManagement />
    </div>
  );
}
