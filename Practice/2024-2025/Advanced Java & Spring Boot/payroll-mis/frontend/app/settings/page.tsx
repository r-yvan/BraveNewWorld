'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/src/components/layout/DashboardLayout';
import { useTheme } from 'next-themes';
import { useAuthStore } from '@/store/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sun, Moon, User, Lock, Bell } from 'lucide-react';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-slate-400">Manage your account and system preferences</p>
        </motion.div>

        {/* Settings Tabs */}
        <div className="flex gap-4 mb-8 border-b border-slate-700/50 overflow-x-auto">
          {[
            { id: 'profile', label: 'Profile', icon: User },
            { id: 'password', label: 'Password', icon: Lock },
            { id: 'theme', label: 'Theme', icon: Sun },
            { id: 'notifications', label: 'Notifications', icon: Bell },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-slate-800/40 backdrop-blur-sm border border-slate-700/50">
                <h3 className="text-lg font-semibold text-white mb-6">Profile Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                    <Input
                      type="text"
                      value={user?.fullName || ''}
                      readOnly
                      className="bg-slate-700/30 border-slate-600/30 text-slate-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                    <Input
                      type="email"
                      value={user?.email || ''}
                      readOnly
                      className="bg-slate-700/30 border-slate-600/30 text-slate-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Role</label>
                    <Input
                      type="text"
                      value={user?.role.replace('ROLE_', '').toUpperCase() || ''}
                      readOnly
                      className="bg-slate-700/30 border-slate-600/30 text-slate-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Password Tab */}
          {activeTab === 'password' && (
            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-slate-800/40 backdrop-blur-sm border border-slate-700/50">
                <h3 className="text-lg font-semibold text-white mb-6">Change Password</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Current Password</label>
                    <Input
                      type="password"
                      placeholder="Enter your current password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="bg-slate-700/30 border-slate-600/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">New Password</label>
                    <Input
                      type="password"
                      placeholder="Enter your new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="bg-slate-700/30 border-slate-600/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Confirm Password</label>
                    <Input
                      type="password"
                      placeholder="Confirm your new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="bg-slate-700/30 border-slate-600/30"
                    />
                  </div>
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white font-medium">
                    Update Password
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Theme Tab */}
          {activeTab === 'theme' && (
            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-slate-800/40 backdrop-blur-sm border border-slate-700/50">
                <h3 className="text-lg font-semibold text-white mb-6">Theme Preference</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setTheme('light')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      theme === 'light'
                        ? 'bg-yellow-500/10 border-yellow-500'
                        : 'bg-slate-700/30 border-slate-600/30 hover:border-slate-600/50'
                    }`}
                  >
                    <Sun className={`w-8 h-8 mb-2 ${theme === 'light' ? 'text-yellow-400' : 'text-slate-400'}`} />
                    <p className={`font-semibold ${theme === 'light' ? 'text-yellow-400' : 'text-slate-300'}`}>
                      Light Mode
                    </p>
                  </button>
                  <button
                    onClick={() => setTheme('dark')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      theme === 'dark'
                        ? 'bg-blue-500/10 border-blue-500'
                        : 'bg-slate-700/30 border-slate-600/30 hover:border-slate-600/50'
                    }`}
                  >
                    <Moon className={`w-8 h-8 mb-2 ${theme === 'dark' ? 'text-blue-400' : 'text-slate-400'}`} />
                    <p className={`font-semibold ${theme === 'dark' ? 'text-blue-400' : 'text-slate-300'}`}>
                      Dark Mode
                    </p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-slate-800/40 backdrop-blur-sm border border-slate-700/50">
                <h3 className="text-lg font-semibold text-white mb-6">Notification Preferences</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Payroll Notifications', description: 'Get notified when payroll is processed' },
                    { label: 'Approval Alerts', description: 'Notify when payroll requires approval' },
                    { label: 'Payment Confirmation', description: 'Confirm when salary is paid' },
                    { label: 'System Updates', description: 'Important system announcements' },
                  ].map((notification) => (
                    <div key={notification.label} className="flex items-center justify-between p-4 rounded-lg bg-slate-700/20 border border-slate-700/30">
                      <div>
                        <p className="font-medium text-white">{notification.label}</p>
                        <p className="text-sm text-slate-400">{notification.description}</p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-5 h-5 rounded accent-blue-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
