'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  animate?: boolean;
  color?: 'blue' | 'green' | 'orange' | 'red' | 'purple';
}

const colorClasses = {
  blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
  green: 'bg-green-500/10 border-green-500/20 text-green-400',
  orange: 'bg-orange-500/10 border-orange-500/20 text-orange-400',
  red: 'bg-red-500/10 border-red-500/20 text-red-400',
  purple: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
};

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  className,
  animate = true,
  color = 'blue',
}: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(typeof value === 'number' ? 0 : value);

  useEffect(() => {
    if (typeof value !== 'number' || !animate) {
      setDisplayValue(value);
      return;
    }

    let start = 0;
    const end = value;
    const duration = 1.5;
    const steps = 60;
    const increment = end / steps;
    let current = 0;

    const interval = setInterval(() => {
      current += 1;
      start += increment;
      if (current >= steps) {
        setDisplayValue(end);
        clearInterval(interval);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, (duration * 1000) / steps);

    return () => clearInterval(interval);
  }, [value, animate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
      className={cn(
        'relative p-6 rounded-xl border bg-slate-800/40 backdrop-blur-sm overflow-hidden',
        'hover:shadow-lg transition-all duration-300',
        className
      )}
    >
      {/* Background Gradient */}
      <div
        className={cn(
          'absolute inset-0 rounded-xl border opacity-50',
          colorClasses[color]
        )}
      />

      <div className="relative z-10">
        {/* Header with Icon */}
        <div className="flex items-start justify-between mb-4">
          <div className={cn('p-3 rounded-lg border', colorClasses[color])}>
            <Icon className="w-6 h-6" />
          </div>
          {trend && (
            <div
              className={cn(
                'px-2 py-1 rounded text-xs font-semibold',
                trend.isPositive
                  ? 'bg-green-500/10 text-green-400'
                  : 'bg-red-500/10 text-red-400'
              )}
            >
              {trend.isPositive ? '+' : '-'} {Math.abs(trend.value)}%
            </div>
          )}
        </div>

        {/* Value */}
        <div className="mb-2">
          <motion.h3
            className="text-3xl font-bold text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {typeof displayValue === 'number'
              ? displayValue.toLocaleString()
              : displayValue}
          </motion.h3>
        </div>

        {/* Title */}
        <p className="text-sm text-slate-400">{title}</p>
      </div>
    </motion.div>
  );
}
