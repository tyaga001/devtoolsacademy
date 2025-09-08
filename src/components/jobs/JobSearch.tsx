"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, MapPin, Briefcase, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

interface JobSearchProps {
  searchParams: {
    search?: string
    location?: string
    type?: string
    categories?: string
    tags?: string
    featured?: string
    sort?: string
  }
}

const jobTypes = [
  { value: "FULL_TIME", label: "Full Time" },
  { value: "PART_TIME", label: "Part Time" },
  { value: "CONTRACT", label: "Contract" },
  { value: "FREELANCE", label: "Freelance" },
  { value: "INTERNSHIP", label: "Internship" },
]

const sortOptions = [
  { value: "random", label: "Random Order" },
  { value: "recent", label: "Most Recent" },
  { value: "salary", label: "Highest Salary" },
  { value: "company", label: "Company A-Z" },
  { value: "featured", label: "Featured First" },
]

const popularCategories = [
  "DevRel",
  "Developer Advocate",
  "Frontend",
  "Backend",
  "Full Stack",
  "DevOps",
  "Product",
  "Engineering Manager",
]

const popularLocations = [
  "Remote",
  "San Francisco",
  "New York",
  "London",
  "Berlin",
  "Toronto",
  "Austin",
  "Seattle",
]

const JobSearch: React.FC<JobSearchProps> = ({ searchParams }) => {
  const router = useRouter()
  // const urlSearchParams = useSearchParams() // TODO: Use if needed

  const [search, setSearch] = useState(searchParams.search || "")
  const [location, setLocation] = useState(searchParams.location || "")
  const [type, setType] = useState(searchParams.type || "")
  const [sort, setSort] = useState(searchParams.sort || "random")
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.categories?.split(",").filter(Boolean) || []
  )
  const [featured, setFeatured] = useState(searchParams.featured === "true")

  useEffect(() => {
    setSearch(searchParams.search || "")
    setLocation(searchParams.location || "")
    setType(searchParams.type || "")
    setSort(searchParams.sort || "random")
    setSelectedCategories(
      searchParams.categories?.split(",").filter(Boolean) || []
    )
    setFeatured(searchParams.featured === "true")
  }, [searchParams])

  const updateURL = () => {
    const params = new URLSearchParams()

    if (search.trim()) params.set("search", search.trim())
    if (location.trim()) params.set("location", location.trim())
    if (type) params.set("type", type)
    if (selectedCategories.length > 0) {
      params.set("categories", selectedCategories.join(","))
    }
    if (featured) params.set("featured", "true")
    if (sort !== "random") params.set("sort", sort)

    params.set("page", "1") // Reset to first page

    router.push(`/jobs?${params.toString()}`)
  }

  const clearFilters = () => {
    setSearch("")
    setLocation("")
    setType("")
    setSelectedCategories([])
    setFeatured(false)
    setSort("random")
    router.push("/jobs")
  }

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    )
  }

  const hasActiveFilters =
    search ||
    location ||
    type ||
    selectedCategories.length > 0 ||
    featured ||
    sort !== "random"

  return (
    <div className="mx-auto w-full max-w-6xl px-4 md:px-0">
      {/* Main Search Bar */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <Input
            placeholder="Search jobs, companies, or skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && updateURL()}
            className="pl-10 bg-neutral-900 border-neutral-700 text-neutral-200 placeholder:text-neutral-500"
          />
        </div>

        <div className="relative flex-1 md:max-w-xs">
          <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <Input
            placeholder="Location (e.g., Remote, SF)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && updateURL()}
            className="pl-10 bg-neutral-900 border-neutral-700 text-neutral-200 placeholder:text-neutral-500"
          />
        </div>

        <Button onClick={updateURL} className="bg-blue-600 hover:bg-blue-700">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-[140px] bg-neutral-900 border-neutral-700"
            >
              <Briefcase className="h-4 w-4 mr-2" />
              {type
                ? jobTypes.find((jt) => jt.value === type)?.label
                : "Job Type"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-neutral-900 border-neutral-700">
            <DropdownMenuItem onClick={() => setType("")}>
              All Types
            </DropdownMenuItem>
            {jobTypes.map((jobType) => (
              <DropdownMenuItem
                key={jobType.value}
                onClick={() => setType(jobType.value)}
              >
                {jobType.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="border-neutral-700">
              <Filter className="h-4 w-4 mr-2" />
              Categories
              {selectedCategories.length > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-2 bg-blue-600 text-white"
                >
                  {selectedCategories.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 bg-neutral-900 border-neutral-700">
            <div className="space-y-3">
              <h4 className="font-medium text-neutral-200">Job Categories</h4>
              <div className="flex flex-wrap gap-2">
                {popularCategories.map((category) => (
                  <Button
                    key={category}
                    variant={
                      selectedCategories.includes(category)
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    onClick={() => toggleCategory(category)}
                    className={
                      selectedCategories.includes(category)
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "border-neutral-600 hover:bg-neutral-800"
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-[140px] bg-neutral-900 border-neutral-700"
            >
              {sortOptions.find((opt) => opt.value === sort)?.label || "Sort"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-neutral-900 border-neutral-700">
            {sortOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => setSort(option.value)}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outline"
          onClick={() => setFeatured(!featured)}
          className={
            featured
              ? "bg-yellow-600/20 border-yellow-500/30 text-yellow-400"
              : "border-neutral-700"
          }
        >
          ⭐ Featured
        </Button>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={clearFilters}
            className="text-neutral-400 hover:text-neutral-200"
          >
            <X className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {(selectedCategories.length > 0 || featured) && (
        <div className="flex flex-wrap gap-2 mb-6">
          {selectedCategories.map((category) => (
            <Badge
              key={category}
              variant="secondary"
              className="bg-blue-600/20 text-blue-400 border-blue-500/30"
            >
              {category}
              <button
                onClick={() => toggleCategory(category)}
                className="ml-2 hover:text-blue-300"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Quick Location Filters */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-neutral-400 mr-2">
          Popular locations:
        </span>
        {popularLocations.slice(0, 6).map((loc) => (
          <button
            key={loc}
            onClick={() => {
              setLocation(loc)
              updateURL()
            }}
            className="text-sm text-neutral-500 hover:text-neutral-300 underline"
          >
            {loc}
          </button>
        ))}
      </div>
    </div>
  )
}

export default JobSearch
