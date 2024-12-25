import React from "react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useSearchParams } from "next/navigation"

interface ToolsPaginationProps {
  totalPages: number
  basePath: string
}

export default function ToolsPagination({
  totalPages,
  basePath,
}: ToolsPaginationProps) {
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get("page") || 1)

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", pageNumber.toString())
    return `${basePath}?${params.toString()}`
  }
  console.log({ totalPages })

  const getPageNumbers = () => {
    const pages = []

    if (totalPages > 0) pages.push(1)

    const startPage = Math.max(2, currentPage - 2)
    const endPage = Math.min(totalPages, currentPage + 2)

    if (startPage > 2) pages.push(-1) // -1 represents ellipsis

    for (let i = startPage; i <= endPage; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i)
      }
    }

    if (endPage < totalPages - 1) pages.push(-2) // -2 represents another ellipsis

    if (totalPages > 1) pages.push(totalPages)

    return pages
  }

  return (
    <Pagination className="mt-6">
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            href={currentPage > 1 ? createPageUrl(currentPage - 1) : undefined}
            aria-disabled={currentPage <= 1}
            className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {/* Page Numbers */}
        {getPageNumbers().map((page, index) => {
          if (page === -1 || page === -2) {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <span className="px-2 text-neutral-500">...</span>
              </PaginationItem>
            )
          }

          return (
            <PaginationItem key={page}>
              <PaginationLink
                href={createPageUrl(page)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            href={
              currentPage < totalPages
                ? createPageUrl(currentPage + 1)
                : undefined
            }
            aria-disabled={currentPage >= totalPages}
            className={
              currentPage >= totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
