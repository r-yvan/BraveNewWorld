'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { containerVariants, itemVariants } from '@/lib/animations'

const footerLinks = {
  Product: ['Features', 'Pricing', 'Security', 'Status'],
  Company: ['About', 'Blog', 'Careers', 'Press'],
  Resources: ['Documentation', 'API Reference', 'Community', 'Support'],
  Legal: ['Privacy', 'Terms', 'Cookie Policy', 'Compliance'],
}

export function Footer() {
  return (
    <motion.footer
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="border-t border-border/40 bg-card/30 backdrop-blur"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5 lg:gap-12">
          {/* Brand */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">E</span>
              </div>
              <span className="text-lg font-bold text-foreground">Elite</span>
            </div>
            <p className="text-sm text-muted-foreground">
              The future of enterprise software development.
            </p>
          </motion.div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              variants={itemVariants}
              transition={{ delay: (categoryIndex + 1) * 0.1 }}
            >
              <h4 className="font-semibold text-foreground mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground smooth-transition hover:text-foreground"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom */}
        <motion.div
          variants={itemVariants}
          className="mt-12 border-t border-border/40 pt-8"
        >
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Elite. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-muted-foreground smooth-transition hover:text-foreground"
              >
                <span className="sr-only">Twitter</span>
                𝕏
              </a>
              <a
                href="#"
                className="text-muted-foreground smooth-transition hover:text-foreground"
              >
                <span className="sr-only">GitHub</span>
                GitHub
              </a>
              <a
                href="#"
                className="text-muted-foreground smooth-transition hover:text-foreground"
              >
                <span className="sr-only">LinkedIn</span>
                LinkedIn
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  )
}
