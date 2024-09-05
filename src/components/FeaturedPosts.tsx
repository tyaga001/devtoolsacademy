'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Clock, Eye, Bookmark, Share2 } from 'lucide-react';

interface BlogCardProps {
    title: string;
    excerpt: string;
    image: string;
    url: string;
    slug: string;
    readTime?: string;
    category: string;
    isNew?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({
                                               title, excerpt, image, url, slug, readTime, category, isNew
                                           }) => {
    const defaultReadTime = "8 min read";

    return (
        <motion.div
            className="bg-white rounded-xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <div className="relative h-48">
                <Image
                    src={image}
                    alt={title}
                    layout="fill"
                    objectFit="cover"
                />
                {isNew && (
                    <span className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
                        NEW
                    </span>
                )}
            </div>
            <div className="p-6">
                <span className="text-sm font-medium text-purple-600 mb-2 block">{category}</span>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
                <p className="text-gray-600 mb-4">{excerpt}</p>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span className="flex items-center"><Clock size={16} className="mr-1" /> {readTime || defaultReadTime}</span>
                </div>
                <div className="flex justify-between items-center">
                    <Link href={url} className="text-purple-600 hover:text-purple-800 font-semibold">
                        Read More →
                    </Link>
                    <div className="flex items-center">
                        <button
                            className="mr-2 p-1 rounded-full text-gray-400 hover:bg-gray-100"
                            aria-label="Save post"
                        >
                            <Bookmark size={20} />
                        </button>
                        <button
                            className="p-1 rounded-full text-gray-400 hover:bg-gray-100"
                            aria-label="Share post"
                        >
                            <Share2 size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

interface FeaturedPostsProps {
    posts: BlogCardProps[];
}

const FeaturedPosts: React.FC<FeaturedPostsProps> = ({ posts }) => {
    return (
        <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">
                    Featured Posts
                </h2>
                <div className={`grid gap-8 ${posts.length === 2 ? 'md:grid-cols-2 max-w-4xl mx-auto' : 'md:grid-cols-3'}`}>
                    {posts.slice(0, 3).map((post) => (
                        <BlogCard key={post.slug} {...post} />
                    ))}
                </div>
                <div className="mt-12 text-center">
                    <Link href="/blog" className="inline-block bg-purple-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-purple-700 transition duration-300">
                        View All Posts
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedPosts;