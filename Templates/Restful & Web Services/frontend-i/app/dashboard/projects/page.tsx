'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { containerVariants, itemVariants } from '@/lib/animations'

const projects = [
  {
    id: 1,
    name: 'Marketing Website',
    description: 'Main company marketing site',
    status: 'Active',
    members: 3,
    lastUpdated: '2 hours ago',
  },
  {
    id: 2,
    name: 'Mobile App',
    description: 'iOS and Android application',
    status: 'In Progress',
    members: 5,
    lastUpdated: '4 hours ago',
  },
  {
    id: 3,
    name: 'Analytics Dashboard',
    description: 'Internal analytics platform',
    status: 'Planning',
    members: 2,
    lastUpdated: '1 day ago',
  },
]

export default function ProjectsPage() {
  return (
    <div className="p-6 space-y-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex items-center justify-between"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground mt-1">
            Manage and view all your projects
          </p>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Button>Create Project</Button>
        </motion.div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <motion.div key={project.id} variants={itemVariants}>
            <Card className="border-border/50 bg-card/50 p-6 backdrop-blur cursor-pointer smooth-transition hover:border-primary/50">
              <h3 className="text-lg font-semibold text-foreground">
                {project.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {project.description}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    project.status === 'Active'
                      ? 'bg-green-500/20 text-green-700 dark:text-green-400'
                      : project.status === 'In Progress'
                        ? 'bg-blue-500/20 text-blue-700 dark:text-blue-400'
                        : 'bg-gray-500/20 text-gray-700 dark:text-gray-400'
                  }`}
                >
                  {project.status}
                </span>
                <span className="text-xs text-muted-foreground">
                  {project.members} members
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Updated {project.lastUpdated}
              </p>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
