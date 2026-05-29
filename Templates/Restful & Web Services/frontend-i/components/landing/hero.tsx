'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { containerVariants, itemVariants } from '@/lib/animations'
import { Play, Rocket } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-32 md:pt-48 md:pb-40">
      {/* Background gradient effect */}
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-6 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/50 px-4 py-2 text-sm text-muted-foreground backdrop-blur">
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500">
              <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-green-500 opacity-75" />
            </span>
            Now Available for Early Access
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          variants={itemVariants}
          className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
        >
          The Future of
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-foreground to-primary">
            Enterprise Software
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="text-pretty mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
        >
          Build, deploy, and scale your applications with our comprehensive platform. Designed for teams that demand excellence.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col gap-4 justify-center sm:flex-row"
        >
          <Button size="lg" className="sm:w-auto gap-2">
            <Rocket className="h-5 w-5" />
            Start Free Trial
          </Button>
          <Button size="lg" variant="outline" className="gap-2">
            <Play className="h-5 w-5" />
            Watch Demo
          </Button>
        </motion.div>

        {/* Social proof */}
        <motion.div
          variants={itemVariants}
          className="mt-16 flex flex-col items-center gap-4"
        >
          <p className="text-sm text-muted-foreground">Trusted by industry leaders</p>
          <div className="flex flex-wrap justify-center gap-8">
            {['Google', 'Microsoft', 'Slack', 'Figma'].map((company) => (
              <div key={company} className="text-sm font-medium text-muted-foreground">
                {company}
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
