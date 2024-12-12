import React from 'react';
import dynamic from 'next/dynamic';
import FeaturedPosts from '@/components/FeaturedPosts';
import Hero from '@/components/Hero';
import { ProductHuntBadge } from '@/components/ProductHuntBadge'

const Testimonial = dynamic(() => import('@/components/Testimonial').then(mod => mod.Testimonial), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: true });

const featuredPosts = [
    {
        title: 'Neon vs. Supabase',
        excerpt: 'Choose the right Database for your SaaS.',
        image: '/images/default-og-image.png',
        slug: 'neon-vs-supabase',
        url: '/blog/neon-vs-supabase',
        category: "Database"
    },
    {
        title: 'Supabase vs. Clerk',
        excerpt: 'Choose the right Auth for your SaaS',
        image: '/images/supabase-clerk.png',
        slug: 'supabase-vs-clerk',
        url: '/blog/supabase-vs-clerk',
        category: "Database",
    },
    {
        title: 'Twilio vs Stream',
        excerpt: 'A Guide to Building Smarter Support Bots',
        image: '/images/Twilio vs Stream.png',
        slug: 'stream-vs-twilio',
        url: '/blog/stream-vs-twilio',
        category: "SaaS",
        isNew: true
    }
];

export default function Home() {
    return (
        <div className="min-h-screen bg-black text-white">
            <main>
                <Hero />
                {featuredPosts.length > 0 && <FeaturedPosts posts={featuredPosts} />}
            </main>
            <div className="section-divider" />
            <Testimonial />
            <div className="section-divider" />
            <Footer />
        </div>
    );
}