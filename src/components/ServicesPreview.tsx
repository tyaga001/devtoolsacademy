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

      <div className="mb-12 grid grid-cols-1 gap-8 px-6 md:grid-cols-3">
        <div className="text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-neutral-800">
            <Target className="size-8 text-blue-500" />
          </div>
          <h3 className="mb-3 text-xl font-semibold text-neutral-200">
            Target the right creators
          </h3>
          <p className="text-neutral-500">
            I help you identify and connect with the perfect technical creators
            for your specific audience.
          </p>
        </div>

        <div className="text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-neutral-800">
            <TrendingUp className="size-8 text-green-500" />
          </div>
          <h3 className="mb-3 text-xl font-semibold text-neutral-200">
            Generate authentic reach
          </h3>
          <p className="text-neutral-500">
            My network drives thousands of high-quality impressions, helping
            companies reach developers through trusted voices.
          </p>
        </div>

        <div className="text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-neutral-800">
            <Users className="size-8 text-purple-500" />
          </div>
          <h3 className="mb-3 text-xl font-semibold text-neutral-200">
            Build developer trust
          </h3>
          <p className="text-neutral-500">
            Technical decision-makers trust these creators because they&apos;ve
            built authentic relationships in their communities.
          </p>
        </div>
      </div>

      <div className="text-center">
        <Link
          href="/services"
          className="inline-flex items-center bg-neutral-200 px-8 py-4 text-lg font-medium text-neutral-800 outline-none transition-colors hover:bg-neutral-400 focus:bg-neutral-400"
        >
          Learn More About My Services
          <ArrowRight className="ml-2 size-5" />
        </Link>
      </div>
    </section>
  )
}
