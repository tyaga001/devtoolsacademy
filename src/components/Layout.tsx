import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className={`${inter.className} bg-black text-white`}>
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-8">
            {children}
        </main>
        </body>
        </html>
    )
}