import React from "react"

import { getMetadata } from "@/lib/metadata"

import Hero from "@/components/Hero"
import FeaturedPosts from "@/components/FeaturedPosts"
import Testimonial from "@/components/Testimonial"
import CurrentSponsors from "@/components/CurrentSponsors"
import ServicesPreview from "@/components/ServicesPreview"

export const metadata = getMetadata({
  path: "/",
  title: "DevTools Academy",
  description: "Learn about awesome developer tools",
})

export default function Home() {
  return (
    <main>
      <Hero />
      <CurrentSponsors />
      <hr className="border-dashed border-neutral-100/15" />
      <ServicesPreview />
      <hr className="border-dashed border-neutral-100/15" />
      <FeaturedPosts />
      <hr className="border-dashed border-neutral-100/15" />
      <Testimonial />
    </main>
  )
}
