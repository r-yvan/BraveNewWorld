'use client';

import React from 'react';
import { DashboardLayout } from '@/src/components/layout/DashboardLayout';
import { PayrollManagement } from '@/src/features/payroll/PayrollManagement';

export default function PayrollPage() {
  return (
    <DashboardLayout>
      <PayrollManagement />
    </DashboardLayout>
  );
}
