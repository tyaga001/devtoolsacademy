"use client"

import React, { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Check, ChevronDown, Filter, SortAsc, X } from "lucide-react"
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
    <div className="mt-12 flex w-full flex-col border border-dashed border-neutral-100/15 text-neutral-200">
      <div className="flex w-full flex-col-reverse md:flex-row">
        <div className="flex-1">
          <SearchBar />
        </div>
        <div className="flex items-center justify-end">
          <Popover>
            <PopoverTrigger className="flex w-full items-center justify-around gap-2 border-x border-dashed border-neutral-100/15 bg-neutral-900 px-2 py-1 transition-colors duration-200 hover:bg-neutral-100/10 md:w-fit md:px-4 md:py-3">
              <div className="flex items-center gap-2">
                <Filter className="size-4" />
                Filters
              </div>
              <ChevronDown className="size-4" />
            </PopoverTrigger>
            <PopoverContent className="ml-2 w-[300px] rounded-none border border-dashed border-neutral-100/15 bg-[#141414] p-4 shadow-lg md:ml-0 md:w-[400px]">
              <div className="rounded-lg">
                <div className="mb-4 flex gap-6">
                  <div className="flex-1">
                    <h3 className="mb-2 flex items-center text-sm font-semibold text-neutral-200 md:text-lg">
                      Categories
                    </h3>
                    {categories.map((category) => (
                      <div
                        key={category}
                        className={`flex w-full cursor-pointer items-center justify-between border border-dashed border-transparent px-3 py-2 text-left text-neutral-300 transition-colors duration-200 hover:border-neutral-100/15`}
                        tabIndex={0}
                        role="button"
                        onKeyDown={(e) => {
                          e.key === "Enter" &&
                            updateFilters("categories", category)
                        }}
                        onClick={() => updateFilters("categories", category)}
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

                  <div className="flex-1">
                    <h3 className="mb-2 flex items-center text-sm font-semibold text-neutral-200 md:text-lg">
                      Tags
                    </h3>
                    {tags.map((tag) => (
                      <div
                        key={tag}
                        className={`flex w-full cursor-pointer items-center justify-between border border-dashed border-transparent px-3 py-2 text-left text-neutral-300 transition-colors duration-200 hover:border-neutral-100/15`}
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
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="w-full border border-dashed border-neutral-100/15 bg-neutral-800 text-xs text-neutral-200 md:text-sm"
                >
                  Clear All
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger className="flex w-full items-center justify-around gap-2 bg-neutral-900 px-2 py-1 transition-colors duration-200 hover:bg-neutral-100/10 md:w-fit md:px-4 md:py-3">
              <div className="flex items-center gap-2">
                <SortAsc className="size-4" />
                Sort By
              </div>
              <ChevronDown className="size-4" />
            </PopoverTrigger>
            <PopoverContent className="w-36 rounded-none border border-dashed border-neutral-100/15 bg-[#141414] p-0 shadow-lg md:w-48">
              <div className="flex flex-col">
                {["recent", "popular", "alphabetical"].map((option) => (
                  <button
                    key={option}
                    className="flex items-center justify-between p-3 text-left text-xs capitalize text-neutral-300 transition-colors duration-200 hover:bg-neutral-100/10 md:text-sm"
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
        <>
          <hr className="border-dashed border-neutral-100/15" />
          <div className="flex items-center gap-1 p-3">
            <p className="font-semibold leading-none">Tags Selected:</p>
            <div className="flex flex-wrap items-center gap-2">
              {selectedTags.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-2 rounded-full bg-neutral-800 p-2 transition-colors hover:bg-neutral-900"
                >
                  <span className="pl-1.5 text-sm capitalize leading-none">
                    {item}
                  </span>
                  <button
                    onClick={() => updateFilters("tags", item)}
                    className="text-sm transition-colors hover:text-red-400"
                    aria-label={`Remove ${item} filter`}
                  >
                    <X className="size-4" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </>
      )}
      {selectedCategories.length > 0 && (
        <>
          <hr className="border-dashed border-neutral-100/15" />
          <div className="flex items-center gap-1 p-3">
            <p className="font-semibold leading-none">Categories Selected:</p>
            <div className="flex flex-wrap items-center gap-2">
              {selectedCategories.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-2 rounded-full bg-neutral-800 p-2 transition-colors hover:bg-neutral-900"
                >
                  <span className="pl-1.5 text-sm capitalize leading-none">
                    {item}
                  </span>
                  <button
                    onClick={() => updateFilters("categories", item)}
                    className="text-sm transition-colors hover:text-red-400"
                    aria-label={`Remove ${item} filter`}
                  >
                    <X className="size-4" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ToolsFilter
