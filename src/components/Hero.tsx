"use client"

import React from "react"
import { Link } from "next-view-transitions"

// import StreamLogo from "@/assets/stream.png"
// import CodeRabbitLogo from "@/assets/coderabbit.svg"

const Hero: React.FC = () => {
  return (
    <section className="grid place-content-center py-48">
      <div className="flex  flex-col px-4 text-center text-neutral-200 md:px-0">
        <h1 className="mb-3 max-w-5xl text-3xl font-bold tracking-tight text-neutral-200 md:mb-8 md:text-6xl md:leading-[1.1]">
          Your Guide to Developer Tools: Explore, Compare, and Build Smarter
        </h1>
        <p className="mx-auto mb-8 max-w-3xl text-base text-neutral-500 md:mb-12 md:text-lg">
          Explore a platform built for developers. Browse essential tools,
          compare options effortlessly, and dive into our blog for analyses that
          help you work smarter and build with confidence.
        </p>
        <div>
          <Link
            href="/blog"
            className="rounded-md bg-neutral-200 px-5 py-3 text-lg font-medium text-neutral-800"
          >
            Start Reading
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero
