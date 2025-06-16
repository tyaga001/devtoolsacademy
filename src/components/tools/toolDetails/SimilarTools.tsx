"use client"

import React, { useState, useEffect, useMemo } from "react"
import { ToolCardInterface } from "@/lib/types"
import axios from "axios"
import ToolCard from "../ToolCard"
import ToolSkeleton from "../ToolSkeleton"

interface SimilarToolsProps {
  slug: string
  tags: string[]
  categories: string[]
}

const SimilarTools: React.FC<SimilarToolsProps> = ({
  slug,
  tags,
  categories,
}) => {
  const [similarTagTools, setSimilarTagTools] = useState<ToolCardInterface[]>(
    []
  )
  const [similarCategoriesTools, setSimilarCategoriesTools] = useState<
    ToolCardInterface[]
  >([])
  const [isLoading, setIsLoading] = useState(true)
  const memoizedTags = useMemo(() => tags, [tags])
  const memoizedCategories = useMemo(() => categories, [categories])

  useEffect(() => {
    const fetchSimilarTools = async () => {
      try {
        const response = await axios.post("/api/tools/similar", {
          slug,
          tags,
          categories,
        })

        const data = response.data
        setSimilarTagTools(data.similarTagTools || [])
        setSimilarCategoriesTools(data.similarCategoriesTools || [])
      } catch (error) {
        console.error("Error fetching similar tools:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSimilarTools()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, memoizedTags, memoizedCategories])

  if (isLoading) {
    return (
      <div className="mt-8 flex flex-col gap-4">
        <div className=" h-6 w-48 animate-pulse rounded-xl bg-[#141414] pt-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(3)].map((_, index) => (
            <ToolSkeleton key={index} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      {similarTagTools && similarTagTools.length > 0 && (
        <section className="p-8">
          <h3 className="mb-6 text-center text-2xl font-bold tracking-tight">
            Similar Tools (based on Tags)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {similarTagTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>
      )}

      <hr className="border-dashed border-neutral-100/15" />

      {similarCategoriesTools && similarCategoriesTools.length > 0 && (
        <section className="p-8">
          <h3 className="mb-6 text-center text-2xl font-bold tracking-tight">
            Similar Tools (based on Categories)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {similarCategoriesTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>
      )}
    </>
  )
}

export default SimilarTools
