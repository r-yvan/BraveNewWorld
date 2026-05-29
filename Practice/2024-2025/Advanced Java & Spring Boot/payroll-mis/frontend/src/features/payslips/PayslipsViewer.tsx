'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Download,
  Printer,
  ChevronDown,
  Search,
  Filter,
  Eye,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { SkeletonLoader } from '@/src/components/SkeletonLoader';

// Mock payslip data
const MOCK_PAYSLIPS = [
  {
    id: 1,
    month: 6,
    year: 2025,
    employeeName: 'John Doe',
    position: 'Manager',
    baseSalary: 70000,
    houseAllowance: 14000,
    transportAllowance: 5000,
    grossSalary: 89000,
    employeeTax: 8900,
    pension: 4450,
    medicalInsurance: 2000,
    otherDeductions: 1000,
    netSalary: 72650,
    status: 'PAID',
    paidDate: '2025-06-20',
  },
  {
    id: 2,
    month: 5,
    year: 2025,
    employeeName: 'John Doe',
    position: 'Manager',
    baseSalary: 70000,
    houseAllowance: 14000,
    transportAllowance: 5000,
    grossSalary: 89000,
    employeeTax: 8900,
    pension: 4450,
    medicalInsurance: 2000,
    otherDeductions: 1000,
    netSalary: 72650,
    status: 'PAID',
    paidDate: '2025-05-20',
  },
  {
    id: 3,
    month: 4,
    year: 2025,
    employeeName: 'John Doe',
    position: 'Manager',
    baseSalary: 70000,
    houseAllowance: 14000,
    transportAllowance: 5000,
    grossSalary: 89000,
    employeeTax: 8900,
    pension: 4450,
    medicalInsurance: 2000,
    otherDeductions: 1000,
    netSalary: 72650,
    status: 'PAID',
    paidDate: '2025-04-20',
  },
];

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function PayslipsViewer() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const filteredPayslips = MOCK_PAYSLIPS.filter((slip) =>
    `${slip.employeeName} ${slip.month}/${slip.year}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search payslips..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Payslips List */}
      {isLoading ? (
        <SkeletonLoader count={3} height={150} />
      ) : filteredPayslips.length === 0 ? (
        <Card className="border-border bg-card">
          <CardContent className="flex h-48 items-center justify-center">
            <p className="text-muted-foreground">No payslips found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredPayslips.map((slip, index) => (
              <motion.div
                key={slip.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="border-border bg-card hover:border-foreground/20 transition-all">
                  <div className="p-6">
                    {/* Header */}
                    <motion.div
                      className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
                      onClick={() =>
                        setExpandedId(
                          expandedId === slip.id ? null : slip.id
                        )
                      }
                      role="button"
                      tabIndex={0}
                    >
                      <div className="flex items-center gap-4">
                        <div className="rounded-lg bg-primary/10 p-3">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">
                            {MONTHS[slip.month - 1]} {slip.year}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {slip.employeeName} • {slip.position}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">
                            Net Salary
                          </p>
                          <p className="text-lg font-bold text-green-600 dark:text-green-400">
                            {slip.netSalary.toLocaleString()}
                          </p>
                        </div>
                        <Badge
                          variant={
                            slip.status === 'PAID' ? 'default' : 'secondary'
                          }
                        >
                          {slip.status}
                        </Badge>
                        <motion.div
                          animate={{
                            rotate: expandedId === slip.id ? 180 : 0,
                          }}
                        >
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Expanded Content */}
                    <AnimatePresence>
                      {expandedId === slip.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-6 border-t border-border pt-6"
                        >
                          {/* Salary Breakdown */}
                          <div className="grid gap-6 md:grid-cols-2">
                            <div>
                              <h4 className="mb-4 font-semibold">Earnings</h4>
                              <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">
                                    Base Salary
                                  </span>
                                  <span className="font-medium">
                                    {slip.baseSalary.toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">
                                    House Allowance
                                  </span>
                                  <span className="font-medium">
                                    {slip.houseAllowance.toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">
                                    Transport Allowance
                                  </span>
                                  <span className="font-medium">
                                    {slip.transportAllowance.toLocaleString()}
                                  </span>
                                </div>
                                <div className="border-t border-border pt-3">
                                  <div className="flex justify-between">
                                    <span className="font-medium">
                                      Gross Salary
                                    </span>
                                    <span className="font-bold">
                                      {slip.grossSalary.toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="mb-4 font-semibold">Deductions</h4>
                              <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">
                                    Employee Tax
                                  </span>
                                  <span className="font-medium text-destructive">
                                    -{slip.employeeTax.toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">
                                    Pension
                                  </span>
                                  <span className="font-medium text-destructive">
                                    -{slip.pension.toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">
                                    Medical Insurance
                                  </span>
                                  <span className="font-medium text-destructive">
                                    -{slip.medicalInsurance.toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">
                                    Other
                                  </span>
                                  <span className="font-medium text-destructive">
                                    -{slip.otherDeductions.toLocaleString()}
                                  </span>
                                </div>
                                <div className="border-t border-border pt-3">
                                  <div className="flex justify-between">
                                    <span className="font-medium">
                                      Net Salary
                                    </span>
                                    <span className="font-bold text-green-600 dark:text-green-400">
                                      {slip.netSalary.toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="mt-6 flex gap-2 border-t border-border pt-6">
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-2"
                            >
                              <Eye className="h-4 w-4" />
                              View Full
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-2"
                            >
                              <Download className="h-4 w-4" />
                              Download PDF
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-2"
                            >
                              <Printer className="h-4 w-4" />
                              Print
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
