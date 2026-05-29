'use client';

import React from 'react';
import { DashboardLayout } from '@/src/components/layout/DashboardLayout';
import { EmployeeList } from '@/src/features/employees/EmployeeList';

export default function EmployeesPage() {
  return (
    <DashboardLayout>
      <EmployeeList />
    </DashboardLayout>
  );
}
