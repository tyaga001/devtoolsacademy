"use client"

import React, { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Search, MapPin, Briefcase, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface JobSearchProps {
  searchParams: {
    search?: string
    location?: string
    type?: string
    tags?: string
    featured?: string
  }
}

const jobTypes = [
  { value: "FULL_TIME", label: "Full Time" },
  { value: "PART_TIME", label: "Part Time" },
  { value: "CONTRACT", label: "Contract" },
  { value: "FREELANCE", label: "Freelance" },
  { value: "INTERNSHIP", label: "Internship" },
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
  const [featured, setFeatured] = useState(searchParams.featured === "true")

  useEffect(() => {
    setSearch(searchParams.search || "")
    setLocation(searchParams.location || "")
    setType(searchParams.type || "")
    setFeatured(searchParams.featured === "true")
  }, [searchParams])

  const updateURL = useCallback(() => {
    const params = new URLSearchParams()

    if (search.trim()) params.set("search", search.trim())
    if (location.trim()) params.set("location", location.trim())
    if (type) params.set("type", type)
    if (featured) params.set("featured", "true")

    params.set("page", "1") // Reset to first page

    router.push(`/jobs?${params.toString()}`)
  }, [search, location, type, featured, router])

  // Update URL when featured filter changes
  useEffect(() => {
    if (searchParams.featured !== (featured ? "true" : undefined)) {
      updateURL()
    }
  }, [featured, updateURL, searchParams.featured])

  const clearFilters = () => {
    setSearch("")
    setLocation("")
    setType("")
    setFeatured(false)
    router.push("/jobs")
  }

  const hasActiveFilters = search || location || type || featured

  return (
    <div className="mx-auto w-full max-w-6xl px-4 md:px-0">
      {/* Main Search Bar */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
          <Input
            placeholder="Search jobs, companies, or skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && updateURL()}
            className="border-neutral-700 bg-neutral-900 pl-10 text-neutral-200 placeholder:text-neutral-500"
          />
        </div>

        <div className="relative flex-1 md:max-w-xs">
          <MapPin className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
          <Input
            placeholder="Location (e.g., Remote, SF)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && updateURL()}
            className="border-neutral-700 bg-neutral-900 pl-10 text-neutral-200 placeholder:text-neutral-500"
          />
        </div>

        <Button onClick={updateURL} className="bg-blue-600 hover:bg-blue-700">
          <Search className="mr-2 size-4" />
          Search
        </Button>
      </div>

      {/* Filters Row */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-[140px] border-neutral-700 bg-neutral-900"
            >
              <Briefcase className="mr-2 size-4" />
              {type
                ? jobTypes.find((jt) => jt.value === type)?.label
                : "Job Type"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border-neutral-700 bg-neutral-900">
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

        <Button
          variant="outline"
          onClick={() => setFeatured(!featured)}
          className={
            featured
              ? "border-yellow-500/30 bg-yellow-600/20 text-yellow-400"
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
            <X className="mr-2 size-4" />
            Clear All
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {featured && (
        <div className="mb-6 flex flex-wrap gap-2">
          <Badge
            variant="secondary"
            className="border-yellow-500/30 bg-yellow-600/20 text-yellow-400"
          >
            ⭐ Featured
            <button
              onClick={() => setFeatured(false)}
              className="ml-2 hover:text-yellow-300"
            >
              <X className="size-3" />
            </button>
          </Badge>
        </div>
      )}

      {/* Quick Location Filters */}
      <div className="flex flex-wrap gap-2">
        <span className="mr-2 text-sm text-neutral-400">
          Popular locations:
        </span>
        {popularLocations.slice(0, 6).map((loc) => (
          <button
            key={loc}
            onClick={() => {
              setLocation(loc)
              updateURL()
            }}
            className="text-sm text-neutral-500 underline hover:text-neutral-300"
          >
            {loc}
          </button>
        ))}
      </div>
    </div>
  )
}

export default JobSearch
