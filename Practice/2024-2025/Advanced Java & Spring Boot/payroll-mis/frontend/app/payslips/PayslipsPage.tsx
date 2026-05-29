'use client';

import { PayslipsViewer } from '@/src/features/payslips/PayslipsViewer';
import { FileText } from 'lucide-react';

export function PayslipsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6" />
          <h1 className="text-3xl font-bold">Payslips</h1>
        </div>
        <p className="mt-2 text-muted-foreground">
          View, download, and print your payslips
        </p>
      </div>

      {/* Main content */}
      <PayslipsViewer />
    </div>
  );
}
