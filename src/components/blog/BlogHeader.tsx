"use client"

import React, { useState } from "react"

import BlogChatInterface from "@/components/blog/BlogChatInterface"
import ViewCounter from "@/components/blog/ViewCounter"
import SocialShare from "@/components/blog/SocialShare"
import Breadcrumb from "@/components/blog/Breadcrumb"
import { CircleUserRound, Clock } from "lucide-react"
import { calculateReadingTime } from "@/lib/utils"

interface BlogHeaderProps {
  title: string
  author: string
  publishedAt: string
}

const BlogHeader: React.FC<BlogHeaderProps> = ({
  title,
  author,
  publishedAt,
}) => {
  const [content, setContent] = useState("")
  const [showChat, setShowChat] = useState(false)
  const [readTime, setReadTime] = useState<number>(0)

  React.useEffect(() => {
    const ele = document.querySelector("article")
    if (ele !== null) {
      const articleContent = ele.innerHTML
      setContent(articleContent)
      setReadTime(calculateReadingTime(articleContent))
    }
  }, [])

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
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: title, href: "#" },
        ]}
      />
      <h1 className="mb-8 text-3xl md:text-5xl" style={{ lineHeight: 1.1 }}>
        {title}
      </h1>
      <div className="mb-12 flex flex-col justify-between md:mb-16 md:flex-row md:items-center">
        <div className="mb-6 flex items-center gap-4 text-neutral-400 md:mb-0">
          <span className="flex items-center gap-1 text-sm">
            <CircleUserRound size={14} />
            {author}
          </span>
          <span>|</span>
          <span className="text-sm">{formatDate(publishedAt)}</span>
          <span>|</span>
          <span className="flex items-center gap-1 text-sm">
            <Clock size={14} />
            {readTime} min read
          </span>
          <span>|</span>
          <SocialShare title={title} />
        </div>
        <div className="flex flex-row-reverse items-center justify-between gap-3 md:flex-row">
          <button
            onClick={() => setShowChat(true)}
            className="rounded-full border border-blue-500/50 bg-blue-900/30 px-3 py-1 text-sm text-blue-400 outline-none transition-colors duration-200 hover:bg-blue-900/50 focus:bg-blue-900/50"
          >
            Chat with Claude AI
          </button>
          <ViewCounter />
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
