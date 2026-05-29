'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { containerVariants, itemVariants } from '@/lib/animations'
import { Chart } from '@/components/dashboard/chart'

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Detailed insights into your application
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6"
      >
        <motion.div variants={itemVariants}>
          <Card className="border-border/50 bg-card/50 p-6 backdrop-blur">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-foreground">
                Revenue Trends
              </h2>
              <p className="text-sm text-muted-foreground">
                12-month comparison
              </p>
            </div>
            <Chart type="revenue" />
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="border-border/50 bg-card/50 p-6 backdrop-blur">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-foreground">
                Conversion Analysis
              </h2>
              <p className="text-sm text-muted-foreground">
                User funnel metrics
              </p>
            </div>
            <Chart type="conversion" />
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
