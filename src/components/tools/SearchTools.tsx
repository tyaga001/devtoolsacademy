'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { ToolsList } from "./ToolsList"
import type { Tool } from "@/app/tools/data"
import { useDebounce } from '@/lib/hooks/use-debounce'

interface SearchToolsProps {
  initialTools: Tool[]
}

export function SearchTools({ initialTools }: SearchToolsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get the current search query and page from URL
  const query = searchParams.get('query') || ''
  const currentPage = Number(searchParams.get('page')) || 1

  // Local state for search input
  const [searchQuery, setSearchQuery] = useState(query)
  const debouncedSearch = useDebounce(searchQuery, 300)

  // Filter tools based on search query
  const filteredTools = initialTools.filter(tool =>
    tool.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    tool.description.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    tool.tags.some(tag => tag.toLowerCase().includes(debouncedSearch.toLowerCase()))
  )

  // Update URL when search query changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if (debouncedSearch) {
      params.set('query', debouncedSearch)
    } else {
      params.delete('query')
    }
    params.set('page', '1') // Reset to first page on search
    router.push(`${pathname}?${params.toString()}`)
  }, [debouncedSearch, router, pathname, searchParams])

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search developer tools..."
          className="pl-10 w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Found {filteredTools.length} tools
      </div>

      {/* Tools List */}
      <ToolsList tools={filteredTools} currentPage={currentPage} />
    </div>
  )
}