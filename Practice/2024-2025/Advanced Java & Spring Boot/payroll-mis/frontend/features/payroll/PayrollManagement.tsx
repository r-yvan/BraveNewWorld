'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  Plus,
  Filter,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MONTHS, YEARS } from '@/constants';

// Mock payroll data
const mockPayrolls = [
  {
    id: 1,
    month: 6,
    year: 2025,
    totalEmployees: 295,
    grossSalary: 2500000,
    netSalary: 2080000,
    totalDeductions: 420000,
    status: 'PAID',
    createdAt: '2025-06-01',
    approvedAt: '2025-06-05',
    paidAt: '2025-06-28',
  },
  {
    id: 2,
    month: 5,
    year: 2025,
    totalEmployees: 290,
    grossSalary: 2400000,
    netSalary: 2000000,
    totalDeductions: 400000,
    status: 'PAID',
    createdAt: '2025-05-01',
    approvedAt: '2025-05-05',
    paidAt: '2025-05-28',
  },
  {
    id: 3,
    month: 7,
    year: 2025,
    totalEmployees: 295,
    grossSalary: 2550000,
    netSalary: 2124000,
    totalDeductions: 426000,
    status: 'APPROVED',
    createdAt: '2025-07-01',
    approvedAt: '2025-07-05',
    paidAt: null,
  },
  {
    id: 4,
    month: 8,
    year: 2025,
    totalEmployees: 295,
    grossSalary: 2550000,
    netSalary: 0,
    totalDeductions: 0,
    status: 'PENDING',
    createdAt: '2025-08-01',
    approvedAt: null,
    paidAt: null,
  },
];

const payrollChartData = [
  { month: 'Jun', gross: 2500, net: 2080, deductions: 420 },
  { month: 'May', gross: 2400, net: 2000, deductions: 400 },
  { month: 'Apr', gross: 2350, net: 1960, deductions: 390 },
  { month: 'Mar', gross: 2300, net: 1920, deductions: 380 },
  { month: 'Feb', gross: 2250, net: 1880, deductions: 370 },
  { month: 'Jan', gross: 2200, net: 1840, deductions: 360 },
];

export function PayrollManagement() {
  const [isLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(8);
  const [selectedYear, setSelectedYear] = useState(2025);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PAID':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'APPROVED':
        return <CheckCircle className="w-5 h-5 text-blue-400" />;
      case 'PENDING':
        return <Clock className="w-5 h-5 text-orange-400" />;
      case 'REJECTED':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PAID':
        return 'bg-green-500/10 text-green-400 border border-green-500/30';
      case 'APPROVED':
        return 'bg-blue-500/10 text-blue-400 border border-blue-500/30';
      case 'PENDING':
        return 'bg-orange-500/10 text-orange-400 border border-orange-500/30';
      case 'REJECTED':
        return 'bg-red-500/10 text-red-400 border border-red-500/30';
      default:
        return '';
    }
  };

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Payroll Management</h1>
          <p className="text-slate-400">Process and manage employee payroll</p>
        </div>
        <Button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white">
          <Plus className="w-5 h-5" />
          Process Payroll
        </Button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-6 flex gap-4 flex-wrap"
      >
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-slate-300 mb-2">Month</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="w-full px-4 py-2 rounded-lg bg-slate-700/30 border border-slate-600/30 text-white"
          >
            {MONTHS.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-slate-300 mb-2">Year</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="w-full px-4 py-2 rounded-lg bg-slate-700/30 border border-slate-600/30 text-white"
          >
            {YEARS.map((year) => (
              <option key={year.value} value={year.value}>
                {year.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
          <select className="w-full px-4 py-2 rounded-lg bg-slate-700/30 border border-slate-600/30 text-white">
            <option>All</option>
            <option>PENDING</option>
            <option>APPROVED</option>
            <option>PAID</option>
            <option>REJECTED</option>
          </select>
        </div>
      </motion.div>

      {/* Charts */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8 p-6 rounded-xl bg-slate-800/40 backdrop-blur-sm border border-slate-700/50"
      >
        <h3 className="text-lg font-semibold text-white mb-6">Payroll Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={payrollChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
            <XAxis stroke="#94A3B8" dataKey="month" />
            <YAxis stroke="#94A3B8" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #475569',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#cbd5e1' }}
            />
            <Legend />
            <Bar dataKey="gross" fill="#3B82F6" radius={[8, 8, 0, 0]} name="Gross Salary" />
            <Bar dataKey="net" fill="#10B981" radius={[8, 8, 0, 0]} name="Net Salary" />
            <Bar dataKey="deductions" fill="#EF4444" radius={[8, 8, 0, 0]} name="Deductions" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Payroll List */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="rounded-xl bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/50 bg-slate-700/30">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Period</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Employees</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Gross Salary</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Deductions</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Net Salary</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockPayrolls.map((payroll, index) => (
                <motion.tr
                  key={payroll.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors duration-200"
                >
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-white">
                      {MONTHS.find((m) => m.value === payroll.month)?.label} {payroll.year}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">{payroll.totalEmployees}</td>
                  <td className="px-6 py-4 text-sm font-medium text-white">
                    ${(payroll.grossSalary / 1000).toFixed(1)}K
                  </td>
                  <td className="px-6 py-4 text-sm text-red-400">
                    ${(payroll.totalDeductions / 1000).toFixed(1)}K
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-green-400">
                    ${(payroll.netSalary / 1000).toFixed(1)}K
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2 w-fit ${getStatusColor(payroll.status)}`}>
                      {getStatusIcon(payroll.status)}
                      {payroll.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition-colors text-sm font-medium">
                      <FileText className="w-4 h-4" />
                      View
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
