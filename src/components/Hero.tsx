"use client"

import React from "react"
import { Link } from "next-view-transitions"

const Hero: React.FC = () => {
  return (
    <section className="mt-[80px]">
      <hr className="border-dashed border-neutral-100/15" />

      <div className="relative mx-auto grid max-w-7xl place-content-center py-40 md:py-56">
        <div className="grid-background absolute inset-0 -z-10 opacity-[0.03]" />
        <div className="flex flex-col px-6 text-center text-neutral-200 md:px-0">
          <h1 className="mb-6 max-w-5xl text-4xl font-bold tracking-tight text-neutral-200 md:mb-10 md:text-7xl md:leading-[1.05]">
            <span className="bg-gradient-to-b from-neutral-600 to-neutral-100 bg-clip-text text-transparent">
              Where Developers, Creators, and SaaS Companies Connect
            </span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-neutral-400 md:mb-14 md:text-xl leading-relaxed">
            Open-source platform connecting developers with tool insights,
            premium job opportunities, and SaaS companies with authentic
            technical creators for developer marketing.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row sm:gap-6">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-lg bg-neutral-100 px-8 py-4 text-lg font-medium text-neutral-900 shadow-sm transition-all hover:bg-neutral-200 hover:shadow-md focus:bg-neutral-200 focus:shadow-md"
            >
              Start Reading
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-lg border border-neutral-700 bg-transparent px-8 py-4 text-lg font-medium text-neutral-200 transition-all hover:bg-neutral-800 hover:border-neutral-600 focus:bg-neutral-800 focus:border-neutral-600"
            >
              My Services
            </Link>
          </div>
        </div>
      </div>

      <hr className="border-dashed border-neutral-100/15" />
    </section>
  )
}

export default Hero
