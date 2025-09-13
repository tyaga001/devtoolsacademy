import React from "react"
import {
  Building2,
  MapPin,
  Clock,
  DollarSign,
  Crown,
  Calendar,
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
      <Card className="relative h-full overflow-hidden border border-neutral-800 bg-[#141414] shadow-sm transition-all duration-300 hover:border-neutral-700 hover:shadow-lg">
        <CardHeader className="border-b border-neutral-800 pb-6 relative">
          {job.featured && (
            <div className="absolute right-4 top-4 z-10">
              <Badge className="border-amber-600/30 bg-amber-600/20 text-amber-400 shadow-sm text-xs px-2 py-1">
                <Crown className="mr-1 h-3 w-3" />
                Featured
              </Badge>
            </div>
          )}
          <div className="flex items-start gap-4">
            {job.companyLogo && !imageError ? (
              <img
                src={job.companyLogo}
                alt={`${job.company} logo`}
                className="h-12 w-12 rounded-lg border border-neutral-700 object-cover shadow-sm"
                onError={() => setImageError(true)}
                onLoad={() => setImageError(false)}
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800">
                <Building2 className="h-6 w-6 text-neutral-400" />
              </div>
            )}
            <div className="min-w-0 flex-1 pr-24">
              <h3 className="text-lg font-semibold leading-tight text-neutral-100 group-hover:text-white">
                {job.title}
              </h3>
              <p className="mt-1 text-sm font-medium text-neutral-300">
                {job.company}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 py-6">
          <p className="line-clamp-2 text-sm leading-relaxed text-neutral-300">
            {job.description}
          </p>

          <div className="grid grid-cols-1 gap-3 text-sm text-neutral-400">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-neutral-400" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-neutral-400" />
              <span>{formatJobType(job.type)}</span>
            </div>
            {job.salary && (
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-neutral-400" />
                <span className="font-medium text-neutral-200">
                  {job.salary}
                </span>
              </div>
            )}
          </div>

          {job.categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {job.categories.slice(0, 3).map((category) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className="border-neutral-700 bg-neutral-800 text-xs font-medium text-neutral-300 hover:bg-neutral-700"
                >
                  {category}
                </Badge>
              ))}
              {job.categories.length > 3 && (
                <Badge
                  variant="secondary"
                  className="border-neutral-700 bg-neutral-800 text-xs font-medium text-neutral-400"
                >
                  +{job.categories.length - 3} more
                </Badge>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t border-neutral-800 py-4 text-xs text-neutral-400">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3 w-3" />
            <span>Posted {formatDate(job.createdAt)}</span>
          </div>
          <span>Expires {formatDate(job.expiresAt)}</span>
        </CardFooter>
      </Card>
    </a>
  )
}

export default JobCard
