'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { hoverLiftVariants } from '@/lib/animations'

interface MetricCardProps {
  label: string
  value: string
  change: number
  icon: string
}

export function MetricCard({ label, value, change, icon }: MetricCardProps) {
  const isPositive = change >= 0

  return (
    <motion.div
      variants={hoverLiftVariants}
      initial="rest"
      whileHover="hover"
    >
      <Card className="border-border/50 bg-card/50 p-6 backdrop-blur">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            <p
              className={`text-xs font-medium ${
                isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}
            >
              {isPositive ? '↑' : '↓'} {Math.abs(change)}% from last month
            </p>
          </div>
          <div className="text-4xl opacity-50">{icon}</div>
        </div>
      </Card>
    </motion.div>
  )
}
