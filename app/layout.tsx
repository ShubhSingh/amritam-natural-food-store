import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Amritam Natural - Fresh & Healthy Organic Products',
  description: 'Buy fresh organic food products online from Amritam Natural. Quality organic fruits, vegetables, grains, and more delivered to your doorstep.',
  keywords: 'amritam natural, organic food, fresh vegetables, organic fruits, healthy food, online grocery',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

// Made with Bob
