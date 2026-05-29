'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Trash2, Edit, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SkeletonTable } from '@/components/SkeletonLoader';

// Mock employee data
const mockEmployees = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@gov.rw',
    employeeCode: 'EMP001',
    department: 'Finance',
    position: 'Senior Officer',
    baseSalary: 75000,
    status: 'ACTIVE',
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@gov.rw',
    employeeCode: 'EMP002',
    department: 'Human Resources',
    position: 'Manager',
    baseSalary: 85000,
    status: 'ACTIVE',
  },
  {
    id: 3,
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob.johnson@gov.rw',
    employeeCode: 'EMP003',
    department: 'Operations',
    position: 'Officer',
    baseSalary: 60000,
    status: 'INACTIVE',
  },
  {
    id: 4,
    firstName: 'Alice',
    lastName: 'Williams',
    email: 'alice.williams@gov.rw',
    employeeCode: 'EMP004',
    department: 'Information Technology',
    position: 'Senior Officer',
    baseSalary: 90000,
    status: 'ACTIVE',
  },
  {
    id: 5,
    firstName: 'Charlie',
    lastName: 'Brown',
    email: 'charlie.brown@gov.rw',
    employeeCode: 'EMP005',
    department: 'Finance',
    position: 'Officer',
    baseSalary: 65000,
    status: 'ACTIVE',
  },
];

export function EmployeeList() {
  const [isLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredEmployees = mockEmployees.filter((emp) =>
    emp.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.employeeCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-500/10 text-green-400 border border-green-500/30';
      case 'INACTIVE':
        return 'bg-slate-500/10 text-slate-400 border border-slate-500/30';
      case 'SUSPENDED':
        return 'bg-red-500/10 text-red-400 border border-red-500/30';
      default:
        return 'bg-slate-500/10 text-slate-400';
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
          <h1 className="text-3xl font-bold text-white mb-2">Employees</h1>
          <p className="text-slate-400">Manage all employees in the system</p>
        </div>
        <Button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white">
          <Plus className="w-5 h-5" />
          Add Employee
        </Button>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-6 flex gap-4"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <Input
            type="text"
            placeholder="Search employees..."
            className="pl-10 bg-slate-700/30 border-slate-600/30 text-white"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="rounded-xl bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 overflow-hidden"
      >
        {isLoading ? (
          <div className="p-6">
            <SkeletonTable />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700/50 bg-slate-700/30">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Code</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Department</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Position</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Salary</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee, index) => (
                  <motion.tr
                    key={employee.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                          <span className="text-xs font-bold text-blue-400">
                            {employee.firstName[0]}{employee.lastName[0]}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">
                            {employee.firstName} {employee.lastName}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">{employee.email}</td>
                    <td className="px-6 py-4 text-sm font-mono text-slate-300">{employee.employeeCode}</td>
                    <td className="px-6 py-4 text-sm text-slate-400">{employee.department}</td>
                    <td className="px-6 py-4 text-sm text-slate-400">{employee.position}</td>
                    <td className="px-6 py-4 text-sm font-medium text-white">
                      ${employee.baseSalary.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(employee.status)}`}>
                        {employee.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors text-slate-400 hover:text-slate-300">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors text-slate-400 hover:text-slate-300">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-red-400 hover:text-red-300">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-slate-700/50 flex items-center justify-between bg-slate-700/20">
          <p className="text-sm text-slate-400">
            Showing {filteredEmployees.length} of {filteredEmployees.length} employees
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 text-sm transition-colors disabled:opacity-50">
              Previous
            </button>
            <button className="px-4 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 text-sm transition-colors disabled:opacity-50">
              Next
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
