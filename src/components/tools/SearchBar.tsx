"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"

export default function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchValue, setSearchValue] = React.useState(
    searchParams.get("query") || ""
  )

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const updateSearchQuery = React.useCallback(
    (query: string) => {
      const params = new URLSearchParams(searchParams)
      const hasFilters =
        params.has("categories") || params.has("tags") || params.has("sort")

      if (query) {
        if (hasFilters) {
          params.delete("categories")
          params.delete("tags")
          params.delete("sort")
        }
        params.set("query", query)
      } else {
        params.delete("query")
      }

      router.push(`/tools?${params.toString()}`)
    },
    [router, searchParams]
  )

  React.useEffect(() => {
    const debounceSearch = setTimeout(() => {
      updateSearchQuery(searchValue.trim())
    }, 300) // Increased debounce time for better performance

    return () => clearTimeout(debounceSearch)
  }, [searchValue, updateSearchQuery])

  // Reset search value when filters change
  React.useEffect(() => {
    const hasFilters =
      searchParams.has("categories") ||
      searchParams.has("tags") ||
      searchParams.has("sort")
    if (hasFilters && searchValue) {
      setSearchValue("")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  return (
    <div className="relative w-full grow">
      <input
        type="text"
        placeholder="Search tools..."
        value={searchValue}
        onChange={handleSearchChange}
        className="w-full bg-neutral-900 py-3 pl-12 pr-4 outline-none transition-all duration-200 focus:border-solid"
      />
      <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-neutral-400" />
    </div>
  )
}
