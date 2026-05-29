'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { containerVariants, itemVariants } from '@/lib/animations'
import { ThemeToggle } from '@/components/theme-toggle'
import { useTheme } from 'next-themes'
import { Sun, Moon, Palette } from 'lucide-react'

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account and preferences
          </p>
        </motion.div>
      </motion.div>

      {/* Account Settings */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Card className="border-border/50 bg-card/50 p-6 backdrop-blur">
            <h2 className="text-lg font-semibold text-foreground mb-6">
              Account Settings
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">
                  Full Name
                </label>
                <Input
                  defaultValue="John Doe"
                  className="mt-2"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">
                  Email Address
                </label>
                <Input
                  type="email"
                  defaultValue="john@example.com"
                  className="mt-2"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">
                  Company Name
                </label>
                <Input
                  defaultValue="Acme Inc."
                  className="mt-2"
                />
              </div>
              <Button className="mt-6">Save Changes</Button>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Notification Settings */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Card className="border-border/50 bg-card/50 p-6 backdrop-blur">
            <h2 className="text-lg font-semibold text-foreground mb-6">
              Notifications
            </h2>
            <div className="space-y-4">
              {[
                'Email notifications for new messages',
                'Weekly performance reports',
                'Team activity updates',
                'Marketing emails',
              ].map((option) => (
                <label key={option} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded border-border"
                  />
                  <span className="text-sm text-foreground">{option}</span>
                </label>
              ))}
              <Button className="mt-6">Save Preferences</Button>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Appearance Settings */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Card className="border-border/50 bg-card/50 p-6 backdrop-blur">
            <h2 className="text-lg font-semibold text-foreground mb-6">
              Appearance
            </h2>
            <div className="space-y-6">
              <div>
                <p className="font-medium text-foreground mb-4">Theme</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Choose your preferred color scheme
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setTheme('light')}
                    className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                      theme === 'light'
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    <Sun className="h-4 w-4" />
                    <span className="text-sm font-medium">Light</span>
                  </button>
                  <button
                    onClick={() => setTheme('dark')}
                    className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                      theme === 'dark'
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    <Moon className="h-4 w-4" />
                    <span className="text-sm font-medium">Dark</span>
                  </button>
                  <button
                    onClick={() => setTheme('system')}
                    className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                      theme === 'system'
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    <Palette className="h-4 w-4" />
                    <span className="text-sm font-medium">System</span>
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Quick Toggle</p>
                  <p className="text-sm text-muted-foreground">
                    Quickly switch between light and dark
                  </p>
                </div>
                <ThemeToggle />
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Card className="border-destructive/50 bg-destructive/10 p-6 backdrop-blur">
            <h2 className="text-lg font-semibold text-destructive mb-6">
              Danger Zone
            </h2>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                These actions cannot be undone. Please proceed with caution.
              </p>
              <div className="flex gap-3">
                <Button variant="outline">Reset Password</Button>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
