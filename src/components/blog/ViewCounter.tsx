"use client"

import * as React from "react"
import { Eye } from "lucide-react"

export default function ViewCounter({
  slug,
  initialViews,
}: {
  slug: string
  initialViews: number
}) {
  const [views, setViews] = React.useState(initialViews)

  React.useEffect(() => {
    const incrementViews = async () => {
      try {
        const response = await fetch(`/api/views/`, {
          method: "POST",
          body: JSON.stringify({ slug: slug }),
        })
        const data = await response.json()
        setViews(data.views)
      } catch (error) {
        console.error("Failed to increment view count:", error)
      }
    }
    incrementViews()
  }, [slug])

  return (
    <div className="group flex items-center rounded-full bg-neutral-900 px-3 py-1.5 text-neutral-400">
      <Eye className="mr-2 size-5 group-hover:text-blue-400" />
      <span className="text-sm font-medium">
        {views.toLocaleString()} views
      </span>
    </div>
  )
}
