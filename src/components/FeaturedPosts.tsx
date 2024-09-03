'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Clock, Eye, ArrowRight } from 'lucide-react';

interface BlogCardProps {
    title: string;
    excerpt: string;
    image: string;
    url: string;
    slug: string;
    content?: string;
    initialViews: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ title, excerpt, image, url, slug, content, initialViews }) => {
    const readTime = content ? `${Math.ceil(content.split(/\s+/).length / 200)} min read` : "5 min read";

    return (
        <motion.div
            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:shadow-2xl"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <div className="relative h-64">
                <Image
                    src={image}
                    alt={title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold mb-2 text-white">{title}</h3>
                    <div className="flex justify-between items-center text-sm text-gray-300">
                        <span className="flex items-center"><Clock size={16} className="mr-1" /> {readTime}</span>
                        <span className="flex items-center"><Eye size={16} className="mr-1" /> {initialViews.toLocaleString()} views</span>
                    </div>
                </div>
            </div>
            <div className="p-6">
                <p className="text-gray-600 mb-4">{excerpt}</p>
                <Link href={url} className="inline-flex items-center text-purple-600 hover:text-purple-800 font-semibold transition duration-300 group">
                    Read More
                    <ArrowRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </motion.div>
    );
};

interface FeaturedPostsProps {
    posts: BlogCardProps[];
}

const FeaturedPosts: React.FC<FeaturedPostsProps> = ({ posts }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
            <div className="container mx-auto px-4">
                <motion.h2
                    className="text-4xl font-bold mb-12 text-center text-gray-900"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Featured Posts
                </motion.h2>
                <motion.div
                    className={`grid gap-8 ${
                        posts.length === 1 ? 'md:grid-cols-1 max-w-2xl mx-auto' :
                            posts.length === 2 ? 'md:grid-cols-2 max-w-4xl mx-auto' :
                                'md:grid-cols-3'
                    }`}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {posts.map((post) => (
                        <motion.div key={post.slug} variants={containerVariants}>
                            <BlogCard {...post} />
                        </motion.div>
                    ))}
                </motion.div>
                {posts.length < 3 && (
                    <motion.div
                        className="mt-12 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <Link href="/blog" className="inline-block bg-purple-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-purple-700 transition duration-300 transform hover:scale-105 hover:shadow-lg">
                            View All Posts
                        </Link>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default FeaturedPosts;