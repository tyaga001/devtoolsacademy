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
      ``
      <SocialMetadata
        title={title}
        description={description}
        url={postUrl}
        image={`${baseUrl}${featuredImage}`}
        type="article"
      />
      <h1 className="mb-4 text-4xl font-bold text-white">{title}</h1>
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-neutral-400">{formatDate(publishedAt)}</span>
          <button
            onClick={() => setShowChat(true)}
            className="rounded-full border border-blue-500/50 bg-blue-900/30 px-4 py-2 text-sm text-blue-400 transition-colors duration-200"
          >
            Chat with Claude AI
          </button>
        </div>
        <div className="flex items-center rounded-full bg-neutral-950 px-3 py-1">
          <EyeIcon className="mr-2 size-5 text-blue-400" />
          <ViewCounter slug={slug} initialViews={initialViews} />
        </div>
      </div>
      <SocialShare url={`/blog/${slug}`} title={title} />
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
