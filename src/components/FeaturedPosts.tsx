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
        className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
        whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300 }}
    >
        <Image src={image} alt={title} width={400} height={200} className="w-full h-48 object-cover" />
        <div className="p-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
            <p className="text-gray-600 mb-4">{excerpt}</p>
            <Link href={url} className="inline-block text-purple-600 hover:text-purple-800 font-semibold transition duration-300 transform hover:translate-x-2">
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
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    return (
        <section className="py-16 bg-gradient-to-b from-white to-gray-100 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            <div className="container mx-auto px-4 relative z-10">
                <motion.h2
                    className="text-5xl font-bold mb-12 text-center text-gray-800"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Featured Posts
                </motion.h2>
                <motion.div
                    className={`grid gap-8 ${
                        posts.length === 1 ? 'md:grid-cols-1 max-w-md mx-auto' :
                            posts.length === 2 ? 'md:grid-cols-2 max-w-2xl mx-auto' :
                                'md:grid-cols-3'
                    }`}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {posts.map((post) => (
                        <motion.div key={post.slug} variants={itemVariants}>
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