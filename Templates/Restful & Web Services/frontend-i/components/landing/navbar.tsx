'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import Link from 'next/link'
import { LogIn, Zap } from 'lucide-react'

export function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">E</span>
          </div>
          <span className="text-lg font-bold text-foreground">Elite</span>
        </Link>

        <div className="hidden gap-8 md:flex">
          <a
            href="#features"
            className="text-sm text-muted-foreground smooth-transition hover:text-foreground"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-sm text-muted-foreground smooth-transition hover:text-foreground"
          >
            Pricing
          </a>
          <a
            href="#testimonials"
            className="text-sm text-muted-foreground smooth-transition hover:text-foreground"
          >
            Testimonials
          </a>
          <a
            href="#faq"
            className="text-sm text-muted-foreground smooth-transition hover:text-foreground"
          >
            FAQ
          </a>
        </div>

        <div className="flex gap-3">
          <ThemeToggle />
          <Button variant="outline" size="sm" className="gap-2">
            <LogIn className="h-4 w-4" />
            Sign In
          </Button>
          <Button size="sm" className="gap-2">
            <Zap className="h-4 w-4" />
            Get Started
          </Button>
        </div>
      </nav>
    </motion.header>
  )
}
