'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'

export default function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchValue, setSearchValue] = useState(searchParams.get('query') || '')

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const updateSearchQuery = useCallback((query: string) => {
    const params = new URLSearchParams(searchParams)
    const hasFilters = params.has("categories") || params.has("tags") || params.has("sort")

    if (query) {
      if (hasFilters) {
        params.delete("categories")
        params.delete("tags")
        params.delete("sort")
      }
      params.set('query', query)
    } else {
      params.delete('query')
    }

    router.push(`/tools?${params.toString()}`)
  }, [router, searchParams])

  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      updateSearchQuery(searchValue.trim())
    }, 300) // Increased debounce time for better performance

    return () => clearTimeout(debounceSearch)
  }, [searchValue, updateSearchQuery])

  // Reset search value when filters change
  useEffect(() => {
    const hasFilters = searchParams.has("categories") || searchParams.has("tags") || searchParams.has("sort")
    if (hasFilters && searchValue) {
      setSearchValue('')
    }
  }, [searchParams])

  return (
    <div className="relative flex-grow w-full">
      <input
        type="text"
        placeholder="Search tools..."
        value={searchValue}
        onChange={handleSearchChange}
        className="w-full h-12 bg-gray-800 border border-white/20 rounded-full pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200"
      />
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
    </div>
  )
}


