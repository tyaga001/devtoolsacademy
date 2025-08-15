import * as React from "react"
import { getMetadata } from "@/lib/metadata"
import {
  Users,
  Target,
  TrendingUp,
  ArrowRight,
  Zap,
  Shield,
} from "lucide-react"
import { Link } from "next-view-transitions"

import CoverImage from "./cover.png"

export const metadata = getMetadata({
  path: "/services",
  title: "Tech Influencers as a Service (IaaS) | DevTools Academy",
  description:
    "Connect with technical creators and influencers who can authentically promote your developer tools to their engaged audiences",
  image: CoverImage.src,
})

export default function ServicesPage() {
  return (
    <main className="mt-[80px]">
      <hr className="border-dashed border-neutral-100/15" />

      {/* Hero Section */}
      <section className="py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold tracking-tight md:text-5xl">
          <span className="bg-gradient-to-b from-neutral-700 to-neutral-200 bg-clip-text text-transparent">
            Tech Influencers on Tap
          </span>
        </h1>
        <p className="mx-auto mb-8 max-w-3xl text-base text-neutral-500 md:text-lg">
          I connect SaaS companies with YouTube creators, newsletter writers,
          technical writers developers who post deep technical content on
          X/Twitter and LinkedIn, and people who create short videos on
          Instagram/TikTok with companies who need authentic promotion of their
          developer tools.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="#contact"
            className="bg-neutral-200 px-6 py-3 text-base font-medium text-neutral-800 outline-none transition-colors hover:bg-neutral-400 focus:bg-neutral-400"
          >
            Book a Consultation
          </Link>
          <Link
            href="/blog"
            className="border border-dashed border-neutral-200 px-6 py-3 text-base font-medium text-neutral-200 outline-none transition-colors hover:bg-neutral-800 focus:bg-neutral-800"
          >
            Read blog
          </Link>
        </div>
      </section>

      <hr className="border-dashed border-neutral-100/15" />

      {/* Value Proposition */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 py-16 md:grid-cols-2">
        <div className="border-r border-dashed border-neutral-100/15 px-6 pt-12 md:py-12">
          <h2 className="mb-6 text-2xl font-bold tracking-tight md:text-3xl">
            <span className="bg-gradient-to-b from-neutral-700 to-neutral-200 bg-clip-text text-transparent">
              Launch your highest-performing influencer marketing strategy
            </span>
          </h2>
        </div>

        <div className="space-y-6 px-6 py-12 leading-relaxed text-neutral-500">
          <div className="flex items-start space-x-4">
            <Target className="mt-1 size-6 shrink-0 text-blue-500" />
            <div>
              <h3 className="mb-2 font-semibold text-neutral-200">
                Target the right creators
              </h3>
              <p>
                I help you identify and connect with the perfect technical
                creator for your specific audience, saving months of research
                and outreach.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <TrendingUp className="mt-1 size-6 shrink-0 text-green-500" />
            <div>
              <h3 className="mb-2 font-semibold text-neutral-200">
                Generate authentic reach
              </h3>
              <p>
                My network drives thousands of high quality impressions, helping
                companies reach developers through trusted voices in their
                community.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <Users className="mt-1 size-6 shrink-0 text-purple-500" />
            <div>
              <h3 className="mb-2 font-semibold text-neutral-200">
                Build developer trust
              </h3>
              <p>
                Technical decision-makers trust these creators because
                they&apos;ve built authentic relationships and credibility in
                their communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-dashed border-neutral-100/15" />

      {/* Our Promise */}
      <section className="mx-auto max-w-7xl py-16">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">
            <span className="bg-gradient-to-b from-neutral-700 to-neutral-200 bg-clip-text text-transparent">
              Our promise to you
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-neutral-500">
            I believe the best results come from aligned incentives. So much
            that I commit to outcomes through my Tech Influencers Guarantee.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 px-6 md:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-neutral-800">
              <Shield className="size-8 text-green-500" />
            </div>
            <h3 className="mb-3 text-xl font-semibold text-neutral-200">
              No empty promises
            </h3>
            <p className="text-neutral-500">
              I vet every creator and provide real-world insights based on
              actual engagement, not just follower counts.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-neutral-800">
              <TrendingUp className="size-8 text-blue-500" />
            </div>
            <h3 className="mb-3 text-xl font-semibold text-neutral-200">
              Clear, measurable outcomes
            </h3>
            <p className="text-neutral-500">
              I work with you to define success metrics and track the impact of
              your influencer partnerships on brand awareness and conversions.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-neutral-800">
              <Zap className="size-8 text-yellow-500" />
            </div>
            <h3 className="mb-3 text-xl font-semibold text-neutral-200">
              Ongoing support
            </h3>
            <p className="text-neutral-500">
              I don&apos;t just connect you with creators and disappear. I
              provide ongoing guidance as your influencer strategy evolves.
            </p>
          </div>
        </div>
      </section>

      <hr className="border-dashed border-neutral-100/15" />

      {/* Why Developer Tools Matter */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 py-16 md:grid-cols-2">
        <div className="border-r border-dashed border-neutral-100/15 px-6 pt-12 md:py-12">
          <h2 className="mb-6 text-2xl font-bold tracking-tight md:text-3xl">
            <span className="bg-gradient-to-b from-neutral-700 to-neutral-200 bg-clip-text text-transparent">
              Why tech influencers matter
            </span>
          </h2>
        </div>

        <div className="space-y-4 px-6 py-12 leading-relaxed text-neutral-500">
          <p>
            Technical decision makers don&apos;t pay attention to traditional
            ads. And they&apos;re getting harder to reach via increasingly
            fragmented social media.
          </p>
          <p>
            Technical leaders listen to trusted friends and peers. That&apos;s
            where tech influencers can help if you use them effectively.
          </p>
          <p>
            I&apos;ve spent years building relationships with technical creators
            across platforms like YouTube, Twitter, LinkedIn, newsletters, and
            more.
          </p>
        </div>
      </section>

      <hr className="border-dashed border-neutral-100/15" />

      {/* How It Works */}
      <section className="mx-auto max-w-7xl py-16">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">
            <span className="bg-gradient-to-b from-neutral-700 to-neutral-200 bg-clip-text text-transparent">
              How it works
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-neutral-500">
            You set the goal, I do the rest. I&apos;ll unlock the right creators
            for your specific niche and provide actionable partnerships.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 px-6 md:grid-cols-4">
          <div className="text-center">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-neutral-800">
              <span className="text-2xl font-bold text-neutral-200">1</span>
            </div>
            <h3 className="mb-3 text-lg font-semibold text-neutral-200">
              Discovery & Analysis
            </h3>
            <p className="text-neutral-500">
              I analyze your target audience, brand voice, and campaign goals to
              understand your unique needs.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-neutral-800">
              <span className="text-2xl font-bold text-neutral-200">2</span>
            </div>
            <h3 className="mb-3 text-lg font-semibold text-neutral-200">
              Creator Matching
            </h3>
            <p className="text-neutral-500">
              I research and identify relevant creators, providing detailed
              analysis and engagement insights.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-neutral-800">
              <span className="text-2xl font-bold text-neutral-200">3</span>
            </div>
            <h3 className="mb-3 text-lg font-semibold text-neutral-200">
              Partnership Setup
            </h3>
            <p className="text-neutral-500">
              I deliver actionable partnerships with campaign guidance and
              content strategies.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-neutral-800">
              <span className="text-2xl font-bold text-neutral-200">4</span>
            </div>
            <h3 className="mb-3 text-lg font-semibold text-neutral-200">
              Ongoing Support
            </h3>
            <p className="text-neutral-500">
              I provide continued guidance as you implement and optimize your
              influencer strategy.
            </p>
          </div>
        </div>
      </section>

      <hr className="border-dashed border-neutral-100/15" />

      {/* What Our Clients Say */}
      <section className="mx-auto max-w-7xl py-16">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">
            <span className="bg-gradient-to-b from-neutral-700 to-neutral-200 bg-clip-text text-transparent">
              What our clients say
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 px-6 md:grid-cols-2">
          <div className="rounded-lg border border-dashed border-neutral-100/15 bg-neutral-900 p-6">
            <div className="mb-4 flex items-center">
              <div className="mr-4 flex size-12 items-center justify-center rounded-full bg-neutral-800">
                <span className="text-lg font-bold text-neutral-200">A</span>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-200">Alex Chen</h4>
                <p className="text-sm text-neutral-500">CTO, TechStartup</p>
              </div>
            </div>
            <p className="italic text-neutral-400">
              &quot;Ankur helped us connect with the right technical creators
              who authentically promoted our tool to their engaged developer
              audiences.&quot;
            </p>
          </div>

          <div className="rounded-lg border border-dashed border-neutral-100/15 bg-neutral-900 p-6">
            <div className="mb-4 flex items-center">
              <div className="mr-4 flex size-12 items-center justify-center rounded-full bg-neutral-800">
                <span className="text-lg font-bold text-neutral-200">S</span>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-200">
                  Sarah Johnson
                </h4>
                <p className="text-sm text-neutral-500">
                  Engineering Manager, ScaleCorp
                </p>
              </div>
            </div>
            <p className="italic text-neutral-400">
              &quot;His creator matching was spot-on. We worked with technical
              YouTubers and saw a 300% increase in developer signups.&quot;
            </p>
          </div>
        </div>
      </section>

      <hr className="border-dashed border-neutral-100/15" />

      {/* Our Team */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 py-16 md:grid-cols-2">
        <div className="border-r border-dashed border-neutral-100/15 px-6 pt-12 md:py-12">
          <h2 className="mb-6 text-2xl font-bold tracking-tight md:text-3xl">
            <span className="bg-gradient-to-b from-neutral-700 to-neutral-200 bg-clip-text text-transparent">
              Our team
            </span>
          </h2>
        </div>

        <div className="space-y-6 px-6 py-12 leading-relaxed text-neutral-500">
          <div className="flex items-start space-x-4">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-neutral-800">
              <span className="text-xl font-bold text-neutral-200">AT</span>
            </div>
            <div>
              <h3 className="mb-2 text-xl font-semibold text-neutral-200">
                Ankur Tyagi
              </h3>
              <p className="mb-2 text-sm text-neutral-400">
                Founder & Lead Consultant
              </p>
              <p>
                Software engineer based in Sweden with deep expertise in
                developer tools and developer experience. I&apos;ve spent years
                building relationships with technical creators across platforms
                to help companies reach developers authentically.
              </p>
              <div className="mt-3 flex items-center space-x-2">
                <a
                  href="https://github.com/tyaga001"
                  className="text-blue-400 transition-colors hover:text-blue-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <span className="text-neutral-600">•</span>
                <a
                  href="https://theankurtyagi.com"
                  className="text-blue-400 transition-colors hover:text-blue-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Personal Site
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-dashed border-neutral-100/15" />

      {/* Contact Section */}
      <section id="contact" className="mx-auto max-w-7xl py-16">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">
            <span className="bg-gradient-to-b from-neutral-700 to-neutral-200 bg-clip-text text-transparent">
              Ready to get started?
            </span>
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-lg text-neutral-500">
            Let&apos;s discuss how I can help you connect with the right
            technical creators and reach developers authentically.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="mailto:hello@devtoolsacademy.com"
              className="inline-flex items-center justify-center bg-neutral-200 px-8 py-4 text-lg font-medium text-neutral-800 outline-none transition-colors hover:bg-neutral-400 focus:bg-neutral-400"
            >
              Contact Us
              <ArrowRight className="ml-2 size-5" />
            </a>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center border border-dashed border-neutral-200 px-8 py-4 text-lg font-medium text-neutral-200 outline-none transition-colors hover:bg-neutral-800 focus:bg-neutral-800"
            >
              Start Reading
              <ArrowRight className="ml-2 size-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
