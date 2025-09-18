"use client"

import React from "react"
import { Link } from "next-view-transitions"
import Image from "next/image"
import { CircleUserRound, Clock } from "lucide-react"

import { cn } from "@/lib/utils"
import { allBlogs } from "@/app/blog/data"

const featuredPosts = allBlogs.filter((post) => post.isFeatured)

interface BlogCardProps {
  index: number
  title: string
  excerpt: string
  author: string
  image: string
  slug: string
  readTime?: string
  category: string
  isNew?: boolean
}

const BlogCard: React.FC<BlogCardProps> = ({
  index,
  title,
  excerpt,
  author,
  image,
  slug,
  readTime,
  category,
  isNew,
}) => {
  const defaultReadTime = "8 min read"

  return (
    <Link
      href={`/blog/${slug}/`}
      className={cn(
        "flex flex-col transition-colors hover:bg-neutral-900",
        "border-b md:border-b-0 border-dashed border-neutral-100/15",
        index > 0 ? "md:border-l border-dashed border-neutral-100/15" : ""
      )}
    >
      <div className="relative h-48">
        <Image
          src={image}
          alt={`${title} - ${excerpt}`}
          layout="fill"
          objectFit="cover"
        />
        {isNew && (
          <span className="absolute right-2 top-2 rounded-full bg-yellow-400 px-2 py-1 text-xs font-bold text-black">
            NEW
          </span>
        )}
      </div>
      <div className="p-6">
        <span className="mb-2 block text-sm font-medium text-neutral-500">
          {category}
        </span>
        <h3 className="mb-2 text-xl font-bold text-neutral-200">{title}</h3>
        <p className="mb-4 text-neutral-500">{excerpt}</p>
      </div>
      <div className="mt-auto px-6 pb-6">
        <div className="flex items-center justify-between text-sm leading-none text-neutral-500">
          <p className="flex items-center gap-1">
            <CircleUserRound size={14} /> {author}
          </p>
          <p className="flex items-center gap-1">
            <Clock size={14} /> {readTime || defaultReadTime}
          </p>
        </div>
      </div>
    </Link>
  )
}

const FeaturedPosts: React.FC = () => {
  return (
    <section>
      <div className="mx-auto max-w-7xl py-20 text-center">
        <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-5xl">
          <span className="bg-gradient-to-b from-neutral-600 to-neutral-200 bg-clip-text text-transparent">
            Featured Posts
          </span>
        </h2>
        <p className="text-lg text-neutral-400 md:text-xl">
          Our most trending blog posts.
        </p>
      </div>

      <div className="mx-auto max-w-7xl">
        <hr className="border-dashed border-neutral-100/15" />
      </div>
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {featuredPosts.slice(0, 3).map((post, index) => (
            <BlogCard key={index} {...post} index={index} />
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-7xl">
        <hr className="border-dashed border-neutral-100/15" />
      </div>

      <div className="mx-auto max-w-7xl py-20 text-center">
        <Link
          href="/blog"
          className="inline-flex items-center justify-center rounded-lg bg-neutral-100 px-8 py-4 text-lg font-medium text-neutral-900 shadow-sm transition-all hover:bg-neutral-200 hover:shadow-md focus:bg-neutral-200 focus:shadow-md"
        >
          View All Posts
        </Link>
      </div>
    </section>
  )
}

export default FeaturedPosts
