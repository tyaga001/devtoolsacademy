import React from "react"
import { Building2, MapPin, Clock, DollarSign, Star } from "lucide-react"
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
      className="block"
    >
      <Card className="relative size-full max-w-sm overflow-hidden border-neutral-100/15 opacity-90 ring-[#1C1C1C]/50 transition-all hover:opacity-100 hover:ring">
        {job.featured && (
          <div className="absolute right-2 top-2 z-10">
            <Badge className="bg-yellow-600/20 text-yellow-400 border-yellow-500/30">
              <Star className="w-3 h-3 mr-1 fill-current" />
              Featured
            </Badge>
          </div>
        )}

        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              {job.companyLogo && !imageError ? (
                <img
                  src={job.companyLogo}
                  alt={`${job.company} logo`}
                  className="size-10 rounded border border-neutral-100/15 object-cover"
                  onError={() => setImageError(true)}
                  onLoad={() => setImageError(false)}
                />
              ) : (
                <div className="size-10 rounded border border-neutral-100/15 bg-neutral-800 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-neutral-400" />
                </div>
              )}
              <div>
                <h3 className="text-lg font-bold text-neutral-100 line-clamp-1">
                  {job.title}
                </h3>
                <p className="text-sm text-neutral-400">{job.company}</p>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          <p className="line-clamp-2 text-xs text-neutral-400">
            {job.description}
          </p>

          <div className="flex flex-wrap gap-2 text-xs text-neutral-400">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{formatJobType(job.type)}</span>
            </div>
            {job.salary && (
              <div className="flex items-center gap-1">
                <DollarSign className="w-3 h-3" />
                <span>{job.salary}</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {job.categories.slice(0, 2).map((category) => (
              <Badge
                key={category}
                variant="secondary"
                className="bg-[#141414] text-xs text-neutral-300 hover:bg-[#141414]"
              >
                {category}
              </Badge>
            ))}
            {job.categories.length > 2 && (
              <Badge
                variant="secondary"
                className="bg-[#141414] text-neutral-300 opacity-90 hover:bg-[#141414]"
              >
                +{job.categories.length - 2}
              </Badge>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between py-3 text-xs text-neutral-500">
          <span>Posted {formatDate(job.createdAt)}</span>
          <span className="text-neutral-600">
            Expires {formatDate(job.expiresAt)}
          </span>
        </CardFooter>
      </Card>
    </a>
  )
}

export default JobCard
