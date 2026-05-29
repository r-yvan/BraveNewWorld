'use client';

import { EmployeeList } from '@/src/features/employees/EmployeeList';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Users } from 'lucide-react';

export function EmployeePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6" />
          <h1 className="text-3xl font-bold">Employee Management</h1>
        </div>
        <p className="mt-2 text-muted-foreground">
          Manage and view all government employees in the system
        </p>
      </div>

      {/* Main content */}
      <EmployeeList />
    </div>
  );
}
