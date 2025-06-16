import React, { Suspense } from "react"

import { getMetadata } from "@/lib/metadata"

import ToolsPage from "@/components/tools/ToolsPage"
import Categories from "@/components/tools/Categories"
import ToolSkeleton from "@/components/tools/ToolSkeleton"
import ToolsSearchAndFilter from "@/components/tools/ToolsSearchAndFilter"
import LoadingCategories from "@/components/tools/LoadingCategories"

import CoverImage from "./cover.png"

export const metadata = getMetadata({
  path: "/tools",
  title: "Browse Tools | DevTools Academy",
  description: "Browser and compare tools, curated by DevTools Academy",
  image: CoverImage.src,
})

interface SearchParams {
  page?: string
  query?: string
}

export default async function ToolsRoute({
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

      <div className="mx-auto flex max-w-[800px] flex-col items-center px-4 pt-20 pb-12 text-center md:px-0 md:py-24">
        <h1 className="mb-6 md:mb-12 text-4xl font-bold tracking-tight sm:text-5xl md:text-5xl lg:text-6xl">
          <span className="bg-gradient-to-b from-[#141414] to-white bg-clip-text text-transparent">
            Browse Devtools for your next product
          </span>
        </h1>
        <ToolsSearchAndFilter searchParams={searchParamsSync} />
      </div>

      <Suspense fallback={<ToolSkeleton />}>
        <ToolsPage page={page} />
      </Suspense>
      <Suspense fallback={<LoadingCategories />}>
        <Categories />
      </Suspense>
    </section>
  )
}
