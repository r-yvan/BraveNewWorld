'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { containerVariants, itemVariants } from '@/lib/animations'

export function CTA() {
  return (
    <section className="relative py-20 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Background effects */}
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative rounded-2xl border border-border/50 bg-card/50 p-12 text-center backdrop-blur sm:p-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            Ready to Transform Your Development?
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-pretty mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
          >
            Join hundreds of teams already using Elite to ship faster and build better. Start your free trial today—no credit card required.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col gap-4 justify-center sm:flex-row"
          >
            <Button size="lg">Start Free Trial</Button>
            <Button size="lg" variant="outline">
              Schedule Demo
            </Button>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mt-6 text-sm text-muted-foreground"
          >
            14-day free trial. No credit card required. Cancel anytime.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
