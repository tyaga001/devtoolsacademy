"use client"

import React, { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  Twitter,
  Github,
  Linkedin,
  ArrowRight,
  BookOpen,
  ExternalLink,
  Globe,
} from "lucide-react"
import { FaMedium } from "react-icons/fa6"
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
    <h4 className="mb-4 text-xl font-semibold text-yellow-400">
      Other Blog Posts
    </h4>
    <ul className="space-y-3">
      {recentBlogPosts.map((post) => (
        <motion.li
          key={post.url}
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start text-neutral-300 transition-colors duration-300 hover:text-yellow-300"
          >
            <BookOpen size={16} className="mr-2 mt-1 shrink-0" />
            <span className="grow">{post.title}</span>
            <ExternalLink
              size={16}
              className="ml-2 shrink-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          </a>
        </motion.li>
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
        className="text-neutral-300 transition-colors duration-300 hover:text-yellow-300"
        variants={linkVariants}
        whileHover="hover"
        aria-label={label}
      >
        <Icon size={24} />
      </motion.a>
    ))}
  </div>
)

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
  <div className="text-center text-neutral-400">
    <p className="mb-4">
      Progress on the upcoming blog post:{" "}
      <span className="font-bold text-yellow-400">{progress}%</span>
    </p>
    <div className="mt-2 h-2 w-full rounded-full bg-neutral-700">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500"
        style={{ width: `${progress}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1 }}
      />
    </div>
  </div>
)

const WebsitePromo: React.FC = () => (
  <motion.div
    className="mt-4 rounded-lg bg-gradient-to-r from-purple-900 to-indigo-900 p-4"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300, damping: 10 }}
  >
    <h4 className="mb-2 text-xl font-semibold text-yellow-400">My Website</h4>
    <p className="mb-3 text-neutral-300">
      Explore more about my writing, SaaS dev tools and my journey in the
      software engineering.
    </p>
    <a
      href="https://theankurtyagi.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center rounded-full bg-purple-600 px-4 py-2 text-white transition-colors duration-300 hover:bg-purple-700"
    >
      <Globe size={16} className="mr-2" />
      <span>Visit theankurtyagi.com</span>
      <ArrowRight
        size={16}
        className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
      />
    </a>
  </motion.div>
)

const Footer: React.FC = () => {
  const [tipIndex, setTipIndex] = useState(0)
  const [progress] = useState(50)

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
    <footer className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 grid gap-8 md:grid-cols-3">
          <div className="flex flex-col">
            <h3 className="mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-3xl font-bold text-transparent">
              Dev Tools Academy
            </h3>
            <p className="text-neutral-300">
              Choose the Right Dev Tools for Your SaaS.
            </p>
            <AnimatePresence mode="wait">
              <QuickTip tipIndex={tipIndex} />
            </AnimatePresence>
          </div>

          <BlogPostList />

          <div>
            <h4 className="mb-4 text-xl font-semibold text-yellow-400">
              Connect With Me
            </h4>
            <SocialLinks linkVariants={linkVariants} />
            <WebsitePromo />
          </div>
        </div>
      </div>

      <hr className="my-8 border-neutral-700" />

      <div className="mx-auto max-w-7xl px-4">
        <ProgressBar progress={progress} />
      </div>

      <hr className="my-8 border-neutral-700" />

      <div className="mx-auto mt-6 max-w-7xl px-4 text-center text-neutral-400">
        <p>&copy; 2024 Dev Tools Academy. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
