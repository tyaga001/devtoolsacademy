import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { ThemeProvider } from '@/components/theme-provider';
import { Analytics } from '@vercel/analytics/react';
import { ClerkProvider } from '@clerk/nextjs';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';
import 'highlight.js/styles/github-dark.css';
import { Metadata } from 'next';

const ModeToggle = dynamic(() => import('@/components/mode-toggle').then(mod => mod.ModeToggle), {
    ssr: false,
});

export const metadata: Metadata = {
    title: {
        default: 'Dev Tools Academy',
        template: '%s | Dev Tools Academy',
    },
    description: 'Learn and master development tools for SaaS projects',
    metadataBase: new URL('https://devtoolsacademy.com'),
    openGraph: {
        title: 'Dev Tools Academy',
        description: 'Learn and master development tools for SaaS projects',
        url: 'https://devtoolsacademy.com',
        siteName: 'Dev Tools Academy',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Dev Tools Academy',
        description: 'Learn and master development tools for SaaS projects',
    },
    icons: [
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            url: '/favicon.png',
        },
    ],
};

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            <script defer src="https://cloud.umami.is/script.js"
                    data-website-id="bbe84049-cfa8-41eb-bc81-3937ca3ee74c"></script>
        </head>

        <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}>
        <ClerkProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                <div className="flex flex-col min-h-screen">
                    <Navbar/>
                    <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        {children}
                    </main>
                    <Footer/>
                </div>
                <ModeToggle />
            </ThemeProvider>
        </ClerkProvider>
        <Analytics/>
        </body>
        </html>
    );
}