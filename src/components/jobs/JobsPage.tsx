"use client"

import * as React from "react"
import axios from "axios"
import { JobCardInterface } from "@/lib/types"
import JobCard from "./JobCard"
import JobsPagination from "./JobsPagination"
import JobSkeleton from "./JobSkeleton"
import {
  ArrowUpRight,
  Briefcase,
  Calendar,
  Compass,
  TriangleAlert,
} from "lucide-react"

interface JobsPageProps {
  page: number
  searchParams: {
    search?: string
    categories?: string
    tags?: string
    location?: string
    type?: string
    featured?: string
    sort?: string
  }
}

const JobsPage: React.FC<JobsPageProps> = ({
  page,
  searchParams: propsSearchParams,
}) => {
  const searchParams = propsSearchParams

  const [jobs, setJobs] = React.useState<JobCardInterface[]>([])
  const [totalPages, setTotalPages] = React.useState(1)
  const [totalJobs, setTotalJobs] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true)
      setError(null)

      const search = searchParams.search
      const categories = searchParams.categories
      const tags = searchParams.tags
      const location = searchParams.location
      const type = searchParams.type
      const featured = searchParams.featured
      const sort = searchParams.sort

      try {
        const params = new URLSearchParams()
        params.set("page", page.toString())
        if (search) params.set("search", search)
        if (categories) params.set("categories", categories)
        if (tags) params.set("tags", tags)
        if (location) params.set("location", location)
        if (type) params.set("type", type)
        if (featured) params.set("featured", featured)
        if (sort) params.set("sort", sort)

        const response = await axios.get(`/api/jobs?${params.toString()}`)

        const jobsWithDates = response.data.jobs.map((job: any) => ({
          ...job,
          createdAt: new Date(job.createdAt),
          expiresAt: new Date(job.expiresAt),
        }))

        setJobs(jobsWithDates)
        setTotalPages(response.data.totalPages)
        setTotalJobs(response.data.totalJobs)

        if (jobsWithDates.length === 0) {
          setError("No jobs found matching your criteria.")
        }
      } catch (err) {
        console.error("Error fetching jobs:", err)
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          setError("No jobs found matching your criteria.")
        } else {
          setError("Failed to fetch jobs. Please try again later.")
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchJobs()
  }, [page, searchParams])

  if (isLoading) {
    return (
      <section className="mx-auto mb-24 flex max-w-6xl flex-col gap-8 px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <JobSkeleton key={index} />
          ))}
        </div>
      </section>
    )
  }

  if (error || jobs.length === 0) {
    return (
      <div className="mx-auto mb-10 flex min-h-[320px] max-w-4xl flex-col items-center justify-center border border-dashed border-neutral-100/15 p-12 text-center">
        <div className="flex size-16 items-center justify-center rounded-full border border-dashed border-neutral-100/15 bg-neutral-900/60">
          <TriangleAlert className="size-6 text-amber-400" />
        </div>
        <h2 className="mt-6 text-2xl font-semibold text-neutral-100">
          No matches yet
        </h2>
        <p className="mt-1.5 max-w-[380px] text-sm text-neutral-400">
          Adjust filters or explore featured roles below.
          <span className="block">
            We refresh this board every week with new devtool marketing, DX, and
            community openings.
          </span>
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-neutral-400">
          <div className="flex items-center gap-2 rounded-full border border-dashed border-neutral-100/15 bg-neutral-900/60 px-4 py-2">
            <Compass className="size-4 text-neutral-500" />
            <span>Try a broader location</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-dashed border-neutral-100/15 bg-neutral-900/60 px-4 py-2">
            <Briefcase className="size-4 text-neutral-500" />
            <span>Clear job type filters</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-dashed border-neutral-100/15 bg-neutral-900/60 px-4 py-2">
            <ArrowUpRight className="size-4 text-neutral-500" />
            <span>Submit a role instead</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className="mx-auto mb-24 flex w-full max-w-6xl flex-col gap-10 px-6">
      <div className="flex flex-col justify-between gap-4 text-sm text-neutral-400 md:flex-row md:items-center">
        <p>
          Showing
          <span className="pl-2 font-medium text-neutral-200">
            {jobs.length}
          </span>
          <span className="px-1">of</span>
          <span className="font-medium text-neutral-200">{totalJobs}</span>
          <span className="pl-1">{totalJobs === 1 ? "role" : "roles"}</span>
        </p>
        <div className="flex items-center gap-3 rounded-full border border-neutral-900 bg-neutral-900/50 px-4 py-2 text-xs text-neutral-500">
          <Calendar className="size-4" />
          <span>Updated weekly with hand-vetted developer tool openings</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center pt-4">
          <JobsPagination totalPages={totalPages} basePath="/jobs" />
        </div>
      )}
    </section>
  )
}

export default JobsPage
