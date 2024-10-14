import React from 'react';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Analytics } from '@vercel/analytics/react';
import { ClerkProvider } from '@clerk/nextjs';
import Navbar from '@/components/Navbar';
import { SocialMetadata } from '@/components/SocialMetadata';
import './globals.css';
import 'highlight.js/styles/github-dark.css';
import { Metadata } from 'next';
import Script from 'next/script'

export const metadata: Metadata = {
    title: {
        default: 'Dev Tools Academy',
        template: '%s | Dev Tools Academy',
    },
    description: 'Learn about awesome developer tools',
    metadataBase: new URL('https://devtoolsacademy.com'),
    openGraph: {
        title: 'Dev Tools Academy',
        description: 'Learn about awesome developer tools',
        url: 'https://devtoolsacademy.com',
        siteName: 'Dev Tools Academy',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Dev Tools Academy',
        description: 'Learn about awesome developer tools',
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

function getTitle(title: Metadata['title']): string {
    if (typeof title === 'string') {
        return title;
    } else if (title && typeof title === 'object' && 'default' in title) {
        return title.default;
    }
    return 'Dev Tools Academy';
}

export default function RootLayout({ children }: RootLayoutProps) {
    const title = getTitle(metadata.title);

    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            <SocialMetadata
                title={title}
                description={metadata.description ?? 'Learn about awesome developer tools'}
                url={metadata.metadataBase?.toString() ?? 'https://devtoolsacademy.com'}
                image={`${metadata.metadataBase?.toString() ?? 'https://devtoolsacademy.com'}/favicon.png`}
                type="website"
            />
            <Script
                src="https://cloud.umami.is/script.js"
                data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
                strategy="afterInteractive"
            />
        </head>
        <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}>
        <ClerkProvider>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {children}
                </main>
            </div>
        </ClerkProvider>
        <Analytics />
        </body>
        </html>
    );
}