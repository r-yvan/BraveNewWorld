'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { containerVariants, itemVariants } from '@/lib/animations'

const team = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    avatar: 'JD',
    joinedDate: '3 months ago',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Developer',
    avatar: 'JS',
    joinedDate: '2 months ago',
  },
  {
    id: 3,
    name: 'Bob Wilson',
    email: 'bob@example.com',
    role: 'Designer',
    avatar: 'BW',
    joinedDate: '1 month ago',
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice@example.com',
    role: 'Product Manager',
    avatar: 'AB',
    joinedDate: '2 weeks ago',
  },
]

export default function TeamPage() {
  return (
    <div className="p-6 space-y-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex items-center justify-between"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold text-foreground">Team</h1>
          <p className="text-muted-foreground mt-1">
            Manage your team members and permissions
          </p>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Button>Invite Member</Button>
        </motion.div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {team.map((member) => (
          <motion.div key={member.id} variants={itemVariants}>
            <Card className="border-border/50 bg-card/50 p-4 backdrop-blur">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold">
                    {member.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {member.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {member.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">
                      {member.role}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Joined {member.joinedDate}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
