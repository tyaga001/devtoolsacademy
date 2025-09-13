"use client"

import React from "react"
import Image from "next/image"
import { Quote, Star } from "lucide-react"

import Alberto from "@/assets/testimonials/alberto.png"
import Andy from "@/assets/testimonials/andy.png"
import Ophir from "@/assets/testimonials/ophir.png"

import { cn } from "@/lib/utils"

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
    avatar: Alberto.src,
  },
  {
    quote: "Kudos for being a developer who writes :)",
    name: "Ophir Prusak",
    position: "Senior Product Manager",
    avatar: Ophir.src,
  },
  {
    quote: "You really have a great eye for the developer space.",
    name: "Andy Hattemer",
    position: "Head of Marketing, Neon",
    avatar: Andy.src,
  },
]

function TestimonialCard({
  index,
  testimonial,
}: {
  index: number
  testimonial: ITestimonial
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col p-12",
        "border-b md:border-b-0 border-dashed border-neutral-100/15",
        index > 0 ? "md:border-l border-dashed border-neutral-100/15" : ""
      )}
    >
      <Quote
        size={48}
        className="absolute right-4 top-4 text-neutral-200 opacity-10"
      />

      <p className="relative z-10 mb-12 text-base text-neutral-200 md:text-lg lg:text-xl">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="mt-auto flex items-center">
        <div className="relative mr-4">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            width={60}
            height={60}
            className="rounded-full border-2 border-neutral-400"
          />
        </div>
        <div>
          <p className="font-semibold text-neutral-200">{testimonial.name}</p>
          <p className="text-sm text-neutral-500">{testimonial.position}</p>
        </div>
      </div>
    </div>
  )
}

function Testimonial() {
  return (
    <section>
      <div className="mx-auto max-w-7xl py-16 text-center">
        <h2 className="mb-4 text-2xl font-bold tracking-tight md:text-5xl">
          <span className="bg-gradient-to-b from-neutral-700 to-neutral-200 bg-clip-text text-transparent">
            Developers Insights
          </span>
        </h2>
        <p className="mb-6 text-base text-neutral-500 md:text-lg">
          Developers across the globe love DTA
        </p>
        <div
          className="flex justify-center space-x-2"
          aria-label="5 out of 5 stars"
          role="img"
        >
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="size-6 fill-current text-yellow-400"
              aria-hidden="true"
            />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl">
        <hr className="border-dashed border-neutral-100/15" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              index={index}
              testimonial={testimonial}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonial
