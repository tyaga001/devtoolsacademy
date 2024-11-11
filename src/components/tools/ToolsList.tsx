'use client'

import { Tool } from "@/app/tools/data"
import { ToolCard } from "./ToolCard"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"

interface ToolsListProps {
  tools: Tool[]
  currentPage: number
}

export function ToolsList({ tools, currentPage }: ToolsListProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const itemsPerPage = 9

  // Calculate pagination
  const totalPages = Math.ceil(tools.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedTools = tools.slice(startIndex, startIndex + itemsPerPage)

  // Create URL for pagination
  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  return (
    <div className="space-y-8">
      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedTools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            asChild
            disabled={currentPage <= 1}
          >
            <Link href={createPageURL(currentPage - 1)}>
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>

          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i + 1}
              variant={currentPage === i + 1 ? "default" : "outline"}
              size="icon"
              asChild
            >
              <Link href={createPageURL(i + 1)}>
                {i + 1}
              </Link>
            </Button>
          ))}

          <Button
            variant="outline"
            size="icon"
            asChild
            disabled={currentPage >= totalPages}
          >
            <Link href={createPageURL(currentPage + 1)}>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}