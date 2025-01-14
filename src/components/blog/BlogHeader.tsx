"use client"

import React, { useState } from "react"

import BlogChatInterface from "@/components/blog/BlogChatInterface"
import ViewCounter from "@/components/blog/ViewCounter"
import SocialShare from "@/components/blog/SocialShare"
import Breadcrumb from "@/components/blog/Breadcrumb"
// import { getViewCount } from "@/lib/posts"

interface BlogHeaderProps {
  slug: string
  title: string
  publishedAt: string
}

const BlogHeader: React.FC<BlogHeaderProps> = ({
  slug,
  title,
  publishedAt,
}) => {
  const [initialViews, setInitialView] = useState(0)
  const [content, setContent] = useState("")
  const [showChat, setShowChat] = useState(false)

  React.useEffect(() => {
    const ele = document.querySelector("article")
    if (ele !== null) {
      setContent(ele.innerHTML)
    }

    // TODO: fetch blog view count from umami api
    // getViewCount(slug)
    //   .then((views) => {
    //     setInitialView(views)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
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
          { label: title, href: slug },
        ]}
      />
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
          <button
            onClick={() => setShowChat(true)}
            className="rounded-full border border-blue-500/50 bg-blue-900/30 px-3 py-1 text-sm text-blue-400 outline-none transition-colors duration-200 hover:bg-blue-900/50 focus:bg-blue-900/50"
          >
            Chat with Claude AI
          </button>
          <ViewCounter slug={slug} initialViews={initialViews} />
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
