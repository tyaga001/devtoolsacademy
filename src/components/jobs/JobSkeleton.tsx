import React from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

const JobSkeleton: React.FC = () => {
  return (
    <Card className="size-full max-w-sm overflow-hidden border-neutral-100/15 opacity-90">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="size-10 animate-pulse rounded border border-neutral-100/15 bg-neutral-800" />
          <div className="space-y-2">
            <div className="h-5 w-32 animate-pulse rounded bg-neutral-800" />
            <div className="h-4 w-24 animate-pulse rounded bg-neutral-800" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-neutral-800" />
          <div className="h-3 w-3/4 animate-pulse rounded bg-neutral-800" />
        </div>

        <div className="flex gap-2">
          <div className="h-4 w-16 animate-pulse rounded bg-neutral-800" />
          <div className="h-4 w-20 animate-pulse rounded bg-neutral-800" />
          <div className="h-4 w-16 animate-pulse rounded bg-neutral-800" />
        </div>

        <div className="flex gap-1.5">
          <div className="h-5 w-16 animate-pulse rounded bg-neutral-800" />
          <div className="h-5 w-20 animate-pulse rounded bg-neutral-800" />
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between py-3">
        <div className="h-3 w-20 animate-pulse rounded bg-neutral-800" />
        <div className="h-3 w-24 animate-pulse rounded bg-neutral-800" />
      </CardFooter>
    </Card>
  )
}

export default JobSkeleton
