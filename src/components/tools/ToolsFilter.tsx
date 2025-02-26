"use client"

import React, { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Check, ChevronDown, Filter, Folder, SortAsc, Tag } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "../ui/button"
import SearchBar from "./SearchBar"

const categories = [
  "tools",
  "frontend",
  "backend",
  "api",
  "devops",
  "cloud",
  "e-commerce",
  "chat",
]
const tags = [
  "postgreSQL",
  "cloud-native",
  "NoSQL",
  "api",
  "GraphQL",
  "CMS",
  "database",
  "devops",
]

const ToolsFilter: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("categories")?.split(",").filter(Boolean) || []
  )
  const [selectedTags, setSelectedTags] = useState<string[]>(
    searchParams.get("tags")?.split(",").filter(Boolean) || []
  )
  const [selectedSort, setSelectedSort] = useState("")

  useEffect(() => {
    setSelectedCategories(
      searchParams.get("categories")?.split(",").filter(Boolean) || []
    )
    setSelectedTags(searchParams.get("tags")?.split(",").filter(Boolean) || [])
    setSelectedSort(searchParams.get("sort") || "")
  }, [searchParams])

  const updateURLWithParams = (params: URLSearchParams) => {
    params.set("page", "1")
    params.delete("query") // Remove query parameter
    router.push(`/tools?${params.toString()}`)
  }

  const updateFilters = (type: "categories" | "tags", value: string) => {
    const updateState =
      type === "categories" ? setSelectedCategories : setSelectedTags
    const currentSelection =
      type === "categories" ? selectedCategories : selectedTags

    const newSelection = currentSelection.includes(value)
      ? currentSelection.filter((item) => item !== value)
      : [...currentSelection, value]

    updateState(newSelection)

    const params = new URLSearchParams(searchParams.toString())
    if (newSelection.length > 0) {
      params.set(type, newSelection.join(","))
    } else {
      params.delete(type)
    }
    updateURLWithParams(params)
  }

  const updateSort = (sortValue: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("sort", sortValue)
    updateURLWithParams(params)
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedTags([])
    setSelectedSort("")

    const params = new URLSearchParams(window.location.search)
    params.delete("categories")
    params.delete("tags")
    params.delete("sort")

    updateURLWithParams(params)
  }

  return (
    <div className="flex w-full flex-col gap-6 pt-12 text-neutral-200 md:px-6">
      <div className="flex w-full flex-col-reverse gap-4 md:flex-row">
        <div className="flex-1">
          <SearchBar />
        </div>
        <div className="flex items-center justify-end">
          <Popover>
            <PopoverTrigger className="flex h-12 w-full items-center justify-around gap-2 rounded-l-full border border-white/20 px-2 py-1 transition-colors duration-200 hover:bg-neutral-100/10 md:w-fit md:px-4 md:py-2">
              <div className="flex items-center gap-2">
                <Filter className="size-4" />
                Filters
              </div>
              <ChevronDown className="size-4" />
            </PopoverTrigger>
            <PopoverContent className="ml-2 w-[300px] rounded border border-white/20 bg-[#141414] p-4 shadow-lg md:ml-0 md:w-[400px]">
              <div className="rounded-lg">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-neutral-200 md:text-2xl">
                    Filters
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearFilters}
                    className="rounded-full text-xs text-neutral-400 hover:text-neutral-300 md:text-sm"
                  >
                    Clear All
                  </Button>
                </div>

                <div className="flex gap-6">
                  <div className="flex-1">
                    <h3 className="mb-2 flex items-center text-sm font-semibold text-neutral-200 md:text-lg">
                      <Folder className="mr-2 size-4 md:size-5" />
                      Categories
                    </h3>
                    <div className="rounded-[10px]">
                      <div className="p-2">
                        {categories.map((category) => (
                          <div
                            key={category}
                            className={`flex w-full cursor-pointer items-center justify-between rounded px-3 py-2 text-left text-neutral-300 transition-colors duration-200 hover:bg-neutral-700`}
                            tabIndex={0}
                            role="button"
                            onKeyDown={(e) => {
                              e.key === "Enter" &&
                                updateFilters("categories", category)
                            }}
                            onClick={() =>
                              updateFilters("categories", category)
                            }
                          >
                            <span className="text-xs capitalize md:text-sm">
                              {category}
                            </span>
                            {selectedCategories.includes(category) && (
                              <Check className="size-3 md:size-4" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="mb-2 flex items-center text-sm font-semibold text-neutral-200 md:text-lg">
                      <Tag className="mr-2 size-4 md:size-5" />
                      Tags
                    </h3>
                    <div className="rounded-[10px]">
                      <div className="p-2">
                        {tags.map((tag) => (
                          <div
                            key={tag}
                            className={`flex w-full cursor-pointer items-center justify-between rounded px-3 py-2 text-left text-neutral-300 transition-colors duration-200 hover:bg-neutral-700`}
                            tabIndex={0}
                            role="button"
                            onKeyDown={(e) =>
                              e.key === "Enter" && updateFilters("tags", tag)
                            }
                            onClick={() => updateFilters("tags", tag)}
                          >
                            <span className="text-xs capitalize md:text-sm">
                              {tag}
                            </span>
                            {selectedTags.includes(tag) && (
                              <Check className="size-3 md:size-4" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger className="flex h-12 w-full items-center justify-around gap-2 rounded-r-full border border-white/20 px-2 py-1 transition-colors duration-200 hover:bg-neutral-100/10 md:w-fit md:px-4 md:py-2">
              <div className="flex items-center gap-2">
                <SortAsc className="size-4" />
                Sort By
              </div>
              <ChevronDown className="size-4" />
            </PopoverTrigger>
            <PopoverContent className="w-36 rounded border border-white/20 bg-[#141414] p-2 shadow-lg md:w-48">
              <div className="flex flex-col gap-1">
                {["recent", "popular", "alphabetical"].map((option) => (
                  <button
                    key={option}
                    className="flex items-center justify-between rounded px-3 py-2 text-left text-xs capitalize text-neutral-300 transition-colors duration-200 hover:bg-neutral-100/10 md:text-sm"
                    onClick={() => {
                      updateSort(option)
                      setSelectedSort(option)
                    }}
                  >
                    {option}
                    {selectedSort === option && (
                      <Check className="size-3 md:size-4" />
                    )}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {selectedTags.length > 0 && (
        <div className="flex flex-col gap-1">
          <div>
            <p className="m-0 p-0">Tags Selected:</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((item) => (
              <span
                key={item}
                className="flex items-center gap-2 rounded-full bg-neutral-100/10 px-3 py-1 text-sm transition-colors duration-200 hover:bg-white/20"
              >
                {item}
                <button
                  onClick={() => updateFilters("tags", item)}
                  className="transition-colors duration-200 hover:text-red-400"
                  aria-label={`Remove ${item} filter`}
                >
                  x
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
      {selectedCategories.length > 0 && (
        <div className="flex items-center gap-1">
          <p className="leading-none">Categories Selected:</p>
          <div className="flex flex-wrap items-center gap-2">
            {selectedCategories.map((item) => (
              <span
                key={item}
                className="flex items-start gap-2 rounded-full bg-neutral-800 px-3 py-1.5 text-sm leading-none transition-colors hover:bg-neutral-900"
              >
                <span className="text-sm capitalize">{item}</span>
                <button
                  onClick={() => updateFilters("categories", item)}
                  className="text-sm transition-colors hover:text-red-400"
                  aria-label={`Remove ${item} filter`}
                >
                  x
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ToolsFilter
