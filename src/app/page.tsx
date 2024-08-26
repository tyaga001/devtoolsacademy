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
        url: 'https://www.devtoolsacademy.com/blog/neon-vs-supabase',
        initialViews: 5044
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