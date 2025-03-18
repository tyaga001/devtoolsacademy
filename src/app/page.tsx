import React from "react"

import { getMetadata } from "@/lib/metadata"

import Hero from "@/components/Hero"
import FeaturedPosts from "@/components/FeaturedPosts"
import Testimonial from "@/components/Testimonial"
import CurrentSponsors from "@/components/CurrentSponsors"

export const metadata = getMetadata({
  path: "/",
  title: "DevTools Academy",
  description: "Learn about awesome developer tools",
})

const featuredPosts = [
  {
    title: "Neon Postgres vs Supabase: Choose the Right Database for Your SaaS",
    excerpt: "Choose the right Database for your SaaS.",
    author: "Ankur Tyagi",
    image: "/images/default-og-image.png",
    slug: "neon-vs-supabase",
    url: "/blog/neon-vs-supabase",
    category: "Database",
  },
  {
    title: "Twilio vs Stream - A Guide to Building Smarter Support Bots",
    excerpt: "A Guide to Building Smarter Support Bots",
    author: "Hrutik",
    image: "/images/Twilio vs Stream.png",
    slug: "stream-vs-twilio",
    url: "/blog/stream-vs-twilio",
    category: "SaaS",
  },
  {
    title: "CodeRabbit vs Others: Which is the Right AI Code Review Tool",
    excerpt: "Choose the right AI code review tool",
    author: "Ankur Tyagi",
    image: "/images/coderabbit-vs-others.png",
    slug: "coderabbit-vs-others-ai-code-review-tools",
    url: "/blog/coderabbit-vs-others-ai-code-review-tools",
    category: "Code Review",
    isNew: true,
  },
]

export default function Home() {
  return (
    <main>
      <Hero />
      <CurrentSponsors />
      <hr className="border-dashed border-neutral-100/15" />
      {featuredPosts.length > 0 && <FeaturedPosts posts={featuredPosts} />}
      <hr className="border-dashed border-neutral-100/15" />
      <Testimonial />
    </main>
  )
}
