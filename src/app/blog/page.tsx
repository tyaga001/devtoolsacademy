"use client"

import { Link } from "next-view-transitions"
import { Clock } from "lucide-react"
import { useEffect, useState } from "react"

import { cn, formatDate, calculateReadingTime } from "@/lib/utils"
import { allBlogs } from "./data"

interface BlogPost {
  slug: string
  title: string
  description: string
  author: string
  publishedAt: string
  readTime?: number
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(allBlogs)

  useEffect(() => {
    const fetchReadTimes = async () => {
      const updatedPosts = await Promise.all(
        allBlogs.map(async (post) => {
          try {
            const response = await fetch(`/api/blog-content?slug=${post.slug}`)
            if (!response.ok) throw new Error("Failed to fetch content")
            const data = await response.json()
            return {
              ...post,
              readTime: calculateReadingTime(data.content),
            }
          } catch (error) {
            console.error(`Failed to fetch content for ${post.slug}:`, error)
            // Fallback to description if content fetch fails
            return {
              ...post,
              readTime: calculateReadingTime(post.description),
            }
          }
        })
      )
      setPosts(updatedPosts)
    }

    fetchReadTimes()
  }, [])

  return (
    <main className="mt-[80px]">
      <hr className="border-dashed border-neutral-100/15" />
      <section className="py-16 text-center">
        <h1 className="text-2xl font-bold tracking-tight md:text-5xl">
          <span className="bg-gradient-to-b from-neutral-700 to-neutral-200 bg-clip-text text-transparent">
            Blog Posts
          </span>
        </h1>
      </section>

      <section className="mx-auto mb-20 flex max-w-7xl flex-col">
        <hr className="border-dashed border-neutral-100/15" />
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className={cn(
              "p-4 transition-colors hover:bg-neutral-900 focus:bg-neutral-900",
              "border-b border-dashed border-neutral-100/15",
              "flex flex-col md:flex-row"
            )}
          >
            <div className="mb-2 flex gap-1 text-xs text-neutral-500 md:mb-0 md:w-2/12 md:flex-col md:text-sm">
              <p className="">{formatDate(new Date(post.publishedAt))}</p>
              <p>by {post.author}</p>
              <p className="flex items-center gap-1">
                <Clock size={14} />
                {post.readTime || calculateReadingTime(post.description)} min
                read
              </p>
            </div>
            <div className="md:w-10/12">
              <p className="mb-3 text-xl font-semibold tracking-tight text-neutral-300 md:text-2xl">
                {post.title}
              </p>
              <p className="text-sm text-neutral-500 md:text-base">
                {post.description}
              </p>
            </div>
          </Link>
        ))}
      </section>
    </main>
  )
}
