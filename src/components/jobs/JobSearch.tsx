"use client"

import React, { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Search, MapPin, Briefcase, X, Star } from "lucide-react"
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

    params.set("page", "1")

    router.push(`/jobs?${params.toString()}`)
  }, [search, location, type, featured, router])

  const clearFilters = () => {
    setSearch("")
    setLocation("")
    setType("")
    setFeatured(false)
    router.push("/jobs")
  }

  const hasActiveFilters = search || location || type || featured

  return (
    <div className="mx-auto w-full max-w-6xl border border-dashed border-neutral-100/15 bg-neutral-900/40 px-4 py-6 shadow-lg backdrop-blur md:px-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-500" />
          <Input
            placeholder="Search jobs, companies, or skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && updateURL()}
            className="rounded-none border-dashed border-neutral-100/15 bg-neutral-950/70 pl-10 text-neutral-200 placeholder:text-neutral-500 focus:border-neutral-700"
          />
        </div>

        <div className="relative flex-1 md:max-w-xs">
          <MapPin className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-500" />
          <Input
            placeholder="Location (e.g., Remote, SF)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && updateURL()}
            className="rounded-none border-dashed border-neutral-100/15 bg-neutral-950/70 pl-10 text-neutral-200 placeholder:text-neutral-500 focus:border-neutral-700"
          />
        </div>

        <Button
          onClick={updateURL}
          className="bg-neutral-100 px-6 text-neutral-900 hover:bg-neutral-200"
        >
          <Search className="mr-2 size-4" />
          Search
        </Button>
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="min-w-[150px] rounded-full border-neutral-900 bg-neutral-950/70 px-4 py-2 text-sm font-medium text-neutral-200 hover:border-neutral-800 hover:bg-neutral-900"
              >
                <Briefcase className="mr-2 size-4" />
                {type
                  ? jobTypes.find((jt) => jt.value === type)?.label
                  : "Job Type"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-neutral-800 bg-neutral-900 text-neutral-200">
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
            variant="ghost"
            onClick={() => setFeatured(!featured)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              featured
                ? "border-amber-500/40 bg-amber-500/15 text-amber-300 hover:bg-amber-500/20"
                : "border-neutral-900 bg-neutral-950/70 text-neutral-300 hover:border-neutral-800 hover:bg-neutral-900"
            }`}
          >
            <Star className="mr-2 size-4" />
            Featured
          </Button>
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={clearFilters}
            className="rounded-full border border-neutral-900 bg-neutral-950/60 px-4 py-2 text-sm text-neutral-400 hover:border-neutral-800 hover:bg-neutral-900 hover:text-neutral-100"
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
            className="rounded-full border-amber-500/30 bg-amber-500/15 text-amber-300"
          >
            <Star className="mr-1.5 size-3" />
            Featured
            <button
              onClick={() => setFeatured(false)}
              className="ml-2 hover:text-amber-200"
            >
              <X className="size-3" />
            </button>
          </Badge>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500">
        <span className="mr-1 uppercase tracking-wide text-neutral-500">
          Popular:
        </span>
        {popularLocations.slice(0, 6).map((loc) => (
          <button
            key={loc}
            onClick={() => {
              setLocation(loc)
              updateURL()
            }}
            className="rounded-full border border-neutral-900 bg-neutral-950/60 px-3 py-1 text-xs text-neutral-300 transition hover:border-neutral-800 hover:bg-neutral-900"
          >
            {loc}
          </button>
        ))}
      </div>
    </div>
  )
}

export default JobSearch
