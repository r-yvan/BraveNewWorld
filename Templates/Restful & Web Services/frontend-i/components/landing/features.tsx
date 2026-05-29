'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { containerVariants, itemVariants } from '@/lib/animations'
import { Zap, Lock, TrendingUp, Puzzle, Headset, BarChart3 } from 'lucide-react'

const features = [
  {
    title: 'Lightning Fast',
    description: 'Experience sub-millisecond latency and blazing-fast load times.',
    icon: Zap,
  },
  {
    title: 'Secure by Default',
    description: 'Enterprise-grade security with end-to-end encryption.',
    icon: Lock,
  },
  {
    title: 'Infinite Scale',
    description: 'Handle millions of requests without breaking a sweat.',
    icon: TrendingUp,
  },
  {
    title: 'Easy Integration',
    description: 'Connect with your favorite tools in minutes.',
    icon: Puzzle,
  },
  {
    title: '24/7 Support',
    description: 'Round-the-clock expert support for your peace of mind.',
    icon: Headset,
  },
  {
    title: 'Analytics Dashboard',
    description: 'Deep insights into your application performance.',
    icon: BarChart3,
  },
]

export function Features() {
  return (
    <section id="features" className="relative py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl"
          >
            Powerful Features
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-pretty mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
          >
            Everything you need to build world-class applications
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="group h-full border-border/50 bg-card/50 p-6 backdrop-blur smooth-transition hover:border-primary/50 hover:bg-card/80">
                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
