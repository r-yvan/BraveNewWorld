'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronRight,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { SkeletonLoader } from '@/src/components/SkeletonLoader';

const MONTHS = [
  { value: '1', label: 'January' },
  { value: '2', label: 'February' },
  { value: '3', label: 'March' },
  { value: '4', label: 'April' },
  { value: '5', label: 'May' },
  { value: '6', label: 'June' },
  { value: '7', label: 'July' },
  { value: '8', label: 'August' },
  { value: '9', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 5 }, (_, i) => CURRENT_YEAR - i);

// Mock payroll data
const MOCK_PAYROLLS = [
  {
    id: 1,
    month: 6,
    year: 2025,
    status: 'PAID',
    totalGross: 3500000,
    totalDeductions: 700000,
    totalNet: 2800000,
    employeeCount: 50,
    approvedBy: 'Admin User',
    approvedDate: '2025-06-15',
    paidDate: '2025-06-20',
  },
  {
    id: 2,
    month: 5,
    year: 2025,
    status: 'APPROVED',
    totalGross: 3450000,
    totalDeductions: 690000,
    totalNet: 2760000,
    employeeCount: 50,
    approvedBy: 'Admin User',
    approvedDate: '2025-05-20',
    paidDate: null,
  },
  {
    id: 3,
    month: 4,
    year: 2025,
    status: 'PENDING',
    totalGross: 3400000,
    totalDeductions: 680000,
    totalNet: 2720000,
    employeeCount: 50,
    approvedBy: null,
    approvedDate: null,
    paidDate: null,
  },
];

export function PayrollManagement() {
  const [selectedMonth, setSelectedMonth] = useState('6');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PAID':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'APPROVED':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'PENDING':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PAID':
        return 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800';
      case 'APPROVED':
        return 'bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800';
      case 'PENDING':
        return 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950/20 dark:border-yellow-800';
      default:
        return 'bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Process Payroll Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-border bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Process Payroll
            </CardTitle>
            <CardDescription>
              Generate and manage payroll for employees
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Duplicate payroll warning */}
            <Alert className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/20">
              <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
              <AlertDescription className="text-yellow-800 dark:text-yellow-200">
                Payroll for June 2025 already exists. Processing will create a
                duplicate entry. Proceed with caution.
              </AlertDescription>
            </Alert>

            {/* Month/Year selection */}
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">Month</label>
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {MONTHS.map((month) => (
                      <SelectItem key={month.value} value={month.value}>
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Year</label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {YEARS.map((year) => (
                      <SelectItem key={year} value={String(year)}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Preview and Process buttons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowPreview(true)}
                className="gap-2"
              >
                <FileText className="h-4 w-4" />
                Preview
              </Button>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Process Payroll
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Payroll History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Payroll History
            </CardTitle>
            <CardDescription>
              View and manage processed payroll records
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <SkeletonLoader count={3} height={100} />
            ) : (
              <div className="space-y-3">
                {MOCK_PAYROLLS.map((payroll, index) => (
                  <motion.div
                    key={payroll.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className={`flex flex-col gap-4 rounded-lg border p-4 transition-all hover:border-foreground/20 ${getStatusColor(
                      payroll.status
                    )}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(payroll.status)}
                        <div>
                          <p className="font-medium">
                            {MONTHS.find((m) => m.value === String(payroll.month))
                              ?.label}{' '}
                            {payroll.year}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {payroll.employeeCount} employees
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">{payroll.status}</Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 rounded bg-background/50 p-3">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Total Gross
                        </p>
                        <p className="font-semibold">
                          {(payroll.totalGross / 1000000).toFixed(2)}M
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Deductions
                        </p>
                        <p className="font-semibold text-destructive">
                          {(payroll.totalDeductions / 1000000).toFixed(2)}M
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Net</p>
                        <p className="font-semibold text-green-600 dark:text-green-400">
                          {(payroll.totalNet / 1000000).toFixed(2)}M
                        </p>
                      </div>
                    </div>

                    {payroll.approvedDate && (
                      <div className="text-xs text-muted-foreground">
                        Approved by {payroll.approvedBy} on{' '}
                        {new Date(payroll.approvedDate).toLocaleDateString()}
                      </div>
                    )}

                    <Button
                      variant="ghost"
                      size="sm"
                      className="justify-start gap-2"
                    >
                      View Details
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
