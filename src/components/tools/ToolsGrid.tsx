'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import axios from 'axios'
import { debounce } from 'lodash'

import { Tool } from '@/lib/types'
import ToolCard from './ToolCard'
import { List, Grid2x2 } from 'lucide-react'
import { ToolSkeletonLoader } from './ToolSkeletonLoader'
import { NoToolFound } from './NoToolFound'
import { ToolsFilter } from './ToolsFilter'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '../ui/button'
import { Input } from '@/components/ui/input'

export function ToolsGrid() {
  const [tools, setTools] = useState<Tool[]>([])
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'relevance' | 'stars' | 'lastUpdate'>('relevance')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  const fetchTools = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const params = {
        search: searchTerm,
        sortBy,
        tags: searchParams.getAll('tags'),
        categories: searchParams.getAll('categories'),
        licenses: searchParams.getAll('licenses')
      }

      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tools`, {
        params
      })

      // Filter tools based on URL parameters if API doesn't support filtering
      let filteredTools = response.data

      if (params.tags.length > 0) {
        filteredTools = filteredTools.filter((tool: Tool) =>
          params.tags.some(tag => tool.tags.includes(tag))
        )
      }

      if (params.categories.length > 0) {
        filteredTools = filteredTools.filter((tool: Tool) =>
          params.categories.some(category => tool.category.includes(category))
        )
      }

      if (params.licenses.length > 0) {
        filteredTools = filteredTools.filter((tool: Tool) =>
          params.licenses.includes(tool.license)
        )
      }

      setTools(filteredTools)
    } catch (err) {
      setError('Failed to fetch tools. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }, [searchTerm, sortBy, searchParams])

  useEffect(() => {
    fetchTools()
  }, [fetchTools])

  const debouncedSearch = debounce((term: string) => {
    setSearchTerm(term)
  }, 300)

  const toggleViewType = () => {
    setViewType(viewType === "grid" ? "list" : "grid");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value)
  }

  const handleSortChange = (value: string) => {
    setSortBy(value as 'relevance' | 'stars' | 'lastUpdate')
  }


  const handleClearFilters = () => {
    setSortBy('relevance')
    const params = new URLSearchParams()
    router.push('?' + params.toString())
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 space-y-4">
        <Input
          type="search"
          placeholder="Search tools..."
          onChange={handleSearchChange}
          className="w-full rounded border-gray-500"
        />
        <div className="flex flex-wrap gap-4">
          <Select onValueChange={handleSortChange} value={sortBy}>
            <SelectTrigger className="w-[180px] rounded border-gray-500">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-black rounded p-0 border-gray-500">
              <SelectItem value="relevance" className="cursor-pointer">
                Relevance
              </SelectItem>
              <SelectItem value="stars" className="cursor-pointer">
                GitHub Stars
              </SelectItem>
              <SelectItem value="lastUpdate" className="cursor-pointer">
                Last Update
              </SelectItem>
            </SelectContent>
          </Select>
          <ToolsFilter />
          <Button onClick={handleClearFilters} className='border-gray-500 rounded' variant="outline">Clear Filters</Button>
          <Button onClick={toggleViewType} variant="outline" className="rounded ml-auto hidden md:block border-gray-500" aria-label={`Switch to ${viewType === "grid" ? "list" : "grid"} view`}>
            {viewType === "grid" ? (
              <List className="h-4 w-4" />
            ) : (
              <Grid2x2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {isLoading ? (
        <ToolSkeletonLoader viewType={viewType} />
      ) : (
        <div
          className={`
          ${viewType === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
              : "space-y-5"
            }
        `}
        >
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}

      {tools.length === 0 && !isLoading && <NoToolFound />}
    </div>)
}
