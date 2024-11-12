'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import { Tool } from '@/lib/types'
import ToolCard from './ToolCard'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { debounce } from 'lodash'
import { ToolsFilter } from './ToolsFilter'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'

export function ToolsGrid() {
  const [tools, setTools] = useState<Tool[]>([])
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
          //@ts-ignore
          params.categories.includes(tool.category)
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
          className="w-full"
        />
        <div className="flex flex-wrap gap-4">
          <Select onValueChange={handleSortChange} value={sortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="stars">GitHub Stars</SelectItem>
              <SelectItem value="lastUpdate">Last Update</SelectItem>
            </SelectContent>
          </Select>
          <ToolsFilter />
          <Button onClick={handleClearFilters} variant="outline">Clear Filters</Button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}

      {tools.length === 0 && !isLoading && (
        <div className="text-center text-gray-500">No tools found. Try adjusting your search or filters.</div>
      )}
    </div>
  )
}
