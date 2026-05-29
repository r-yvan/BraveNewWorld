'use client'

import { motion } from 'framer-motion'
import { containerVariants, itemVariants } from '@/lib/animations'

const activities = [
  {
    id: 1,
    type: 'user_signup',
    message: 'New user signed up',
    timestamp: '2 hours ago',
    icon: '👤',
  },
  {
    id: 2,
    type: 'conversion',
    message: 'Customer upgraded plan',
    timestamp: '4 hours ago',
    icon: '📈',
  },
  {
    id: 3,
    type: 'feature_launch',
    message: 'New feature launched',
    timestamp: '1 day ago',
    icon: '🚀',
  },
  {
    id: 4,
    type: 'system_update',
    message: 'System maintenance completed',
    timestamp: '2 days ago',
    icon: '⚙️',
  },
]

export function ActivityFeed() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      {activities.map((activity) => (
        <motion.div
          key={activity.id}
          variants={itemVariants}
          className="flex gap-3 pb-3 border-b border-border/50 last:border-0 last:pb-0"
        >
          <div className="text-lg flex-shrink-0">{activity.icon}</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-foreground line-clamp-1">
              {activity.message}
            </p>
            <p className="text-xs text-muted-foreground">
              {activity.timestamp}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
