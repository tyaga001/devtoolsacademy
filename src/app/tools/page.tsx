import React, { Suspense } from "react"

import { getMetadata } from "@/lib/metadata"

import ToolsPage from "@/components/tools/ToolsPage"
import Categories from "@/components/tools/Categories"
import ToolSkeleton from "@/components/tools/ToolSkeleton"
import AlgoliaSearch from "@/components/tools/AlgoliaSearch"
import LoadingCategories from "@/components/tools/LoadingCategories"

export const metadata = getMetadata({
  path: "/tools",
  title: "Browse Tools | DevTools Academy",
  description: "Browser and compare tools, curated by DevTools Academy",
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
    <>
      <div className="mx-auto flex max-w-[800px] flex-col items-center pt-36 text-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-5xl lg:text-6xl">
          <span className="bg-gradient-to-b from-[#141414] to-white bg-clip-text text-transparent">
            Browse Devtools for your next product
          </span>
        </h1>
        <p className="mb-8 max-w-xl text-base text-neutral-100 text-opacity-50 sm:text-xl">
          Discover new devtools from a well researched collection for hassle{" "}
          free development of your next product
        </p>
      </div>
      <div className="mb-8 flex w-full flex-col items-center space-y-4">
        <AlgoliaSearch searchParams={searchParams} />
      </div>
      <Suspense fallback={<ToolSkeleton />}>
        <ToolsPage page={page} />
      </Suspense>
      <Suspense fallback={<LoadingCategories />}>
        <Categories />
      </Suspense>
    </>
  )
}
