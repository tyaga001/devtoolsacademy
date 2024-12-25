"use client"

import React, { useState } from "react"
import BlogChatInterface from "@/components/BlogChatInterface"
import { EyeIcon } from "@heroicons/react/24/outline"
import ViewCounter from "@/components/ViewCounter"
import { SocialMetadata } from "@/components/SocialMetadata"
import SocialShare from "@/components/SocialShare"

interface BlogPostClientProps {
  slug: string
  title: string
  publishedAt: string
  initialViews: number
  content: string
  description: string
  featuredImage: string
}

const BlogPostClient: React.FC<BlogPostClientProps> = ({
  slug,
  title,
  publishedAt,
  initialViews,
  content,
  description,
  featuredImage,
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

  const baseUrl = "https://devtoolsacademy.com"
  const postUrl = `${baseUrl}/blog/${slug}`

  return (
    <>
      <SocialMetadata
        title={title}
        description={description}
        url={postUrl}
        image={`${baseUrl}${featuredImage}`}
        type="article"
      />
      <h1 className="mb-8 text-5xl font-bold tracking-tight leading-snug text-neutral-100">
        {title}
      </h1>
      <div className="mb-16 flex items-center justify-between">
        <div className="flex items-center gap-6 text-neutral-400">
          <span className="text-sm">{formatDate(publishedAt)}</span>
          <span>|</span>
          <SocialShare url={`/blog/${slug}`} title={title} />
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowChat(true)}
            className="rounded-full border border-blue-500/50 bg-blue-900/30 px-3 py-1 text-sm text-blue-400 transition-colors duration-200"
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

export default BlogPostClient
