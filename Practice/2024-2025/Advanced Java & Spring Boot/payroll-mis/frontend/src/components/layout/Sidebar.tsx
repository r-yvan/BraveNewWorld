'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  DollarSign,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import { ROLES } from '@/constants';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  roles: string[];
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard className="w-5 h-5" />,
    roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.EMPLOYEE],
  },
  {
    label: 'Employees',
    href: '/employees',
    icon: <Users className="w-5 h-5" />,
    roles: [ROLES.ADMIN, ROLES.MANAGER],
  },
  {
    label: 'Payroll',
    href: '/payroll',
    icon: <DollarSign className="w-5 h-5" />,
    roles: [ROLES.ADMIN, ROLES.MANAGER],
  },
  {
    label: 'Payslips',
    href: '/payslips',
    icon: <FileText className="w-5 h-5" />,
    roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.EMPLOYEE],
  },
  {
    label: 'Deductions',
    href: '/deductions',
    icon: <Settings className="w-5 h-5" />,
    roles: [ROLES.ADMIN, ROLES.MANAGER],
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: <Settings className="w-5 h-5" />,
    roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.EMPLOYEE],
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  const visibleItems = navItems.filter((item) => 
    user && item.roles.includes(user.role)
  );

  const handleLogout = () => {
    logout();
    window.location.href = '/auth/login';
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        animate={{
          x: isOpen ? 0 : -280,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 h-screen w-[280px] bg-slate-800/90 backdrop-blur-xl border-r border-slate-700/50 z-50 md:translate-x-0 md:relative flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/50 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Gov ERP</h2>
              <p className="text-xs text-slate-400">Payroll System</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="md:hidden p-1 hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {visibleItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onClose()}
                className="group relative"
              >
                <motion.div
                  whileHover={{ x: 4 }}
                  whileTap={{ x: 2 }}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                    isActive
                      ? 'bg-blue-500/20 text-blue-400 shadow-lg shadow-blue-500/10'
                      : 'text-slate-400 hover:bg-slate-700/40 hover:text-slate-300'
                  )}
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-400 rounded-r-lg"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-slate-700/50 space-y-4">
          <div className="px-4 py-3 rounded-lg bg-slate-700/30 border border-slate-600/30">
            <p className="text-xs text-slate-400 mb-1">Logged in as</p>
            <p className="text-sm font-medium text-white truncate">{user?.fullName}</p>
            <p className="text-xs text-slate-500 mt-1 capitalize">
              {user?.role.replace('ROLE_', '').toLowerCase()}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </motion.div>
    </>
  );
}
