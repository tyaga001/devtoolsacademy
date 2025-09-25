import React, { Suspense } from "react"
import Link from "next/link"

import { getMetadata } from "@/lib/metadata"
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
    <section className="relative min-h-screen bg-[#080808]">
      {/* Hero Section */}
      <div className="relative">
        <div className="grid-background pointer-events-none absolute inset-0 -z-10 opacity-[0.08]" />
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-20 sm:py-24 md:flex-row md:items-center md:gap-16">
          <div className="flex-1 text-center md:text-left">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/60 px-4 py-1 text-xs font-medium uppercase tracking-wide text-neutral-400">
              Curated devtool roles
            </span>
            <h1 className="mb-6 text-4xl font-semibold tracking-tight text-neutral-50 sm:text-5xl md:text-6xl">
              Find your next
              <br className="hidden md:block" /> devtools move
            </h1>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-neutral-400 md:mx-0">
              Weekly drops of developer marketing, DevRel, DX, and AI platform
              roles hand-picked for founders, community builders, and product
              storytellers.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 text-sm text-neutral-400 md:flex-row md:items-center md:justify-start">
              <div className="flex items-center gap-3 rounded-lg border border-neutral-800 bg-neutral-900/60 px-4 py-3">
                <div className="text-left">
                  <p className="text-xs uppercase tracking-wide text-neutral-500">
                    Featured
                  </p>
                  <p className="text-sm font-medium text-neutral-200">
                    {""}Kilocode, Deepgram, Apple
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-neutral-800 bg-neutral-900/60 px-4 py-3">
                <div className="text-left">
                  <p className="text-xs uppercase tracking-wide text-neutral-500">
                    Updated
                  </p>
                  <p className="text-sm font-medium text-neutral-200">
                    Every Week
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-1 flex-col gap-6 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 text-left shadow-lg backdrop-blur md:max-w-sm">
            <div>
              <h2 className="text-base font-semibold text-neutral-100">
                Showcase a role in front of builders
              </h2>
              <p className="mt-2 text-sm text-neutral-400">
                Submit a devtools job and we will feature it for 45 days across
                the site, jobs feed, and ByteSizedBets newsletter.
              </p>
            </div>
            <Link
              href="/jobs/submit"
              className="inline-flex items-center justify-center rounded-lg bg-neutral-100 px-5 py-2.5 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-200"
            >
              Submit a role
            </Link>
            <p className="text-xs text-neutral-500">
              Includes newsletter mention + social amplification.
            </p>
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="mx-auto max-w-5xl px-6">
          <JobSearch searchParams={searchParamsSync} />
        </div>
      </div>

      <div className="bg-[#070707]">
        <Suspense fallback={<JobSkeleton />}>
          <JobsPage page={page} searchParams={searchParamsSync} />
        </Suspense>
      </div>

      <div className="bg-[#060606]">
        <Suspense fallback={<LoadingCategories />}>
          <JobCategories />
        </Suspense>
      </div>
    </section>
  )
}
