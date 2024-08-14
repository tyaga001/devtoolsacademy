'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface BlogCardProps {
    title: string;
    excerpt: string;
    image: string;
    url: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ title, excerpt, image, url }) => (
    <motion.div
        className="bg-white rounded-lg shadow-lg overflow-hidden"
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
    >
        <Image src={image} alt={title} width={400} height={200} className="w-full h-48 object-cover" />
        <div className="p-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
            <p className="text-gray-600 mb-4">{excerpt}</p>
            <Link href={url} className="text-purple-600 hover:text-purple-800 font-semibold">
                Read More →
            </Link>
        </div>
    </motion.div>
);

interface FeaturedPostsProps {
    posts: {
        slug: string;
        title: string;
        excerpt: string;
        image: string;
        url: string;
    }[];
}

const FeaturedPosts: React.FC<FeaturedPostsProps> = ({ posts }) => {
    return (
        <section className="py-16 bg-gradient-to-b from-white to-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">
                    Featured Posts
                </h2>
                <div className={`grid gap-8 ${
                    posts.length === 1 ? 'md:grid-cols-1 max-w-md mx-auto' :
                        posts.length === 2 ? 'md:grid-cols-2 max-w-2xl mx-auto' :
                            'md:grid-cols-3'
                }`}>
                    {posts.map((post) => (
                        <BlogCard key={post.slug} {...post} />
                    ))}
                </div>
                {posts.length < 3 && (
                    <div className="mt-12 text-center">
                        <Link href="/blog" className="inline-block bg-purple-600 text-white font-semibold py-2 px-6 rounded-full hover:bg-purple-700 transition duration-300">
                            View All Posts
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default FeaturedPosts;
