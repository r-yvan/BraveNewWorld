'use client';

import React from 'react';
import { DashboardLayout } from '@/src/components/layout/DashboardLayout';
import { DashboardContent } from '@/src/features/dashboard/DashboardContent';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <DashboardContent />
    </DashboardLayout>
  );
}
