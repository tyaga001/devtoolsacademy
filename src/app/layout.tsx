import React from 'react';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Analytics } from '@vercel/analytics/react';
import { ClerkProvider } from '@clerk/nextjs';
import Navbar from '@/components/Navbar';
import { SocialMetadata } from '@/components/SocialMetadata';
import { Providers } from './providers';
import './globals.css';
import 'highlight.js/styles/github-dark.css';
import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
    title: {
        default: 'Dev Tools Academy',
        template: '%s | Dev Tools Academy',
    },
    description: 'Discover and compare the best developer tools for your next project',
    metadataBase: new URL('https://devtoolsacademy.com'),
    openGraph: {
        title: 'Dev Tools Academy',
        description: 'Discover and compare the best developer tools for your next project',
        url: 'https://devtoolsacademy.com',
        siteName: 'Dev Tools Academy',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Dev Tools Academy',
        description: 'Discover and compare the best developer tools for your next project',
    },
    icons: {
        icon: '/favicon.png',
        shortcut: '/favicon.png',
    },
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
        <html lang="en" suppressHydrationWarning className="dark">
        <head>
            <SocialMetadata
                title={title}
                description={metadata.description ?? ''}
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
        <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased bg-black text-white`}>
        <Providers>
            <ClerkProvider>
                <div className="flex flex-col min-h-screen">
                    <Navbar />
                    <main className="flex-grow">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                            {children}
                        </div>
                    </main>
                </div>
            </ClerkProvider>
        </Providers>
        <Analytics />
        </body>
        </html>
    );
}