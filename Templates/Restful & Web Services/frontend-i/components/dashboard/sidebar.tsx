'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, Folder, TrendingUp, Users, Settings, ChevronLeft, ChevronRight } from 'lucide-react'

const navItems = [
  {
    label: 'Overview',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Projects',
    href: '/dashboard/projects',
    icon: Folder,
  },
  {
    label: 'Analytics',
    href: '/dashboard/analytics',
    icon: TrendingUp,
  },
  {
    label: 'Team',
    href: '/dashboard/team',
    icon: Users,
  },
  {
    label: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
]

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true)
  const pathname = usePathname()

  return (
    <motion.aside
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
      className={`border-r border-border/40 bg-card/40 backdrop-blur smooth-transition ${
        isExpanded ? 'w-64' : 'w-20'
      }`}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="border-b border-border/40 p-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">
                E
              </span>
            </div>
            {isExpanded && (
              <span className="text-lg font-bold text-foreground">Elite</span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium smooth-transition ${
                  isActive
                    ? 'bg-primary/20 text-primary'
                    : 'text-muted-foreground hover:bg-card/50 hover:text-foreground'
                }`}
              >
                <Icon className="h-5 w-5" />
                {isExpanded && item.label}
              </Link>
            )
          })}
        </nav>

        {/* Collapse button & User */}
        <div className="border-t border-border/40 p-4 space-y-3">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
          {isExpanded && (
            <div className="rounded-lg bg-card/50 p-3">
              <p className="text-xs font-medium text-foreground">
                John Doe
              </p>
              <p className="text-xs text-muted-foreground">
                john@example.com
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  )
}
