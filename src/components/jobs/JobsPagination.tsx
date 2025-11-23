"use client"

import React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface JobsPaginationProps {
  totalPages: number
  basePath: string
}

export default function JobsPagination({
  totalPages,
  basePath,
}: JobsPaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentPage = parseInt(searchParams.get("page") || "1", 10)

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", pageNumber.toString())
    return `${basePath}?${params.toString()}`
  }

  const goToPage = (pageNumber: number) => {
    router.push(createPageURL(pageNumber))
  }

  if (totalPages <= 1) return null

  const renderPageNumbers = () => {
    const pages = []
    const showEllipsis = totalPages > 7

    if (!showEllipsis) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <Button
            key={i}
            variant={currentPage === i ? "default" : "outline"}
            size="sm"
            onClick={() => goToPage(i)}
            className={
              currentPage === i
                ? "bg-neutral-200 text-neutral-900 hover:bg-neutral-300"
                : "border-neutral-600 bg-transparent text-neutral-300 hover:bg-neutral-800 hover:text-neutral-200"
            }
          >
            {i}
          </Button>
        )
      }
    } else {
      // Show ellipsis for many pages
      pages.push(
        <Button
          key={1}
          variant={currentPage === 1 ? "default" : "outline"}
          size="sm"
          onClick={() => goToPage(1)}
          className={
            currentPage === 1
              ? "bg-neutral-200 text-neutral-900 hover:bg-neutral-300"
              : "border-neutral-600 bg-transparent text-neutral-300 hover:bg-neutral-800 hover:text-neutral-200"
          }
        >
          1
        </Button>
      )

      if (currentPage > 3) {
        pages.push(
          <span key="ellipsis1" className="px-2 text-neutral-500">
            ...
          </span>
        )
      }

      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        pages.push(
          <Button
            key={i}
            variant={currentPage === i ? "default" : "outline"}
            size="sm"
            onClick={() => goToPage(i)}
            className={
              currentPage === i
                ? "bg-neutral-200 text-neutral-900 hover:bg-neutral-300"
                : "border-neutral-600 bg-transparent text-neutral-300 hover:bg-neutral-800 hover:text-neutral-200"
            }
          >
            {i}
          </Button>
        )
      }

      if (currentPage < totalPages - 2) {
        pages.push(
          <span key="ellipsis2" className="px-2 text-neutral-500">
            ...
          </span>
        )
      }

      pages.push(
        <Button
          key={totalPages}
          variant={currentPage === totalPages ? "default" : "outline"}
          size="sm"
          onClick={() => goToPage(totalPages)}
          className={
            currentPage === totalPages
              ? "bg-neutral-200 text-neutral-900 hover:bg-neutral-300"
              : "border-neutral-600 bg-transparent text-neutral-300 hover:bg-neutral-800 hover:text-neutral-200"
          }
        >
          {totalPages}
        </Button>
      )
    }

    return pages
  }

  return (
    <div className="flex items-center justify-center space-x-2 py-8">
      <Button
        variant="outline"
        size="sm"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className="border-neutral-600 bg-transparent text-neutral-300 hover:bg-neutral-800 hover:text-neutral-200 disabled:opacity-50"
      >
        <ChevronLeft className="size-4" />
        Previous
      </Button>

      <div className="flex items-center space-x-1">{renderPageNumbers()}</div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="border-neutral-600 bg-transparent text-neutral-300 hover:bg-neutral-800 hover:text-neutral-200 disabled:opacity-50"
      >
        Next
        <ChevronRight className="size-4" />
      </Button>
    </div>
  )
}
