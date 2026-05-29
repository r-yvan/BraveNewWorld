'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { pageVariants, containerVariants, itemVariants } from '@/lib/animations'

function VerifyOTPContent() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [resendCountdown, setResendCountdown] = useState(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      if (code.length !== 6 || isNaN(Number(code))) {
        setError('Please enter a valid 6-digit code')
        return
      }
      console.log('OTP verification:', { email, code })
      // In a real app, call authService.verifyOTP(email, code)
    } catch (err) {
      setError('Invalid code. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log('Resending OTP to:', email)
      setResendCountdown(60)
      const timer = setInterval(() => {
        setResendCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      // In a real app, call authService.resendOTP(email)
    } catch (err) {
      setError('Failed to resend code.')
    }
  }

  if (!email) {
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
            Invalid Request
          </h1>
          <p className="mt-2 text-muted-foreground mb-6">
            Email address is required for OTP verification.
          </p>
          <Link href="/auth/login">
            <Button className="w-full">Back to Sign In</Button>
          </Link>
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
              Verify Your Email
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              We&apos;ve sent a code to{' '}
              <span className="font-medium text-foreground">{email}</span>
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
                Verification Code
              </label>
              <Input
                type="text"
                placeholder="000000"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                maxLength={6}
                className="mt-2 text-center tracking-widest text-lg"
                disabled={isLoading}
                required
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Enter the 6-digit code
              </p>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || code.length !== 6}
            >
              {isLoading ? 'Verifying...' : 'Verify Code'}
            </Button>
          </motion.form>

          {/* Resend */}
          <motion.div variants={itemVariants} className="text-center">
            <p className="text-sm text-muted-foreground mb-3">
              Didn&apos;t receive the code?
            </p>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleResend}
              disabled={resendCountdown > 0 || isLoading}
            >
              {resendCountdown > 0
                ? `Resend in ${resendCountdown}s`
                : 'Resend Code'}
            </Button>
          </motion.div>

          {/* Footer */}
          <motion.p
            variants={itemVariants}
            className="text-center text-sm text-muted-foreground"
          >
            Need help?{' '}
            <Link href="#" className="font-medium text-primary hover:text-primary/80">
              Contact support
            </Link>
          </motion.p>
        </motion.div>
      </Card>
    </motion.div>
  )
}

export default function VerifyOTPPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOTPContent />
    </Suspense>
  )
}
