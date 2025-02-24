"use client"

import React from "react"
import { Link } from "next-view-transitions"

// import StreamLogo from "@/assets/stream.png"
// import CodeRabbitLogo from "@/assets/coderabbit.svg"

const Hero: React.FC = () => {
  return (
    <section className="mt-[80px]">
      <hr className="border-dashed border-neutral-100 opacity-10" />

      <div className="relative mx-auto grid max-w-7xl place-content-center py-36 md:py-48">
        <div className="grid-background absolute inset-0 -z-10 size-full opacity-5" />
        <div className="flex flex-col px-4 text-center text-neutral-200 md:px-0">
          <h1 className="mb-3 max-w-5xl text-3xl font-bold tracking-tight text-neutral-200 md:mb-8 md:text-6xl md:leading-[1.1]">
            <span className="bg-gradient-to-b from-neutral-700 to-neutral-200 bg-clip-text text-transparent">
              Your Guide to Developer Tools: Explore, Compare, and Learn.
            </span>
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-base text-neutral-500 md:mb-12 md:text-lg">
            Explore a platform built for developers. Browse essential tools,
            compare options effortlessly, and dive into our blog for analyses
            that help you work smarter and build with confidence.
          </p>
          <div>
            <Link
              href="/blog"
              className="bg-neutral-200 px-4 py-2 text-base font-medium text-neutral-800 outline-none transition-colors hover:bg-neutral-300 focus:bg-neutral-300 md:px-6 md:py-3 md:text-lg"
            >
              Start Reading
            </Link>
          </div>
        </div>
      </div>

      <hr className="border-dashed border-neutral-100 opacity-10" />
    </section>
  )
}

export default Hero
