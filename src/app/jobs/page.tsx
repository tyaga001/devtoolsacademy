import React, { Suspense } from "react"
import Link from "next/link"

import { getMetadata } from "@/lib/metadata"
import { Button } from "@/components/ui/button"

import JobsPage from "@/components/jobs/JobsPage"
import JobCategories from "@/components/jobs/JobCategories"
import JobSkeleton from "@/components/jobs/JobSkeleton"
import JobSearch from "@/components/jobs/JobSearch"
import LoadingCategories from "@/components/jobs/LoadingCategories"

import CoverImage from "./cover.png"

export const metadata = getMetadata({
  path: "/jobs",
  title: "Developer Jobs | DevTools Academy",
  description:
    "Find your next developer job. Browse curated opportunities from top companies in the developer tools space.",
  image: CoverImage.src,
})

interface SearchParams {
  page?: string
  search?: string
  categories?: string
  tags?: string
  location?: string
  type?: string
  featured?: string
  sort?: string
}

export default async function JobsRoute({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const searchParamsSync = await searchParams
  const pageNumber = Number(searchParamsSync?.page) || 1
  const page = Math.max(1, Math.floor(pageNumber))

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#111111] to-[#0A0A0A]">
      {/* Hero Section */}
      <div className="relative pb-20 pt-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="mb-6 text-5xl font-light tracking-tight text-white sm:text-6xl lg:text-7xl">
            Premium Developer
            <span className="block font-extralight text-neutral-400">
              Opportunities
            </span>
          </h1>
          <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-neutral-300">
            Vetted opportunities for exceptional professionals.
          </p>

          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
            <Link href="/jobs/submit">
              <Button className="group relative overflow-hidden bg-white px-8 py-4 text-base font-medium text-black transition-all duration-300 hover:bg-neutral-100 hover:shadow-lg">
                <span className="relative z-10">Submit Position</span>
                <span className="ml-2 text-sm font-light text-neutral-600">
                  $199
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-neutral-50 to-neutral-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Button>
            </Link>
            <p className="text-sm text-neutral-500">
              60-day featured placement included
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-auto max-w-6xl">
        <div className="h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />
      </div>

      {/* Search Section */}
      <div className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <JobSearch searchParams={searchParamsSync} />
        </div>
      </div>

      {/* Jobs List */}
      <div className="bg-[#0A0A0A]">
        <Suspense fallback={<JobSkeleton />}>
          <JobsPage page={page} searchParams={searchParamsSync} />
        </Suspense>
      </div>

      {/* Categories */}
      <div className="bg-[#111111]">
        <Suspense fallback={<LoadingCategories />}>
          <JobCategories />
        </Suspense>
      </div>
    </section>
  )
}
