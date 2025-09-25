import React from "react"
import {
  ArrowUpRight,
  Building2,
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  Sparkles,
} from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { JobCardInterface } from "@/lib/types"

interface JobCardProps {
  job: JobCardInterface
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const [imageError, setImageError] = React.useState(false)

  const formatJobType = (type: string) => {
    return type
      .replace("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase())
  }

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "1 day ago"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    return `${Math.floor(diffDays / 30)} months ago`
  }

  return (
    <a
      href={job.applyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full"
    >
      <Card className="relative flex h-full flex-col overflow-hidden border border-neutral-900 bg-neutral-900/50 shadow-lg transition-all duration-300 hover:border-neutral-800 hover:shadow-xl">
        <CardHeader className="space-y-4 border-b border-neutral-900 pb-5">
          <div className="flex items-start gap-4">
            {job.companyLogo && !imageError ? (
              <img
                src={job.companyLogo}
                alt={`${job.company} logo`}
                className="size-12 rounded-xl border border-neutral-800 bg-neutral-900 object-cover shadow"
                onError={() => setImageError(true)}
                onLoad={() => setImageError(false)}
              />
            ) : (
              <div className="flex size-12 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900">
                <Building2 className="size-5 text-neutral-500" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-semibold leading-tight text-neutral-100 group-hover:text-white">
                  {job.title}
                </h3>
                {job.featured && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/15 px-2.5 py-0.5 text-xs font-semibold text-amber-300">
                    <Sparkles className="size-3" /> Hot role
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-neutral-400">{job.company}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col gap-6 py-6">
          <p className="line-clamp-3 text-sm leading-relaxed text-neutral-300">
            {job.description}
          </p>

          <div className="grid grid-cols-1 gap-3 text-xs font-medium text-neutral-400 sm:grid-cols-2">
            <div className="flex items-center gap-2 rounded-lg border border-neutral-900 bg-neutral-900/60 px-3 py-2">
              <MapPin className="size-4 text-neutral-500" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-neutral-900 bg-neutral-900/60 px-3 py-2">
              <Clock className="size-4 text-neutral-500" />
              <span>{formatJobType(job.type)}</span>
            </div>
            {job.salary && (
              <div className="flex items-center gap-2 rounded-lg border border-neutral-900 bg-neutral-900/60 px-3 py-2">
                <DollarSign className="size-4 text-neutral-500" />
                <span className="text-neutral-200">{job.salary}</span>
              </div>
            )}
            <div className="flex items-center gap-2 rounded-lg border border-neutral-900 bg-neutral-900/60 px-3 py-2">
              <Calendar className="size-4 text-neutral-500" />
              <span>Posted {formatDate(job.createdAt)}</span>
            </div>
          </div>

          {job.categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {job.categories.slice(0, 3).map((category) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className="rounded-full border border-neutral-900 bg-neutral-900/70 px-3 py-1 text-xs font-medium text-neutral-300"
                >
                  {category}
                </Badge>
              ))}
              {job.categories.length > 3 && (
                <Badge
                  variant="secondary"
                  className="rounded-full border border-neutral-900 bg-neutral-900/70 px-3 py-1 text-xs font-medium text-neutral-400"
                >
                  +{job.categories.length - 3} more
                </Badge>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter className="mt-auto flex items-center justify-between border-t border-neutral-900 bg-neutral-900/40 px-6 py-4 text-xs text-neutral-400">
          <span>Expires {formatDate(job.expiresAt)}</span>
          <span className="inline-flex items-center gap-1 text-neutral-300">
            View role
            <ArrowUpRight className="size-3" />
          </span>
        </CardFooter>
      </Card>
    </a>
  )
}

export default JobCard
