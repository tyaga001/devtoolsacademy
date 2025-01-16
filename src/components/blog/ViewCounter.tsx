"use client"

import * as React from "react"

import { Eye } from "lucide-react"

export default function ViewCounter() {
  const [views, setViews] = React.useState(0)

  React.useEffect(() => {
    if (window) {
      const slug = window.location.pathname
        .replace("blog", "")
        .replaceAll("/", "")

      const fetchViews = async () => {
        try {
          const response = await fetch(`/api/views/?slug=${slug}`)
          const data = await response.json()
          setViews(data.views)
        } catch (error) {
          console.error("Failed to fetch view count:", error)
        }
      }
      fetchViews()
    }
  }, [])

  return (
    <div className="group flex items-center rounded-full bg-neutral-900 px-3 py-1.5 text-neutral-400">
      <Eye className="mr-2 size-5 group-hover:text-blue-400" />
      <span className="text-sm font-medium">{views} views</span>
    </div>
  )
}
