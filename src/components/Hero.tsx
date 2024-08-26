'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion, useAnimation } from 'framer-motion';

const Hero: React.FC = () => {
    const controls = useAnimation();

    useEffect(() => {
        controls.start({
            opacity: [0.5, 1, 0.5],
            transition: { repeat: Infinity, duration: 5, ease: "easeInOut" }
        });
    }, [controls]);

    return (
        <section className="relative min-h-screen bg-black overflow-hidden py-20 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-black-900/20 via-black to-pink-900/20" />
            <motion.div
                className="absolute inset-0 opacity-50"
                animate={controls}
            >
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute bg-white rounded-full"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 4 + 1}px`,
                            height: `${Math.random() * 4 + 1}px`,
                        }}
                    />
                ))}
            </motion.div>
            <div className="relative z-10 flex flex-col items-center justify-center text-white text-center px-4 max-w-5xl mx-auto">
                <motion.a
                    href="https://news.ycombinator.com/item?id=41223327#41246861"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#ff6600] text-white px-4 py-2 rounded-full text-sm font-bold mb-6 hover:bg-[#ff8533] transition-colors duration-300 flex items-center space-x-2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-1" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M0 24V0h24v24H0zM6.951 5.896l4.112 7.708v5.064h1.583v-4.972l4.148-7.799h-1.749l-2.457 4.875c-.372.745-.688 1.434-.688 1.434s-.297-.708-.651-1.434L8.831 5.896h-1.88z" />
                    </svg>
                    <span>Featured on Hacker News</span>
                </motion.a>
                <motion.h1
                    className="text-6xl md:text-8xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 leading-tight"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{ textShadow: '0 0 20px rgba(168, 85, 247, 0.5)' }}
                >
                    A special blog made for Developers.
                </motion.h1>
                <motion.p
                    className="text-2xl md:text-3xl text-gray-300 mb-12 max-w-3xl"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                >
                    Honest reviews to help you choose the right developer tool for your SaaS.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <Link href="/blog" passHref>
                        <Button
                            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-10 rounded-full text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                        >
                            Start Reading
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;