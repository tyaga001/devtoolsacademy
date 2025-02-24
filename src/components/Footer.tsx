"use client"

import React, { useState, useEffect } from "react"
import { AnimatePresence, motion } from "motion/react"
import {
  Twitter,
  Github,
  Linkedin,
  ArrowRight,
  BookOpen,
  ExternalLink,
  Globe,
  Mail,
} from "lucide-react"
import { FaMedium } from "react-icons/fa6"

import CurrentSponsors from "./CurrentSponsors"

interface BlogPost {
  title: string
  url: string
}

const recentBlogPosts: BlogPost[] = [
  {
    title:
      "How to Build a Custom Video Conferencing App with Stream and Next.js",
    url: "https://www.freecodecamp.org/news/how-i-built-a-custom-video-conferencing-app-with-stream-and-nextjs/",
  },
  {
    title:
      "Next.js, Clerk, and Neon Postgres - A Guide to Full-Stack Development",
    url: "https://www.freecodecamp.org/news/nextjs-clerk-neon-fullstack-development/",
  },
  {
    title: "A Software Developer Guide to Writing",
    url: "https://theankurtyagi.com/a-software-developers-guide-to-writing/",
  },
]

const tips = [
  "Tip: Leverage customer feedback loops early in your development process to build features that users truly need.",
  "Trivia: The first recognized SaaS product is Salesforce, launched in 1999.",
  "Tip: Treat your docs as a landing page with interactive guides to increase activation rates and reduce churn.",
  "Trivia: The freemium model was popularized by SaaS companies like Dropbox and Slack.",
  "Tip: Prioritize user retention over acquisition by implementing data-driven loyalty programs and personalized experiences.",
  "Trivia: The COVID-19 pandemic accelerated SaaS adoption, with companies like Zoom seeing a 300% increase in user growth.",
  "Tip: A SaaS always has 3 Landing Pages - website, docs, and GitHub readme.",
  "Trivia: Over 90% of new SaaS platforms provide open APIs, enabling seamless integrations with other software.",
  "Tip: Use A/B testing to experiment with new features and optimize the user experience based on data.",
  "Trivia: The term 'subscription fatigue' emerged as over 80% of U.S. adults had at least one subscription service by 2021.",
]

const QuickTip: React.FC<{ tipIndex: number }> = ({ tipIndex }) => (
  <motion.p
    key={tipIndex}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    className="mt-auto text-neutral-500"
  >
    {tips[tipIndex]}
  </motion.p>
)

const BlogPostList: React.FC = () => (
  <div>
    <h4 className="mb-4 text-xl font-semibold tracking-tight">
      Other Blog Posts
    </h4>
    <ul className="space-y-3">
      {recentBlogPosts.map((post) => (
        <li key={post.url}>
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start text-neutral-500 outline-none transition-colors hover:text-neutral-200 focus:text-neutral-200"
          >
            <BookOpen size={16} className="mr-2 mt-1 shrink-0" />
            <span className="grow">{post.title}</span>
            <ExternalLink
              size={16}
              className="ml-2 shrink-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          </a>
        </li>
      ))}
    </ul>
  </div>
)

const SocialLinks: React.FC<{ linkVariants: any }> = ({ linkVariants }) => (
  <div className="mb-4 flex space-x-4">
    {[
      {
        href: "https://twitter.com/theankurtyagi",
        Icon: Twitter,
        label: "Twitter",
      },
      { href: "https://github.com/tyaga001", Icon: Github, label: "GitHub" },
      {
        href: "https://linkedin.com/in/theankurtyagi",
        Icon: Linkedin,
        label: "LinkedIn",
      },
      {
        href: "https://medium.com/@theankurtyagi",
        Icon: FaMedium,
        label: "Medium",
      },
    ].map(({ href, Icon, label }) => (
      <motion.a
        key={label}
        href={href}
        className="text-neutral-500 transition-colors hover:text-neutral-200"
        variants={linkVariants}
        whileHover="hover"
        aria-label={label}
      >
        <Icon size={24} />
      </motion.a>
    ))}
  </div>
)

const WebsitePromo: React.FC = () => (
  <motion.div className="mt-16 border border-dashed border-neutral-100/15 p-4">
    <p className="mb-5 text-neutral-500">
      Explore more about my writing, SaaS dev tools and my journey in the
      software engineering.
    </p>
    <a
      href="https://theankurtyagi.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex mb-2 items-center border border-dashed outline-none border-neutral-100/15 px-4 py-2 transition-colors bg-neutral-900 hover:bg-neutral-800 focus:bg-neutral-800"
    >
      <Globe size={16} className="mr-2" />
      <span>Visit theankurtyagi.com</span>
      <ArrowRight
        size={16}
        className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
      />
    </a>
    <a
      href="https://bytesizedbets.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center border border-dashed outline-none border-neutral-100/15 px-4 py-2 transition-colors bg-neutral-900 hover:bg-neutral-800 focus:bg-neutral-800"
    >
      <Mail size={16} className="mr-2" />
      <span>Subscribe to my Newsletter</span>
      <ArrowRight
        size={16}
        className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
      />
    </a>
  </motion.div>
)

const Footer: React.FC = () => {
  const [tipIndex, setTipIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prevIndex) => (prevIndex + 1) % tips.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const linkVariants = {
    hover: { scale: 1.1, rotate: 15, transition: { duration: 0.3 } },
  }

  return (
    <footer>
      <hr className="border-dashed border-neutral-100/15" />

      <div className="mx-auto max-w-7xl p-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col">
            <h3 className="mb-4 text-3xl font-bold tracking-tight">
              Dev Tools Academy
            </h3>
            <p className="mb-4 text-sm text-neutral-500">
              &copy; 2025 Dev Tools Academy. All rights reserved.
            </p>
            <SocialLinks linkVariants={linkVariants} />
            <AnimatePresence mode="wait">
              <QuickTip tipIndex={tipIndex} />
            </AnimatePresence>
          </div>

          <div></div>

          <div>
            <BlogPostList />
            <WebsitePromo />
          </div>
        </div>
      </div>

      <hr className="border-dashed border-neutral-100/15" />

      <CurrentSponsors />
    </footer>
  )
}

export default Footer
