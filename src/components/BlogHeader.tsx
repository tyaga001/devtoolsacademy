"use client"

import React, { useState } from "react"
import { Eye } from "lucide-react"

import BlogChatInterface from "@/components/BlogChatInterface"
import ViewCounter from "@/components/ViewCounter"
import SocialShare from "@/components/SocialShare"

interface BlogHeaderProps {
  slug: string
  title: string
  description: string
  publishedAt: string
  initialViews: number
  content: string
}

const BlogHeader: React.FC<BlogHeaderProps> = ({
  slug,
  title,
  description,
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
      <h1 className="mb-8 text-3xl font-bold leading-snug tracking-tight text-neutral-100 md:text-5xl">
        {title}
      </h1>
      <div className="mb-10 flex flex-col justify-between md:mb-16 md:flex-row md:items-center">
        <div className="mb-6 flex items-center gap-6 text-neutral-400 md:mb-0">
          <span className="text-sm">{formatDate(publishedAt)}</span>
          <span>|</span>
          <SocialShare url={`/blog/${slug}`} title={title} />
        </div>
        <div className="flex flex-row-reverse items-center justify-between gap-3 md:flex-row">
          <button onClick={() => setShowChat(true)} className="inline-flex h-10 animate-shimmer items-center justify-center  border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 rounded-full text-sm ">
            Summarize with AI
          </button>
          <div className="group flex items-center rounded-full bg-neutral-900 px-3 py-1.5 text-neutral-400">
            <Eye className="mr-2 size-5 group-hover:text-blue-400" />
            <ViewCounter slug={slug} initialViews={initialViews} />
          </div>
        </div>
      </div>
      {showChat && (
        <BlogChatInterface
          blogDescription={description}
          blogTitle={title}
          blogContent={content}
          onClose={() => setShowChat(false)}
        />
      )}
    </>
  )
}

export default BlogHeader
