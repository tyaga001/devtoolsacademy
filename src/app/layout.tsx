import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '../components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dev Tools Compare',
  description: 'Comparing developer tools and technologies',
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
      <body className={inter.className}>
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 py-8">
        {children}
      </main>
      </body>
      </html>
  )
}