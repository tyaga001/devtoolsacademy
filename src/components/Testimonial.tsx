"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Linkedin, Quote, Star } from "lucide-react"

import Andy from "@/assets/testimonials/andy.png"
import Lintao from "@/assets/testimonials/lintao.png"
import Nash from "@/assets/testimonials/nash.png"

import { cn } from "@/lib/utils"

interface ITestimonial {
  quote: string
  name: string
  position: string
  company?: string
  avatar?: string
  linkedinUrl?: string
  featured?: boolean
}

const testimonials: ITestimonial[] = [
  {
    quote: "You really have a great eye for the developer space.",
    name: "Andy Hattemer",
    position: "Head of Marketing",
    company: "Neon",
    avatar: Andy.src,
  },
  {
    quote:
      "Ankur from DevToolsAcademy was instrumental in shaping EloqData in our early days. He did not just advise, he worked alongside us to refine our technical writing and build a strong developer marketing foundation. He didn’t just bring marketing expertise, he brought an engineering mindset to growth.",
    name: "Lintao Zhang",
    position: "Founder",
    company: "EloqData",
    avatar: Lintao.src,
  },
  {
    quote:
      "Ankur brought structure and accountability to a channel we knew had potential but hadn't fully unlocked. He built our entire creator partnership program from the ground up, sourcing and managing 60+ creators across YouTube, X, LinkedIn, Open Source and newsletters and delivered consistent sign-up growth across every quarter of FY-2025. If you're a developer and AI tool company looking to build a real technical creator distribution pipeline not just run one-off campaigns, Ankur is the person to talk.",
    name: "Neevash Ramdial",
    position: "Director of Marketing",
    company: "Stream",
    avatar: Nash.src,
    featured: true,
  },
]

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}

function TestimonialCard({
  testimonial,
  featured = false,
}: {
  testimonial: ITestimonial
  featured?: boolean
}) {
  const isLong = testimonial.quote.length > 320
  const [expanded, setExpanded] = useState(false)
  const shouldClamp = isLong && !expanded

  return (
    <div
      className={cn(
        "group relative flex h-full flex-col rounded-2xl border border-dashed border-neutral-100/15 bg-neutral-950/60 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-100/30 hover:bg-neutral-900/70 md:p-10",
        featured &&
          "border-solid border-neutral-100/20 bg-gradient-to-br from-neutral-900/80 via-neutral-900/60 to-neutral-950/80 shadow-[0_0_60px_-20px_rgba(139,92,246,0.35)] ring-1 ring-violet-400/10"
      )}
    >
      <Quote
        size={featured ? 56 : 40}
        className={cn(
          "absolute text-neutral-400/30",
          featured ? "right-8 top-6" : "right-6 top-6"
        )}
        aria-hidden="true"
      />

      <p
        className={cn(
          "relative z-10 leading-relaxed text-neutral-200",
          featured ? "text-lg md:text-xl" : "text-base md:text-lg",
          shouldClamp && "line-clamp-6"
        )}
      >
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="relative z-10 mt-3 self-start text-sm font-medium text-violet-300 transition-colors hover:text-violet-200"
          aria-expanded={expanded}
        >
          {expanded ? "Show less" : "Read full story"}
        </button>
      )}

      <div className="mt-10 flex items-center gap-4">
        <div className="relative">
          {testimonial.avatar ? (
            <Image
              src={testimonial.avatar}
              alt={`Portrait of ${testimonial.name}, ${testimonial.position}`}
              width={featured ? 64 : 56}
              height={featured ? 64 : 56}
              className={cn(
                "rounded-full border border-neutral-600 object-cover",
                featured &&
                  "ring-2 ring-violet-400/20 ring-offset-2 ring-offset-neutral-950"
              )}
            />
          ) : (
            <div
              className={cn(
                "flex items-center justify-center rounded-full border border-neutral-600 bg-neutral-900 text-sm font-semibold text-neutral-200",
                featured ? "size-16" : "size-14"
              )}
            >
              {getInitials(testimonial.name)}
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1 text-left">
          <div className="flex items-center gap-2">
            <p className="truncate font-semibold text-neutral-50">
              {testimonial.name}
            </p>
            {testimonial.linkedinUrl && (
              <a
                href={testimonial.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${testimonial.name} on LinkedIn`}
                className="text-neutral-500 transition-colors hover:text-neutral-200"
              >
                <Linkedin size={16} aria-hidden="true" />
              </a>
            )}
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-neutral-400">
            <span>{testimonial.position}</span>
            {testimonial.company && (
              <>
                <span aria-hidden="true" className="text-neutral-600">
                  ·
                </span>
                <span className="inline-flex items-center rounded-full border border-neutral-100/15 bg-neutral-900/80 px-2.5 py-0.5 text-xs font-medium text-neutral-200">
                  {testimonial.company}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function Testimonial() {
  const featured = testimonials.find((testimonial) => testimonial.featured)
  const secondaryTestimonials = testimonials.filter(
    (testimonial) => !testimonial.featured
  )

  return (
    <section className="relative py-16 md:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px] bg-[radial-gradient(ellipse_at_top,_rgba(139,92,246,0.10),_transparent_55%)]"
      />

      <div className="mx-auto max-w-7xl px-4 text-center md:px-8">
        <div
          className="mx-auto mb-5 flex items-center justify-center gap-1"
          aria-label="5 out of 5 stars"
        >
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="size-4 fill-current text-amber-300"
              aria-hidden="true"
            />
          ))}
        </div>

        <h2 className="mb-5 text-3xl font-bold tracking-tight md:text-5xl">
          <span className="bg-gradient-to-b from-neutral-600 to-neutral-200 bg-clip-text text-transparent">
            Client Stories
          </span>
        </h2>
        <p className="mx-auto mb-14 max-w-2xl text-base text-neutral-400 md:text-lg">
          Trusted by founders and marketing leaders at developer-first companies
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="space-y-6">
          {featured ? (
            <TestimonialCard testimonial={featured} featured />
          ) : null}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {secondaryTestimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.name}
                testimonial={testimonial}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonial
