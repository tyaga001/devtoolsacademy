'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

interface Testimonial {
    quote: string;
    name: string;
    position: string;
    avatar: string;
}

const testimonials: Testimonial[] = [
    {
        quote: "The article is great, and provides an amazing in-depth explanation :clap:\nThe summary on the bottom right is great too!\nDark mode is my favourite colour scheme\nI love the background you use for each image.",
        name: "Alberto Cubeddu",
        position: "Co-founder of SkillSociety",
        avatar: "/images/img_6.png"
    },
    {
        quote: "Kudos for being a developer who writes :)",
        name: "Ophir Prusak",
        position: "Senior Product Manager",
        avatar: "/images/img_5.png"
    },
    {
        quote: "You really have a great eye for the developer space.",
        name: "Andy Hattemer",
        position: "Head of Marketing, Neon",
        avatar: "/images/img_7.png"
    }
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
    return (
        <motion.div
            className="relative overflow-hidden bg-gradient-to-br from-purple-900 to-black rounded-3xl p-8 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Quote size={48} className="absolute top-4 right-4 text-purple-300 opacity-20" />

            <p className="text-xl text-white mb-6 relative z-10">
                &ldquo;{testimonial.quote}&rdquo;
            </p>

            <div className="flex items-center">
                <div className="relative mr-4">
                    <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={60}
                        height={60}
                        className="rounded-full border-2 border-purple-400"
                    />
                </div>
                <div>
                    <p className="text-white font-semibold">{testimonial.name}</p>
                    <p className="text-purple-300 text-sm">{testimonial.position}</p>
                </div>
            </div>
        </motion.div>
    );
}

export function Testimonial() {
    return (
        <section className="py-16 bg-black bg-opacity-90 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/stars-background.png')] opacity-50" aria-hidden="true"></div>
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <h2 className="text-5xl font-bold mb-4">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                            Developers Insights
                        </span>
                    </h2>
                    <p className="text-xl text-purple-300 mb-6">
                        Developers across the globe love DTA
                    </p>
                    <div className="flex justify-center space-x-2 mb-8" aria-label="5 out of 5 stars">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="text-yellow-400 h-8 w-8 fill-current" aria-hidden="true" />
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard key={index} testimonial={testimonial} />
                    ))}
                </div>
            </div>
        </section>
    );
}