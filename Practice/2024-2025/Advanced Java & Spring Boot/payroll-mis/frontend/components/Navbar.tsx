'use client';

import React, { useState } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import {
  Menu,
  Search,
  Bell,
  Moon,
  Sun,
  ChevronDown,
  LogOut,
  Settings,
  User,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import { Input } from '@/components/ui/input';

interface NavbarProps {
  onMenuClick: () => void;
  isSidebarOpen: boolean;
}

export function Navbar({ onMenuClick, isSidebarOpen }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuthStore();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [unreadCount] = useState(3); // Mock data

  const handleLogout = () => {
    logout();
    window.location.href = '/auth/login';
  };

  return (
    <nav className="sticky top-0 z-40 bg-slate-800/50 backdrop-blur-xl border-b border-slate-700/50 h-16 flex items-center">
      <div className="w-full px-4 md:px-6 flex items-center justify-between gap-4">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors md:hidden"
          >
            <Menu className="w-5 h-5 text-slate-400" />
          </button>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-xs">
            <Search className="absolute left-3 w-4 h-4 text-slate-500" />
            <Input
              type="text"
              placeholder="Search employees, payroll..."
              className="pl-10 bg-slate-700/30 border-slate-600/30 text-slate-300 placeholder-slate-500 text-sm"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-slate-400" />
            ) : (
              <Moon className="w-5 h-5 text-slate-400" />
            )}
          </motion.button>

          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <Bell className="w-5 h-5 text-slate-400" />
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
              />
            )}
          </motion.button>

          {/* User Profile Dropdown */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 px-3 py-2 hover:bg-slate-700/50 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                <span className="text-xs font-bold text-blue-400">
                  {user?.fullName
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()}
                </span>
              </div>
              <div className="hidden md:flex flex-col items-start">
                <p className="text-sm font-medium text-white">{user?.fullName}</p>
                <p className="text-xs text-slate-400 capitalize">
                  {user?.role.replace('ROLE_', '').toLowerCase()}
                </p>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </motion.button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700/50 rounded-lg shadow-xl z-50"
              >
                <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-700/50 transition-colors text-left text-sm text-slate-300 border-b border-slate-700/50">
                  <User className="w-4 h-4" />
                  View Profile
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-700/50 transition-colors text-left text-sm text-slate-300 border-b border-slate-700/50">
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-500/10 transition-colors text-left text-sm text-red-400"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
