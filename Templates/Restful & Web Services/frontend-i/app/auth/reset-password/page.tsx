'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { pageVariants, containerVariants, itemVariants } from '@/lib/animations'

function ResetPasswordContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log('Password reset with token:', token)
      setSuccess(true)
      // In a real app, call authService.resetPassword({ token, password })
    } catch (err) {
      setError('Failed to reset password. Token may be expired.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!token) {
    return (
      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Card className="border-border/50 bg-card/50 p-8 backdrop-blur text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary mb-4">
            <span className="text-lg font-bold text-primary-foreground">E</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mt-4">
            Invalid Link
          </h1>
          <p className="mt-2 text-muted-foreground mb-6">
            This password reset link is invalid or has expired.
          </p>
          <Link href="/auth/login">
            <Button className="w-full">Back to Sign In</Button>
          </Link>
        </Card>
      </motion.div>
    )
  }

  if (success) {
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
            className="space-y-6 text-center"
          >
            <motion.div variants={itemVariants}>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/20 mb-4">
                <span className="text-2xl">✓</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground">
                Password Reset Successful
              </h1>
              <p className="mt-2 text-muted-foreground">
                Your password has been successfully reset. You can now sign in
                with your new password.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link href="/auth/login">
                <Button className="w-full">Sign In</Button>
              </Link>
            </motion.div>
          </motion.div>
        </Card>
      </motion.div>
    )
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
              Create New Password
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter your new password below
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {error && (
              <motion.div
                variants={itemVariants}
                className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive"
              >
                {error}
              </motion.div>
            )}

            <div>
              <label className="text-sm font-medium text-foreground">
                New Password
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2"
                disabled={isLoading}
                required
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Must be at least 8 characters
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">
                Confirm Password
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-2"
                disabled={isLoading}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </Button>
          </motion.form>

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

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  )
}
