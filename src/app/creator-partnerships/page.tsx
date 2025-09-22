import * as React from "react"
import Image from "next/image"
import { getMetadata } from "@/lib/metadata"
import {
  Users,
  Target,
  TrendingUp,
  ArrowRight,
  Zap,
  Shield,
  Globe,
  ExternalLink,
  Youtube,
  BookOpen,
  Mail,
} from "lucide-react"
import { FaGithub } from "react-icons/fa6"
import { SiFreecodecamp, SiHackernoon, SiHashnode } from "react-icons/si"
import { Link } from "next-view-transitions"

import CoverImage from "./cover.png"

export const metadata = getMetadata({
  path: "/creator-partnerships",
  title: "Creator Partnerships | DevTools Academy",
  description:
    "Partner with technical creators and influencers who can authentically promote your developer tools to their engaged audiences",
  image: CoverImage.src,
})

export default function CreatorPartnershipsPage() {
  return (
    <main className="mt-[80px]">
      <hr className="border-dashed border-neutral-100/15" />

      {/* Hero Section */}
      <section className="py-20 text-center">
        <h1 className="mb-6 text-3xl font-bold tracking-tight md:text-6xl">
          <span className="bg-gradient-to-b from-neutral-600 to-neutral-200 bg-clip-text text-transparent">
            Creator Partnerships
          </span>
        </h1>
        <p className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-neutral-400 md:text-xl">
          Partner with YouTube creators, newsletter writers, technical writers,
          and developers who create deep technical content on X/Twitter and
          LinkedIn, as well as short‑form creators on Instagram and
          TikTok—authentic voices who can genuinely promote your developer
          tools.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row sm:gap-6">
          <Link
            href="#contact"
            className="inline-flex items-center justify-center rounded-lg bg-neutral-100 px-8 py-4 text-lg font-medium text-neutral-900 shadow-sm transition-all hover:bg-neutral-200 hover:shadow-md focus:bg-neutral-200 focus:shadow-md"
          >
            Book a Consultation
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-lg border border-neutral-700 bg-transparent px-8 py-4 text-lg font-medium text-neutral-200 transition-all hover:border-neutral-600 hover:bg-neutral-800 focus:border-neutral-600 focus:bg-neutral-800"
          >
            Read Blog
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

      {/* My Promise */}
      <section className="mx-auto max-w-7xl py-16">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">
            <span className="bg-gradient-to-b from-neutral-700 to-neutral-200 bg-clip-text text-transparent">
              My promise to you
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

      {/* Testimonials from Top Tier Creators */}
      <section className="mx-auto max-w-7xl py-16">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">
            <span className="bg-gradient-to-b from-neutral-700 to-neutral-200 bg-clip-text text-transparent">
              Testimonials from Top Tier Creators
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-neutral-500">
            Hear from the technical creators and influencers who trust me to
            connect them with the right developer tools and opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 px-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-dashed border-neutral-100/15 bg-neutral-900 p-6">
            <div className="mb-4 flex items-center">
              <div className="mr-4">
                <Image
                  src="/images/testimonials/david.jpg"
                  alt="David Asaolu"
                  width={48}
                  height={48}
                  className="size-12 rounded-full border border-neutral-600 object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold text-neutral-200">David Asaolu</h4>
                <p className="text-sm text-neutral-500">
                  Software Engineer & Technical Writer
                </p>
              </div>
            </div>
            <p className="italic text-neutral-400">
              &quot;Ankur Tyagi is an outstanding mentor and leader with deep
              knowledge of developer tools and developer experience. He makes
              complex topics easy to understand and always focuses on creating
              content that genuinely helps developers. I strongly recommend
              trusting Ankur and DevToolsAcademy if you want guidance that
              delivers real results.&quot;
            </p>
          </div>

          <div className="rounded-lg border border-dashed border-neutral-100/15 bg-neutral-900 p-6">
            <div className="mb-4 flex items-center">
              <div className="mr-4">
                <Image
                  src="/images/testimonials/daniel-moka.jpg"
                  alt="Daniel Moka"
                  width={48}
                  height={48}
                  className="size-12 rounded-full border border-neutral-600 object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold text-neutral-200">Daniel Moka</h4>
                <p className="text-sm text-neutral-500">
                  Software Engineer • Clean Code & Testing Expert
                </p>
              </div>
            </div>
            <p className="italic text-neutral-400">
              &quot;Ankur has a real gift for connecting people. Without any
              hassle, he introduced me to clients for promotional posts and made
              the whole experience feel natural and easy. Beyond being a great
              friend, he&apos;s someone who genuinely looks out for
              others.&quot;
            </p>
          </div>

          <div className="rounded-lg border border-dashed border-neutral-100/15 bg-neutral-900 p-6">
            <div className="mb-4 flex items-center">
              <div className="mr-4">
                <Image
                  src="/images/testimonials/neo.jpg"
                  alt="Neo Kim"
                  width={48}
                  height={48}
                  className="size-12 rounded-full border border-neutral-600 object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold text-neutral-200">Neo Kim</h4>
                <p className="text-sm text-neutral-500">
                  Creator • The System Design Newsletter
                </p>
              </div>
            </div>
            <p className="italic text-neutral-400">
              &quot;When I started working with Ankur, my newsletter had almost
              zero revenue. Today, I get regular sponsors and even receive
              helpful feedback on how to improve the process. If you want to
              grow your revenue as a content creator, Ankur is the person you
              need to work with.&quot;
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-neutral-500">
            Real feedback from creators who trust me to connect them with the
            right opportunities
          </p>
        </div>
      </section>

      <hr className="border-dashed border-neutral-100/15" />

      {/* Creator Spotlight */}
      <section className="mx-auto max-w-7xl py-16">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">
            <span className="bg-gradient-to-b from-neutral-700 to-neutral-200 bg-clip-text text-transparent">
              Trusted Voices in DevTools
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-neutral-500">
            I collaborate with vetted creators and publications across YouTube,
            newsletters, and blogs who have built authentic relationships with
            developer communities.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 px-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Fireship */}
          <div className="rounded-lg border border-dashed border-neutral-100/15 bg-neutral-900 p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Youtube className="size-5 text-red-500" />
                <h3 className="font-semibold text-neutral-200">Fireship</h3>
              </div>
              <a
                href="https://www.youtube.com/@Fireship"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 transition-colors hover:text-neutral-200"
              >
                <ExternalLink className="size-4" />
              </a>
            </div>
            <div className="mb-3 text-sm text-neutral-400">
              <span className="font-medium">4M+ subscribers</span> • Fast-paced
              tutorials
            </div>
            <p className="text-sm text-neutral-500">
              Known for concise, high-energy content that makes complex web
              development concepts accessible to developers at all levels.
            </p>
          </div>

          {/* JavaScript Mastery */}
          <div className="rounded-lg border border-dashed border-neutral-100/15 bg-neutral-900 p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Youtube className="size-5 text-red-500" />
                <h3 className="font-semibold text-neutral-200">
                  JavaScript Mastery
                </h3>
              </div>
              <a
                href="https://www.youtube.com/@javascriptmastery"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 transition-colors hover:text-neutral-200"
              >
                <ExternalLink className="size-4" />
              </a>
            </div>
            <div className="mb-3 text-sm text-neutral-400">
              <span className="font-medium">1.16M+ subscribers</span> •
              Full-stack projects
            </div>
            <p className="text-sm text-neutral-500">
              Builds comprehensive full-stack applications with modern
              frameworks, helping developers learn through practical
              project-based tutorials.
            </p>
          </div>

          {/* Traversy Media */}
          <div className="rounded-lg border border-dashed border-neutral-100/15 bg-neutral-900 p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Youtube className="size-5 text-red-500" />
                <h3 className="font-semibold text-neutral-200">
                  Traversy Media
                </h3>
              </div>
              <a
                href="https://www.youtube.com/@TraversyMedia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 transition-colors hover:text-neutral-200"
              >
                <ExternalLink className="size-4" />
              </a>
            </div>
            <div className="mb-3 text-sm text-neutral-400">
              <span className="font-medium">2.37M+ subscribers</span> • Web
              development tutorials
            </div>
            <p className="text-sm text-neutral-500">
              Trusted by millions for clear, practical web development tutorials
              covering everything from basics to advanced frameworks and tools.
            </p>
          </div>

          {/* Code with Antonio */}
          <div className="rounded-lg border border-dashed border-neutral-100/15 bg-neutral-900 p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Youtube className="size-5 text-red-500" />
                <h3 className="font-semibold text-neutral-200">
                  Code with Antonio
                </h3>
              </div>
              <a
                href="https://www.youtube.com/@codewithantonio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 transition-colors hover:text-neutral-200"
              >
                <ExternalLink className="size-4" />
              </a>
            </div>
            <div className="mb-3 text-sm text-neutral-400">
              <span className="font-medium">399K+ subscribers</span> •
              Full-stack builds
            </div>
            <p className="text-sm text-neutral-500">
              Creates detailed full-stack application tutorials with modern tech
              stacks, focusing on real-world development practices.
            </p>
          </div>

          {/* ByteByteGo */}
          <div className="rounded-lg border border-dashed border-neutral-100/15 bg-neutral-900 p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="size-5 text-blue-500" />
                <h3 className="font-semibold text-neutral-200">ByteByteGo</h3>
              </div>
              <a
                href="https://blog.bytebytego.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 transition-colors hover:text-neutral-200"
              >
                <ExternalLink className="size-4" />
              </a>
            </div>
            <div className="mb-3 text-sm text-neutral-400">
              <span className="font-medium">1M+ readers</span> • System design
              deep dives
            </div>
            <p className="text-sm text-neutral-500">
              Provides in-depth system design content and engineering insights
              that help developers understand large-scale architecture patterns.
            </p>
          </div>

          {/* Sonny Sangha */}
          <div className="rounded-lg border border-dashed border-neutral-100/15 bg-neutral-900 p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Youtube className="size-5 text-red-500" />
                <h3 className="font-semibold text-neutral-200">Sonny Sangha</h3>
              </div>
              <a
                href="https://www.youtube.com/@SonnySangha"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 transition-colors hover:text-neutral-200"
              >
                <ExternalLink className="size-4" />
              </a>
            </div>
            <div className="mb-3 text-sm text-neutral-400">
              <span className="font-medium">356K+ subscribers</span> • React &
              Next.js builds
            </div>
            <p className="text-sm text-neutral-500">
              Known for building impressive full-stack applications with React,
              Next.js, and modern web technologies in engaging live coding
              sessions.
            </p>
          </div>

          {/* The System Design Newsletter */}
          <div className="rounded-lg border border-dashed border-neutral-100/15 bg-neutral-900 p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="size-5 text-green-500" />
                <h3 className="font-semibold text-neutral-200">
                  The System Design Newsletter
                </h3>
              </div>
              <a
                href="https://newsletter.systemdesign.one/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 transition-colors hover:text-neutral-200"
              >
                <ExternalLink className="size-4" />
              </a>
            </div>
            <div className="mb-3 text-sm text-neutral-400">
              <span className="font-medium">400K+ subscribers</span> • System
              design education
            </div>
            <p className="text-sm text-neutral-500">
              Teaches system design concepts and architecture patterns to help
              engineers build scalable systems, trusted by engineering teams
              worldwide.
            </p>
          </div>

          {/* CodeSistency */}
          <div className="rounded-lg border border-dashed border-neutral-100/15 bg-neutral-900 p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Youtube className="size-5 text-red-500" />
                <h3 className="font-semibold text-neutral-200">CodeSistency</h3>
              </div>
              <a
                href="https://www.youtube.com/@codesistency"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 transition-colors hover:text-neutral-200"
              >
                <ExternalLink className="size-4" />
              </a>
            </div>
            <div className="mb-3 text-sm text-neutral-400">
              <span className="font-medium">113K+ subscribers</span> • Software
              engineering tutorials
            </div>
            <p className="text-sm text-neutral-500">
              Burak creates high-quality software engineering content focusing
              on best practices, clean code, and modern development techniques
              for professional developers.
            </p>
          </div>

          {/* The New Stack */}
          <div className="rounded-lg border border-dashed border-neutral-100/15 bg-neutral-900 p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="size-5 text-blue-500" />
                <h3 className="font-semibold text-neutral-200">
                  The New Stack
                </h3>
              </div>
              <a
                href="https://thenewstack.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 transition-colors hover:text-neutral-200"
              >
                <ExternalLink className="size-4" />
              </a>
            </div>
            <div className="mb-3 text-sm text-neutral-400">
              <span className="font-medium">500K+ readers</span> • Cloud native
              & DevOps insights
            </div>
            <p className="text-sm text-neutral-500">
              Leading publication covering cloud native technologies, DevOps
              practices, and modern software development for engineering leaders
              and developers.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-neutral-500">
            This represents a sample of the 200+ creators and publications in my
            network across YouTube, newsletters, blogs, and social platforms.
          </p>
        </div>
      </section>

      <hr className="border-dashed border-neutral-100/15" />

      {/* About Me */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 py-16 md:grid-cols-2">
        <div className="border-r border-dashed border-neutral-100/15 px-6 pt-12 md:py-12">
          <h2 className="mb-6 text-2xl font-bold tracking-tight md:text-3xl">
            <span className="bg-gradient-to-b from-neutral-700 to-neutral-200 bg-clip-text text-transparent">
              About me
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
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                <a
                  href="https://github.com/tyaga001"
                  className="flex items-center gap-1.5 text-blue-400 transition-colors hover:text-blue-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub size={16} />
                  <span>GitHub</span>
                </a>
                <span className="text-neutral-600">•</span>
                <a
                  href="https://theankurtyagi.com"
                  className="flex items-center gap-1.5 text-blue-400 transition-colors hover:text-blue-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Globe size={16} />
                  <span>Personal Site</span>
                </a>
                <span className="text-neutral-600">•</span>
                <a
                  href="https://www.freecodecamp.org/news/author/TheAnkurTyagi/"
                  className="flex items-center gap-1.5 text-blue-400 transition-colors hover:text-blue-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiFreecodecamp size={16} />
                  <span>freeCodeCamp</span>
                </a>
                <span className="text-neutral-600">•</span>
                <a
                  href="https://thenewstack.io/author/ankur-tyagi/"
                  className="flex items-center gap-1.5 text-blue-400 transition-colors hover:text-blue-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="shrink-0"
                  >
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm-1-17v14l8-7-8-7z" />
                  </svg>
                  <span>The New Stack</span>
                </a>
                <span className="text-neutral-600">•</span>
                <a
                  href="https://theankurtyagi.hashnode.dev/"
                  className="flex items-center gap-1.5 text-blue-400 transition-colors hover:text-blue-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiHashnode size={16} />
                  <span>Hashnode</span>
                </a>
                <span className="text-neutral-600">•</span>
                <a
                  href="https://hackernoon.com/u/theankurtyagi"
                  className="flex items-center gap-1.5 text-blue-400 transition-colors hover:text-blue-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiHackernoon size={16} />
                  <span>HackerNoon</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-dashed border-neutral-100/15" />

      {/* Pricing Signals */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 py-16 md:grid-cols-2">
        <div className="border-r border-dashed border-neutral-100/15 px-6 pt-12 md:py-12">
          <h2 className="mb-6 text-2xl font-bold tracking-tight md:text-3xl">
            <span className="bg-gradient-to-b from-neutral-700 to-neutral-200 bg-clip-text text-transparent">
              Campaigns That Fit
            </span>
          </h2>
        </div>

        <div className="space-y-6 px-6 py-12 leading-relaxed text-neutral-500">
          <p>
            I work with SaaS companies of all sizes—from early-stage startups
            launching their first creator campaign to established companies
            building long-term influencer programs. My engagements are designed
            to scale with your budget and goals.
          </p>

          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="mt-1 size-2 shrink-0 rounded-full bg-blue-500" />
              <div>
                <h3 className="mb-1 font-semibold text-neutral-200">
                  One-off Campaigns
                </h3>
                <p className="text-sm">
                  Perfect for product launches, feature announcements, or
                  testing creator partnerships for the first time.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="mt-1 size-2 shrink-0 rounded-full bg-green-500" />
              <div>
                <h3 className="mb-1 font-semibold text-neutral-200">
                  Product Launch Support
                </h3>
                <p className="text-sm">
                  Comprehensive creator outreach and coordination for major
                  product releases or funding announcements.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="mt-1 size-2 shrink-0 rounded-full bg-purple-500" />
              <div>
                <h3 className="mb-1 font-semibold text-neutral-200">
                  Ongoing Creator Programs
                </h3>
                <p className="text-sm">
                  Long-term partnerships with monthly creator activations and
                  strategic program development.
                </p>
              </div>
            </div>
          </div>

          <p className="pt-4 text-sm">
            <span className="font-medium text-neutral-300">
              Ready to explore what fits your needs?
            </span>{" "}
            Book a consultation to discuss your goals and get a custom proposal.
          </p>
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
              href="mailto:hello@theankurtyagi.com"
              className="inline-flex items-center justify-center bg-neutral-200 px-8 py-4 text-lg font-medium text-neutral-800 outline-none transition-colors hover:bg-neutral-400 focus:bg-neutral-400"
            >
              Contact Me
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
