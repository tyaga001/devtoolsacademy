'use client'

import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { Tool } from '@/lib/types'
import ToolCard from './ToolCard'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { debounce } from 'lodash'

export const ToolsGrid = () => {
  const [tools, setTools] = useState<Tool[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'relevance' | 'stars' | 'lastUpdate'>('relevance')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTools = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tools`, {
        params: { search: searchTerm, sortBy }
      })
      setTools(response.data)
    } catch (err) {
      setError('Failed to fetch tools. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }, [searchTerm, sortBy])

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
