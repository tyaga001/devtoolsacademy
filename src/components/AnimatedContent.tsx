"use client"

import React from "react"
import { motion } from "motion/react"

export default function AnimatedContent() {
  return (
    <>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-center text-4xl font-bold tracking-tight text-transparent"
      >
        Contribute to Dev Tools Academy
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-12 text-center text-xl text-neutral-600 dark:text-neutral-300"
      >
        We welcome contributions from the community. Here&apos;s how you can get
        involved:
      </motion.p>

      <div className="mb-12 grid gap-8 md:grid-cols-2">
        {[
          {
            title: "Write a blog post",
            description:
              "Compare developer tools and share your real time experience",
          },
          {
            title: "Suggest topics",
            description: "Propose ideas for future comparisons and articles",
          },
          {
            title: "Improve the website",
            description: "Enhance our design and functionality",
          },
          {
            title: "Report issues",
            description:
              "Help us identify and fix bugs or suggest enhancements",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
            className="rounded-lg bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl dark:bg-neutral-950"
          >
            <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
            <p className="text-neutral-600 dark:text-neutral-300">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </>
  )
}
