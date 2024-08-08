import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { ThemeProvider } from '@/components/theme-provider';
import { Analytics } from '@vercel/analytics/react';
import { ClerkProvider } from '@clerk/nextjs';
import Navbar from '@/components/Navbar';
import './globals.css';
import 'highlight.js/styles/github-dark.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}>
        <ClerkProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                <Navbar />
                <main className="container">{children}</main>
            </ThemeProvider>
            <Analytics />
        </ClerkProvider>
        </body>
        </html>
    );
}
