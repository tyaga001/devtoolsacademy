"use client"

import React, { useState } from "react"

import BlogChatInterface from "@/components/blog/BlogChatInterface"
import ViewCounter from "@/components/blog/ViewCounter"
import SocialShare from "@/components/blog/SocialShare"
import Breadcrumb from "@/components/blog/Breadcrumb"

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

  React.useEffect(() => {
    const ele = document.querySelector("article")
    if (ele !== null) {
      setContent(ele.innerHTML)
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
      <h1 className="mb-8 text-3xl md:text-5xl">{title}</h1>
      <div className="mb-12 flex flex-col justify-between md:mb-16 md:flex-row md:items-center">
        <div className="mb-6 flex items-center gap-4 text-neutral-400 md:mb-0">
          <span className="text-sm">{author}</span>
          <span>|</span>
          <span className="text-sm">{formatDate(publishedAt)}</span>
          <span>|</span>
          <SocialShare title={title} />
        </div>
        <div className="flex flex-row-reverse items-center justify-between gap-3 md:flex-row">
          <button onClick={() => setShowChat(true)} className="inline-flex h-10 animate-shimmer items-center justify-center  border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 rounded-full text-sm ">
            Summarize with AI
          </button>
          <ViewCounter />
        </div>
      </div>
      {showChat && (
        <BlogChatInterface
          // blogDescription={description}
          blogTitle={title}
          blogContent={content}
          onClose={() => setShowChat(false)}
        />
      )}
    </>
  )
}

export default BlogHeader
