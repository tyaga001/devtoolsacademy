import React from 'react';
import FeaturedPosts from '@/components/FeaturedPosts';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { Testimonial } from '@/components/Testimonial';

const featuredPosts = [
    {
        title: 'Neon vs Supabase: A Comprehensive Comparison',
        excerpt: 'Explore the key differences between Neon and Supabase, two popular database solutions for modern web applications.',
        image: '/images/default-og-image.png',
        slug: 'neon-vs-supabase',
        url: '/blog/neon-vs-supabase',
        category: "Database"
    },
    {
        title: 'Serverless Databases in 2024',
        excerpt: 'The Good, the Bad, and the Must-Know for Developers.',
        image: '/images/state-of-databases.png',
        slug: 'state-of-databases-2024',
        url: '/blog/state-of-databases-2024',
        category: "Serverless",
    },
    {
        title: 'MongoDB vs. PostgreSQL- A Technical Comparison',
        excerpt: 'What’s the Difference Between MongoDB and PostgreSQL?',
        image: '/images/MongoDB vs. PostgreSQL.png',
        slug: 'mongoDB-vs-postgreSQL',
        url: '/blog/mongoDB-vs-postgreSQL',
        category: "Database",
        isNew: true
    }
];

export default function Home() {
    return (
        <div className="min-h-screen bg-black text-white">
            <main>
                <Hero/>
                {featuredPosts.length > 0 && <FeaturedPosts posts={featuredPosts}/>}
            </main>
            <div className="section-divider"></div>
            <Testimonial/>
            <div className="section-divider"></div>
            <Footer/>
        </div>
    );
}