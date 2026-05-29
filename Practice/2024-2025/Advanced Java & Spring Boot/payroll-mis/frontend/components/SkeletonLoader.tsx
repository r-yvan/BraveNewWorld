'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function SkeletonCard() {
  return (
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="p-6 rounded-xl bg-slate-700/50 border border-slate-600/30"
    >
      <div className="h-10 bg-slate-600/50 rounded-lg mb-4" />
      <div className="h-4 bg-slate-600/50 rounded w-1/2" />
    </motion.div>
  );
}

export function SkeletonChart() {
  return (
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="p-6 rounded-xl bg-slate-700/50 border border-slate-600/30 h-80"
    >
      <div className="space-y-4">
        <div className="h-6 bg-slate-600/50 rounded w-1/4" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-slate-600/50 rounded" />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function SkeletonTable() {
  return (
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="space-y-3"
    >
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-12 bg-slate-700/50 rounded-lg border border-slate-600/30" />
      ))}
    </motion.div>
  );
}
