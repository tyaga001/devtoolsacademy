'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AnimatedContent() {
    return (
        <>
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
            >
                Contribute to Dev Tools Academy
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-xl text-center mb-12 text-gray-600 dark:text-gray-300"
            >
                We welcome contributions from the community. Here&apos;s how you can get involved:
            </motion.p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
                {[
                    { title: "Write a blog post", description: "Compare developer tools and share your real time experience" },
                    { title: "Suggest topics", description: "Propose ideas for future comparisons and articles" },
                    { title: "Improve the website", description: "Enhance our design and functionality" },
                    { title: "Report issues", description: "Help us identify and fix bugs or suggest enhancements" }
                ].map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index, duration: 0.5 }}
                        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                    </motion.div>
                ))}
            </div>
        </>
    );
}
