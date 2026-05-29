'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  Users,
  UserCheck,
  Clock,
  CheckCircle,
  DollarSign,
  TrendingUp,
} from 'lucide-react';
import { StatCard } from '@/components/StatCard';
import { SkeletonCard, SkeletonChart } from '@/components/SkeletonLoader';

// Mock data for charts
const monthlyData = [
  { month: 'Jan', salary: 45000, deductions: 8000 },
  { month: 'Feb', salary: 52000, deductions: 9200 },
  { month: 'Mar', salary: 48000, deductions: 8500 },
  { month: 'Apr', salary: 61000, deductions: 10200 },
  { month: 'May', salary: 55000, deductions: 9500 },
  { month: 'Jun', salary: 67000, deductions: 11200 },
];

const employeeStatusData = [
  { name: 'Active', value: 245, fill: '#10B981' },
  { name: 'Inactive', value: 42, fill: '#6B7280' },
  { name: 'Suspended', value: 8, fill: '#EF4444' },
];

const deductionsData = [
  { name: 'Employee Tax', value: 35 },
  { name: 'Pension', value: 25 },
  { name: 'Medical Insurance', value: 20 },
  { name: 'Others', value: 20 },
];

const payrollStatusData = [
  { status: 'Pending', count: 15, fill: '#F59E0B' },
  { status: 'Approved', count: 42, fill: '#3B82F6' },
  { status: 'Paid', count: 189, fill: '#10B981' },
  { status: 'Rejected', count: 3, fill: '#EF4444' },
];

export function DashboardContent() {
  const [isLoading] = React.useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-slate-400">Welcome back! Here&apos;s your payroll overview.</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
      >
        {isLoading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            <motion.div variants={itemVariants}>
              <StatCard
                title="Total Employees"
                value={295}
                icon={Users}
                trend={{ value: 12, isPositive: true }}
                color="blue"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatCard
                title="Active Employees"
                value={245}
                icon={UserCheck}
                trend={{ value: 8, isPositive: true }}
                color="green"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatCard
                title="Pending Payrolls"
                value={15}
                icon={Clock}
                trend={{ value: 5, isPositive: false }}
                color="orange"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatCard
                title="Paid Payrolls"
                value={189}
                icon={CheckCircle}
                trend={{ value: 18, isPositive: true }}
                color="green"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatCard
                title="Total Salary Amount"
                value="$2.5M"
                icon={DollarSign}
                trend={{ value: 15, isPositive: true }}
                color="purple"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatCard
                title="Total Deductions"
                value="$420K"
                icon={TrendingUp}
                trend={{ value: 3, isPositive: false }}
                color="red"
              />
            </motion.div>
          </>
        )}
      </motion.div>

      {/* Charts Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
      >
        {/* Salary Analytics */}
        <motion.div variants={itemVariants}>
          <div className="p-6 rounded-xl bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 hover:border-slate-700 transition-all duration-300">
            <h3 className="text-lg font-semibold text-white mb-6">Monthly Salary Trends</h3>
            {isLoading ? (
              <SkeletonChart />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="colorSalary" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                  <XAxis stroke="#94A3B8" />
                  <YAxis stroke="#94A3B8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #475569',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: '#cbd5e1' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="salary"
                    stroke="#3B82F6"
                    fillOpacity={1}
                    fill="url(#colorSalary)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>

        {/* Payroll Status */}
        <motion.div variants={itemVariants}>
          <div className="p-6 rounded-xl bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 hover:border-slate-700 transition-all duration-300">
            <h3 className="text-lg font-semibold text-white mb-6">Payroll Status Distribution</h3>
            {isLoading ? (
              <SkeletonChart />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={payrollStatusData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                  <XAxis stroke="#94A3B8" dataKey="status" />
                  <YAxis stroke="#94A3B8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #475569',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: '#cbd5e1' }}
                  />
                  <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                    {payrollStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>

        {/* Employee Status */}
        <motion.div variants={itemVariants}>
          <div className="p-6 rounded-xl bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 hover:border-slate-700 transition-all duration-300">
            <h3 className="text-lg font-semibold text-white mb-6">Employee Status Breakdown</h3>
            {isLoading ? (
              <SkeletonChart />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={employeeStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {employeeStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #475569',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: '#cbd5e1' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>

        {/* Deductions Breakdown */}
        <motion.div variants={itemVariants}>
          <div className="p-6 rounded-xl bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 hover:border-slate-700 transition-all duration-300">
            <h3 className="text-lg font-semibold text-white mb-6">Deductions Breakdown</h3>
            {isLoading ? (
              <SkeletonChart />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={deductionsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {[
                      '#3B82F6',
                      '#10B981',
                      '#F59E0B',
                      '#EF4444',
                    ].map((color, index) => (
                      <Cell key={`cell-${index}`} fill={color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #475569',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: '#cbd5e1' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>

        {/* Comparison Chart */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <div className="p-6 rounded-xl bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 hover:border-slate-700 transition-all duration-300">
            <h3 className="text-lg font-semibold text-white mb-6">Salary vs Deductions</h3>
            {isLoading ? (
              <SkeletonChart />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
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
                  <Bar
                    dataKey="salary"
                    fill="#3B82F6"
                    radius={[8, 8, 0, 0]}
                    name="Salary"
                  />
                  <Bar
                    dataKey="deductions"
                    fill="#EF4444"
                    radius={[8, 8, 0, 0]}
                    name="Deductions"
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
