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
    <div className="similar-tools pt-6">
      <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
        Similar Tools
      </h3>
      <div className="mt-8 flex flex-col gap-12">
        {similarTagTools && similarTagTools.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold tracking-tight">
              Based on Tags
            </h3>
            <div className="grid grid-cols-1 pt-4 md:grid-cols-2 lg:grid-cols-4">
              {similarTagTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        )}
        {similarCategoriesTools && similarCategoriesTools.length > 0 && (
          <div className="mt-8 md:mt-0">
            <h3 className="text-xl font-semibold tracking-tight">
              Based on Categories
            </h3>
            <div className="grid grid-cols-1 pt-4 md:grid-cols-2 lg:grid-cols-4">
              {similarCategoriesTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SimilarTools
