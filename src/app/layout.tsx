import {GeistSans} from 'geist/font/sans';
import {GeistMono} from 'geist/font/mono';
import {ThemeProvider} from '@/components/theme-provider';
import {Analytics} from '@vercel/analytics/react';
import {ClerkProvider} from '@clerk/nextjs';
import Navbar from '@/components/Navbar';
import './globals.css';
import 'highlight.js/styles/github-dark.css';
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            <script defer src="https://cloud.umami.is/script.js"
                    data-website-id="bbe84049-cfa8-41eb-bc81-3937ca3ee74c"></script>
        </head>
        <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}>
        <ClerkProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                <Navbar/>
                <main className="container">{children}</main>
            </ThemeProvider>
            <Analytics/>
        </ClerkProvider>
        </body>
        </html>
    );
}