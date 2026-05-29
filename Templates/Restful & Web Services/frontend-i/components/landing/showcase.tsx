'use client'

import { motion } from 'framer-motion'
import { containerVariants, itemVariants } from '@/lib/animations'

export function Showcase() {
  return (
    <section className="relative py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl"
          >
            See It In Action
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-pretty mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
          >
            Watch how Elite transforms development workflows
          </motion.p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-xl border border-border/50 bg-card/50 p-1 backdrop-blur"
        >
          <div className="relative aspect-video overflow-hidden rounded-lg bg-gradient-to-br from-primary/10 via-background to-primary/5 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">▶️</div>
              <p className="text-lg text-muted-foreground">Product Demo Coming Soon</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
