'use client';

import React from 'react';
import { DashboardLayout } from '@/src/components/layout/DashboardLayout';
import { PayslipsViewer } from '@/src/features/payslips/PayslipsViewer';

export default function PayslipsPage() {
  return (
    <DashboardLayout>
      <PayslipsViewer />
    </DashboardLayout>
  );
}
