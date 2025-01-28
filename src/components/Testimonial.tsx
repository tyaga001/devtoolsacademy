"use client"

import React from "react"
import Image from "next/image"
import { motion } from "motion/react"
import { Quote, Star } from "lucide-react"

interface ITestimonial {
  quote: string
  name: string
  position: string
  avatar: string
}

const testimonials: ITestimonial[] = [
  {
    quote:
      "The article is great, and provides an amazing in-depth explanation 👏\nThe summary on the bottom right is great too!\nDark mode is my favourite colour scheme\nI love the background you use for each image.",
    name: "Alberto Cubeddu",
    position: "Co-founder of SkillSociety",
    avatar: "/images/img_6.png",
  },
  {
    quote: "Kudos for being a developer who writes :)",
    name: "Ophir Prusak",
    position: "Senior Product Manager",
    avatar: "/images/img_5.png",
  },
  {
    quote: "You really have a great eye for the developer space.",
    name: "Andy Hattemer",
    position: "Head of Marketing, Neon",
    avatar: "/images/img_7.png",
  },
]

function TestimonialCard({ testimonial }: { testimonial: ITestimonial }) {
  return (
    <motion.div
      className="relative flex flex-col overflow-hidden rounded-xl bg-gradient-to-br from-purple-900 to-black p-8 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Quote
        size={48}
        className="absolute right-4 top-4 text-purple-300 opacity-20"
      />

      <p className="relative z-10 mb-6 text-xl text-white">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="mt-auto flex items-center">
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
          <p className="font-semibold text-white">{testimonial.name}</p>
          <p className="text-sm text-purple-300">{testimonial.position}</p>
        </div>
      </div>
    </motion.div>
  )
}

function Testimonial() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <h2 className="mb-4 text-5xl font-bold">
          <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Developers Insights
          </span>
        </h2>
        <p className="mb-6 text-xl text-purple-300">
          Developers across the globe love DTA
        </p>
        <div
          className="mb-8 flex justify-center space-x-2"
          aria-label="5 out of 5 stars"
        >
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="size-8 fill-current text-yellow-400"
              aria-hidden="true"
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial} />
        ))}
      </div>
    </section>
  )
}

export default Testimonial
