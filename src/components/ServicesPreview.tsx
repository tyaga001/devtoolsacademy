import React from "react"
import { Link } from "next-view-transitions"
import { ArrowRight, Target, TrendingUp, Users } from "lucide-react"

export default function ServicesPreview() {
  return (
    <section className="mx-auto max-w-7xl py-16">
      <div className="mb-16 text-center">
        <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">
          <span className="bg-gradient-to-b from-neutral-500 to-neutral-200 bg-clip-text text-transparent">
            Tech Influencers on Tap
          </span>
        </h2>
        <p className="mx-auto mb-8 max-w-3xl text-lg text-neutral-500">
          I connect high-growth companies with technical creators who can
          authentically promote their developer tools.
        </p>
      </div>

      <div className="mb-16 grid grid-cols-1 gap-12 px-6 md:grid-cols-3 md:gap-8">
        <div className="text-center">
          <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-900 shadow-lg">
            <Target className="size-8 text-neutral-300" />
          </div>
          <h3 className="mb-4 text-xl font-semibold text-neutral-100">
            Target the right creators
          </h3>
          <p className="leading-relaxed text-neutral-400">
            I help you identify and connect with the perfect technical creators
            for your specific audience.
          </p>
        </div>

        <div className="text-center">
          <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-900 shadow-lg">
            <TrendingUp className="size-8 text-neutral-300" />
          </div>
          <h3 className="mb-4 text-xl font-semibold text-neutral-100">
            Generate authentic reach
          </h3>
          <p className="leading-relaxed text-neutral-400">
            My network drives thousands of high-quality impressions, helping
            companies reach developers through trusted voices.
          </p>
        </div>

        <div className="text-center">
          <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-900 shadow-lg">
            <Users className="size-8 text-neutral-300" />
          </div>
          <h3 className="mb-4 text-xl font-semibold text-neutral-100">
            Build developer trust
          </h3>
          <p className="leading-relaxed text-neutral-400">
            Technical decision-makers trust these creators because they&apos;ve
            built authentic relationships in their communities.
          </p>
        </div>
      </div>

      <div className="text-center">
        <Link
          href="/services"
          className="inline-flex items-center justify-center rounded-lg bg-neutral-100 px-8 py-4 text-lg font-medium text-neutral-900 shadow-sm transition-all hover:bg-neutral-200 hover:shadow-md focus:bg-neutral-200 focus:shadow-md"
        >
          Learn More About My Services
          <ArrowRight className="ml-2 size-5" />
        </Link>
      </div>
    </section>
  )
}
