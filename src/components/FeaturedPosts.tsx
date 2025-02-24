"use client"

import React from "react"
import { Link } from "next-view-transitions"
import Image from "next/image"

import { CircleUserRound, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface BlogCardProps {
  index: number
  title: string
  excerpt: string
  author: string
  image: string
  url: string
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
  url,
  readTime,
  category,
  isNew,
}) => {
  const defaultReadTime = "8 min read"

  return (
    <Link
      href={url}
      className={cn(
        "flex flex-col transition-colors hover:bg-neutral-900",
        "border-b md:border-b-0 border-dashed border-neutral-100/10",
        index > 0 ? "md:border-l border-dashed border-neutral-100/10" : ""
      )}
    >
      <div className="relative h-48">
        <Image src={image} alt={title} layout="fill" objectFit="cover" />
        {isNew && (
          <span className="absolute right-2 top-2 rounded-full bg-yellow-400 px-2 py-1 text-xs font-bold text-black">
            NEW
          </span>
        )}
      </div>
      <div className="p-6">
        <span className="mb-2 block text-sm font-medium text-purple-600">
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

interface FeaturedPostsProps {
  posts: Omit<BlogCardProps, "index">[]
}

const FeaturedPosts: React.FC<FeaturedPostsProps> = ({ posts }) => {
  return (
    <section>
      <div className="mx-auto max-w-7xl py-16 text-center">
        <h2 className="mb-4 text-2xl font-bold tracking-tight md:text-5xl">
          <span className="bg-gradient-to-b from-neutral-700 to-neutral-200 bg-clip-text text-transparent">
            Featured Posts
          </span>
        </h2>
        <p className="text-base text-neutral-500 md:text-lg">
          Our most trending blog posts.
        </p>
      </div>

      <div className="mx-auto max-w-7xl">
        <hr className="border-dashed border-neutral-100 opacity-10" />
      </div>
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {posts.slice(0, 3).map((post, index) => (
            <BlogCard key={index} {...post} index={index} />
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-7xl">
        <hr className="border-dashed border-neutral-100 opacity-10" />
      </div>

      <div className="mx-auto max-w-7xl py-16 text-center">
        <Link
          href="/blog"
          className="bg-neutral-200 px-4 py-2 text-base font-medium text-neutral-800 outline-none transition-colors hover:bg-neutral-300 focus:bg-neutral-300 md:px-6 md:py-3 md:text-lg"
        >
          View All Posts
        </Link>
      </div>
    </section>
  )
}

export default FeaturedPosts
