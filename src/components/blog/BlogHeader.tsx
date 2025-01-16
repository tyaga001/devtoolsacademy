"use client"

import React, { useState } from "react"
import { useParams } from "next/navigation"

import BlogChatInterface from "@/components/blog/BlogChatInterface"
// import ViewCounter from "@/components/blog/ViewCounter"
import SocialShare from "@/components/blog/SocialShare"
import Breadcrumb from "@/components/blog/Breadcrumb"

interface BlogHeaderProps {
  title: string
  publishedAt: string
}

const BlogHeader: React.FC<BlogHeaderProps> = ({ title, publishedAt }) => {
  const { slug } = useParams<{ slug: string }>()

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
        <div className="mb-6 flex items-center gap-6 text-neutral-400 md:mb-0">
          <span className="text-sm">{formatDate(publishedAt)}</span>
          <span>|</span>
          <SocialShare url={`/blog/${slug}`} title={title} />
        </div>
        <div className="flex flex-row-reverse items-center justify-between gap-3 md:flex-row">
          <button
            onClick={() => setShowChat(true)}
            className="rounded-full border border-blue-500/50 bg-blue-900/30 px-3 py-1 text-sm text-blue-400 outline-none transition-colors duration-200 hover:bg-blue-900/50 focus:bg-blue-900/50"
          >
            Chat with Claude AI
          </button>
          {/* <ViewCounter slug={slug} initialViews={initialViews} /> */}
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
