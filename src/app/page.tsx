import React from "react"

import { getMetadata } from "@/lib/metadata"

import Hero from "@/components/Hero"
import FeaturedPosts from "@/components/FeaturedPosts"
import Testimonial from "@/components/Testimonial"
import Footer from "@/components/Footer"

export const metadata = getMetadata({
  path: "/",
  title: "DevTools Academy",
  description: "Learn about awesome developer tools",
})

const featuredPosts = [
  {
    title: "Neon vs. Supabase",
    excerpt: "Choose the right Database for your SaaS.",
    image: "/images/default-og-image.png",
    slug: "neon-vs-supabase",
    url: "/blog/neon-vs-supabase",
    category: "Database",
  },
  {
    title: "Twilio vs Stream",
    excerpt: "A Guide to Building Smarter Support Bots",
    image: "/images/Twilio vs Stream.png",
    slug: "stream-vs-twilio",
    url: "/blog/stream-vs-twilio",
    category: "SaaS",
  },
  {
    title: "CodeRabbit vs Other AI code review tools",
    excerpt: "Choose the right AI code review tool",
    image: "/images/coderabbit-vs-others.png",
    slug: "coderabbit-vs-others-ai-code-review-tools",
    url: "/blog/coderabbit-vs-others-ai-code-review-tools",
    category: "Code Review",
    isNew: true,
  },
]

export default function Home() {
  return (
    <div className="min-h-screen text-neutral-200">
      <main>
        <Hero />
        {featuredPosts.length > 0 && <FeaturedPosts posts={featuredPosts} />}
      </main>
      <hr className="border-neutral-500" />
      <Testimonial />
      <hr className="border-neutral-500" />
      <Footer />
    </div>
  )
}
