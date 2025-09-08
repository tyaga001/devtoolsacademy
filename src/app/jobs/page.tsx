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
    <section className="mt-[80px]">
      <hr className="border-dashed border-neutral-100/15" />

      <div className="mx-auto flex max-w-[800px] flex-col items-center px-4 py-20 text-center md:px-0 md:py-24">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-5xl lg:text-6xl">
          <span className="bg-gradient-to-b from-[#141414] to-white bg-clip-text text-transparent">
            Find Your Next Job
          </span>
        </h1>
        <p className="mb-8 max-w-xl text-base text-neutral-100 text-opacity-50 md:text-xl">
          Discover curated job opportunities from top companies in the developer
          tools space.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Link href="/jobs/submit">
            <Button className="bg-blue-600 px-6 py-3 text-lg text-white hover:bg-blue-700">
              Submit a Job • $199
            </Button>
          </Link>
          <p className="text-sm text-neutral-500">
            Job post is featured for 60 days
          </p>
        </div>
      </div>

      <hr className="border-dashed border-neutral-100/15" />

      <div className="mb-8 flex w-full flex-col items-center space-y-4">
        <JobSearch searchParams={searchParamsSync} />
      </div>

      <Suspense fallback={<JobSkeleton />}>
        <JobsPage page={page} searchParams={searchParamsSync} />
      </Suspense>

      <Suspense fallback={<LoadingCategories />}>
        <JobCategories />
      </Suspense>
    </section>
  )
}
