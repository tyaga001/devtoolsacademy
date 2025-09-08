"use client"

import * as React from "react"
import axios from "axios"
import { JobCardInterface } from "@/lib/types"
import JobCard from "./JobCard"
import JobsPagination from "./JobsPagination"
import JobSkeleton from "./JobSkeleton"
import { TriangleAlert, Briefcase } from "lucide-react"

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
  // Use the search params from props instead of useSearchParams hook
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

        // Convert date strings to Date objects
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
      <section className="mx-auto mb-20 flex max-w-7xl flex-col px-4 md:px-0">
        <div className="flex w-full flex-col gap-2 px-0 py-4 text-neutral-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(9)].map((_, index) => (
              <JobSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error || jobs.length === 0) {
    return (
      <div className="mx-auto flex min-h-[400px] max-w-6xl flex-col items-center justify-center rounded-lg p-8">
        <div className="relative flex items-center justify-center">
          <Briefcase size={50} className="text-neutral-600" />
          <div className="absolute bottom-1">
            <TriangleAlert size={20} className="text-neutral-400" />
          </div>
        </div>
        <h2 className="my-4 text-2xl font-semibold tracking-tight text-neutral-400">
          No jobs found
        </h2>
        <p className="mb-6 max-w-xl text-center text-neutral-500">
          We couldn&apos;t find any jobs matching your criteria. Try adjusting
          your filters or search terms, or check back later for new
          opportunities.
        </p>
      </div>
    )
  }

  return (
    <section className="mx-auto mb-20 flex max-w-7xl flex-col px-4 md:px-0">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-neutral-400">
          Found {totalJobs} job{totalJobs !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="flex w-full flex-col gap-2 px-0 py-4 text-neutral-200">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
        <JobsPagination totalPages={totalPages} basePath="/jobs" />
      </div>
    </section>
  )
}

export default JobsPage
