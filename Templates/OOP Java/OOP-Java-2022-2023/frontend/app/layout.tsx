import './globals.css'

export const metadata = {
  title: 'Binary Supermarket',
  description: 'Online Shopping System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
