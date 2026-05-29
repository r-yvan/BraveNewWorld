'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { containerVariants, itemVariants } from '@/lib/animations'
import { MetricCard } from '@/components/dashboard/metric-card'
import { Chart } from '@/components/dashboard/chart'
import { ActivityFeed } from '@/components/dashboard/activity-feed'

const metrics = [
  {
    label: 'Total Revenue',
    value: '$12,543',
    change: 12.5,
    icon: '💰',
  },
  {
    label: 'Active Users',
    value: '2,847',
    change: 8.2,
    icon: '👥',
  },
  {
    label: 'Conversion Rate',
    value: '3.24%',
    change: 2.1,
    icon: '📊',
  },
  {
    label: 'Avg. Session',
    value: '4m 32s',
    change: -1.3,
    icon: '⏱️',
  },
]

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        {metrics.map((metric) => (
          <motion.div key={metric.label} variants={itemVariants}>
            <MetricCard {...metric} />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6 lg:grid-cols-3"
      >
        {/* Revenue Chart */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="border-border/50 bg-card/50 p-6 backdrop-blur">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-foreground">
                Revenue
              </h2>
              <p className="text-sm text-muted-foreground">
                Last 12 months
              </p>
            </div>
            <Chart type="revenue" />
          </Card>
        </motion.div>

        {/* Activity Feed */}
        <motion.div variants={itemVariants}>
          <Card className="border-border/50 bg-card/50 p-6 backdrop-blur h-full">
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              Recent Activity
            </h2>
            <ActivityFeed />
          </Card>
        </motion.div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6 lg:grid-cols-2"
      >
        {/* Conversion Chart */}
        <motion.div variants={itemVariants}>
          <Card className="border-border/50 bg-card/50 p-6 backdrop-blur">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-foreground">
                Conversion Funnel
              </h2>
              <p className="text-sm text-muted-foreground">
                This month
              </p>
            </div>
            <Chart type="conversion" />
          </Card>
        </motion.div>

        {/* User Distribution */}
        <motion.div variants={itemVariants}>
          <Card className="border-border/50 bg-card/50 p-6 backdrop-blur">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-foreground">
                User Distribution
              </h2>
              <p className="text-sm text-muted-foreground">
                By region
              </p>
            </div>
            <Chart type="distribution" />
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
