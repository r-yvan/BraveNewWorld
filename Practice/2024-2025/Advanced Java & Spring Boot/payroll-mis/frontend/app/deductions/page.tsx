'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/src/components/layout/DashboardLayout';
import { Edit, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock deductions data
const mockDeductions = [
  {
    id: 1,
    name: 'Employee Tax',
    type: 'TAX',
    percentage: 15,
    amount: 13500,
    isActive: true,
  },
  {
    id: 2,
    name: 'Pension',
    type: 'PENSION',
    percentage: 5,
    amount: 4500,
    isActive: true,
  },
  {
    id: 3,
    name: 'Medical Insurance',
    type: 'MEDICAL',
    percentage: 3,
    amount: 2700,
    isActive: true,
  },
  {
    id: 4,
    name: 'Others',
    type: 'OTHER',
    percentage: 2,
    amount: 1800,
    isActive: true,
  },
  {
    id: 5,
    name: 'House Allowance',
    type: 'ALLOWANCE',
    percentage: 0,
    amount: 10000,
    isActive: true,
  },
  {
    id: 6,
    name: 'Transport Allowance',
    type: 'ALLOWANCE',
    percentage: 0,
    amount: 5000,
    isActive: true,
  },
];

export default function DeductionsPage() {
  const [selectedDeduction, setSelectedDeduction] = useState<typeof mockDeductions[0] | null>(null);

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Deductions Management</h1>
            <p className="text-slate-400">Manage employee deductions and allowances</p>
          </div>
          <Button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white">
            <Plus className="w-5 h-5" />
            Add Deduction
          </Button>
        </motion.div>

        {/* Deductions Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {mockDeductions.map((deduction, index) => (
            <motion.div
              key={deduction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedDeduction(deduction)}
              className="p-6 rounded-xl bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 hover:border-slate-700 transition-all duration-300 cursor-pointer"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">{deduction.name}</h3>
                <span className="px-2 py-1 rounded text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30">
                  {deduction.type}
                </span>
              </div>

              {/* Details */}
              <div className="space-y-4 mb-6 pb-6 border-b border-slate-700/50">
                {deduction.percentage > 0 ? (
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Percentage</p>
                    <p className="text-white font-bold text-2xl">{deduction.percentage}%</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Fixed Amount</p>
                    <p className="text-white font-bold text-2xl">${deduction.amount.toLocaleString()}</p>
                  </div>
                )}
                <div>
                  <p className="text-slate-400 text-sm mb-1">Status</p>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${deduction.isActive ? 'bg-green-400' : 'bg-slate-500'}`} />
                    <p className="text-slate-300 text-sm">{deduction.isActive ? 'Active' : 'Inactive'}</p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition-colors text-sm font-medium">
                <Edit className="w-4 h-4" />
                Edit
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Selected Deduction Detail Modal */}
        {selectedDeduction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedDeduction(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-800 rounded-xl border border-slate-700/50 p-8 max-w-md w-full"
            >
              <h2 className="text-2xl font-bold text-white mb-4">{selectedDeduction.name}</h2>
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-slate-400 text-sm mb-1">Type</p>
                  <p className="text-white font-medium">{selectedDeduction.type}</p>
                </div>
                {selectedDeduction.percentage > 0 ? (
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Percentage Rate</p>
                    <p className="text-white font-medium text-2xl">{selectedDeduction.percentage}%</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Fixed Amount</p>
                    <p className="text-white font-medium text-2xl">${selectedDeduction.amount.toLocaleString()}</p>
                  </div>
                )}
                <div>
                  <p className="text-slate-400 text-sm mb-1">Status</p>
                  <p className={`font-medium ${selectedDeduction.isActive ? 'text-green-400' : 'text-red-400'}`}>
                    {selectedDeduction.isActive ? 'Active' : 'Inactive'}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedDeduction(null)}
                  className="flex-1 px-4 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-white transition-colors font-medium"
                >
                  Close
                </button>
                <button className="flex-1 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors font-medium">
                  Edit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
