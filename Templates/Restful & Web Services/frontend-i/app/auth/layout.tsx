import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Authentication | Elite',
  description: 'Secure authentication for Elite',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-card/30 px-4">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  )
}
