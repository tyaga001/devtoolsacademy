"use client"

import React, { useState } from "react"

import BlogChatInterface from "@/components/BlogChatInterface"
import { EyeIcon } from "@heroicons/react/24/outline"
import ViewCounter from "@/components/ViewCounter"
import SocialShare from "@/components/SocialShare"

interface BlogHeaderProps {
  slug: string
  title: string
  publishedAt: string
  initialViews: number
  content: string
}

const BlogHeader: React.FC<BlogHeaderProps> = ({
  slug,
  title,
  publishedAt,
  initialViews,
  content,
}) => {
  const [showChat, setShowChat] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <>
      <h1 className="mb-8 md:text-5xl text-3xl font-bold tracking-tight leading-snug text-neutral-100">
        {title}
      </h1>
      <div className="mb-10 md:mb-16 flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex mb-6 md:mb-0 items-center gap-6 text-neutral-400">
          <span className="text-sm">{formatDate(publishedAt)}</span>
          <span>|</span>
          <SocialShare url={`/blog/${slug}`} title={title} />
        </div>
        <div className="flex flex-row-reverse md:flex-row items-center justify-between gap-3">
          <button
            onClick={() => setShowChat(true)}
            className="rounded-full border outline-none border-blue-500/50 bg-blue-900/30 hover:bg-blue-900/50 focus:bg-blue-900/50 px-3 py-1 text-sm text-blue-400 transition-colors duration-200"
          >
            Chat with Claude AI
          </button>
          <div className="flex items-center rounded-full bg-neutral-900 px-3 py-1.5 text-neutral-400 group">
            <EyeIcon className="mr-2 size-5 group-hover:text-blue-400" />
            <ViewCounter slug={slug} initialViews={initialViews} />
          </div>
        </div>
      </div>
      {showChat && (
        <BlogChatInterface
          blogContent={content}
          onClose={() => setShowChat(false)}
        />
      )}
    </>
  )
}

export default BlogHeader
