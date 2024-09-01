'use client';

import Image from 'next/image'
import { motion } from 'framer-motion'
import { MessageSquare, Quote } from 'lucide-react'

interface Testimonial {
    quote: string
    name: string
    position: string
    avatar: string
}

const testimonials: Testimonial[] = [
    {
        quote: "The article is great, and provide an amazing in-depth explanation :clap:\nThe summary on the bottom right is great too!\nDark mode is my favourite colour scheme\nI love the background you use for each-image!",
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
]

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
    return (
        <motion.div
            className="relative overflow-hidden bg-gradient-to-br from-purple-900 to-black rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
        >
            <motion.div
                className="absolute top-4 right-4 text-purple-300 opacity-20"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
                <Quote size={48} />
            </motion.div>

            <motion.p
                className="text-xl text-white mb-6 relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                &ldquo;{testimonial.quote}&rdquo;
            </motion.p>

            <motion.div
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
            >
                <div className="relative mr-4">
                    <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={60}
                        height={60}
                        className="rounded-full border-2 border-purple-400"
                    />
                    <motion.div
                        className="absolute inset-0 border-2 border-purple-300 rounded-full"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </div>
                <div>
                    <p className="text-white font-semibold">{testimonial.name}</p>
                    <p className="text-purple-300 text-sm">{testimonial.position}</p>
                </div>
            </motion.div>
        </motion.div>
    );
}

export function Testimonial() {
    return (
        <section className="py-16 bg-black bg-opacity-90 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/stars-background.png')] opacity-50"></div>
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl relative z-10">
                <motion.div
                    className="max-w-3xl mx-auto text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
                        Developers Love My Technical Content
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((testimonial) => (
                        <TestimonialCard key={testimonial.name} testimonial={testimonial} />
                    ))}
                </div>

                <motion.div
                    className="mt-12 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                </motion.div>
            </div>
        </section>
    )
}