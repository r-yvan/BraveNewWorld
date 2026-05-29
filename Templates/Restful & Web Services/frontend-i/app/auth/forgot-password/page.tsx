'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { pageVariants, containerVariants, itemVariants } from '@/lib/animations'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log('Password reset requested for:', email)
      setSubmitted(true)
      // In a real app, call authService.forgotPassword({ email })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Card className="border-border/50 bg-card/50 p-8 backdrop-blur">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary mb-4">
              <span className="text-lg font-bold text-primary-foreground">E</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              Reset Password
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {submitted
                ? 'Check your email for password reset instructions'
                : 'Enter your email to receive a password reset link'}
            </p>
          </motion.div>

          {!submitted ? (
            <>
              {/* Form */}
              <motion.form
                variants={itemVariants}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div>
                  <label className="text-sm font-medium text-foreground">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2"
                    disabled={isLoading}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading || !email}
                >
                  {isLoading
                    ? 'Sending...'
                    : 'Send Password Reset Link'}
                </Button>
              </motion.form>
            </>
          ) : (
            <>
              {/* Success State */}
              <motion.div
                variants={itemVariants}
                className="rounded-lg bg-green-500/10 p-4 text-sm text-green-700 dark:text-green-400"
              >
                We&apos;ve sent a password reset link to{' '}
                <strong>{email}</strong>. Check your email and follow the
                instructions to reset your password.
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="text-sm text-muted-foreground"
              >
                <p className="mb-3">Didn&apos;t receive the email?</p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSubmitted(false)
                    setEmail('')
                  }}
                >
                  Try Again
                </Button>
              </motion.div>
            </>
          )}

          {/* Footer */}
          <motion.p
            variants={itemVariants}
            className="text-center text-sm text-muted-foreground"
          >
            Remember your password?{' '}
            <Link
              href="/auth/login"
              className="font-medium text-primary hover:text-primary/80"
            >
              Sign in
            </Link>
          </motion.p>
        </motion.div>
      </Card>
    </motion.div>
  )
}
