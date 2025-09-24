"use client"

import React from "react"
import { Link } from "next-view-transitions"
import Image from "next/image"
import { ArrowRight, Calendar } from "lucide-react"

import { allBlogs } from "@/app/blog/data"

interface RelatedPostsProps {
  currentSlug: string
  currentCategory?: string
  limit?: number
}

interface BlogPost {
  author: string
  slug: string
  title: string
  excerpt: string
  description: string
  publishedAt: string
  category: string
  image: string
  isNew?: boolean
  isFeatured?: boolean
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({
  currentSlug,
  currentCategory,
  limit = 2,
}) => {
  // Find related posts based on category, excluding current post
  const getRelatedPosts = (): BlogPost[] => {
    let relatedPosts = allBlogs.filter((post) => post.slug !== currentSlug)

    // First, try to find posts in the same category
    if (currentCategory) {
      const sameCategoryPosts = relatedPosts.filter(
        (post) => post.category === currentCategory
      )
      if (sameCategoryPosts.length >= limit) {
        return sameCategoryPosts.slice(0, limit)
      }
      // If not enough posts in same category, mix with other posts
      const otherPosts = relatedPosts.filter(
        (post) => post.category !== currentCategory
      )
      return [...sameCategoryPosts, ...otherPosts].slice(0, limit)
    }

    // If no category provided, return most recent posts
    return relatedPosts
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      )
      .slice(0, limit)
  }

  const relatedPosts = getRelatedPosts()

  if (relatedPosts.length === 0) {
    return null
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <section className="mt-20 border-t border-dashed border-neutral-100/15 pt-12">
      <div className="mb-8">
        <h3 className="mb-2 text-xl font-semibold text-neutral-200">
          Continue Reading
        </h3>
        <p className="text-sm text-neutral-400">
          Explore more insights on developer tools and best practices
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {relatedPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block overflow-hidden rounded-xl border border-dashed border-neutral-100/10 bg-gradient-to-br from-neutral-900/50 to-neutral-900/30 backdrop-blur-sm transition-all duration-300 hover:border-neutral-100/20 hover:from-neutral-900/70 hover:to-neutral-900/50"
          >
            <div className="relative h-40 overflow-hidden">
              <Image
                src={post.image}
                alt={`${post.title} - ${post.excerpt}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Category badge */}
              <div className="absolute bottom-3 left-3">
                <span className="rounded-full bg-black/60 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  {post.category}
                </span>
              </div>

              {/* New/Featured badges */}
              {(post.isNew || post.isFeatured) && (
                <div className="absolute right-3 top-3 flex gap-2">
                  {post.isNew && (
                    <span className="rounded-full bg-yellow-400 px-2 py-1 text-xs font-bold text-black">
                      NEW
                    </span>
                  )}
                  {post.isFeatured && (
                    <span className="rounded-full bg-blue-500 px-2 py-1 text-xs font-bold text-white">
                      FEATURED
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="p-6">
              <h4 className="mb-3 line-clamp-2 text-lg font-semibold leading-tight text-neutral-200 transition-colors group-hover:text-white">
                {post.title}
              </h4>

              <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-neutral-400">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <Calendar size={12} />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>

                <div className="flex items-center gap-1 text-xs font-medium text-blue-400 transition-colors group-hover:text-blue-300">
                  <span>Read more</span>
                  <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-lg border border-dashed border-neutral-700 bg-transparent px-6 py-3 text-sm font-medium text-neutral-300 transition-all hover:border-neutral-600 hover:bg-neutral-800/50"
        >
          <span>Explore all articles</span>
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  )
}

export default RelatedPosts
