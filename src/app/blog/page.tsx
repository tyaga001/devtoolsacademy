import React from "react"
import Image from "next/image"
import { Link } from "next-view-transitions"
import { CircleUserRound, Clock } from "lucide-react"

import { cn, formatDate } from "@/lib/utils"
import { getMetadata } from "@/lib/metadata"

import { allBlogs } from "./data"

import CoverImage from "./cover.png"

export const metadata = getMetadata({
  path: "/blog",
  title: "Blog | DevTools Academy",
  description: "Learn about awesome developer tools with our blogs",
  image: CoverImage.src,
})

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
        "border-b border-dashed border-neutral-100/15",
        (index + 1) % 3 !== 0 ? "md:border-r" : ""
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

export default async function BlogPage() {
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
        <div className="grid grid-cols-1 md:grid-cols-3">
          {allBlogs
            .filter((post) => post.isFeatured)
            .map((post, index) => (
              <BlogCard key={index} {...post} index={index} />
            ))}
        </div>
        <div className="mb-12 mt-20 text-center">
          <h2 className="text-xl font-bold tracking-tight md:text-4xl">
            <span className="bg-gradient-to-b from-neutral-700 to-neutral-200 bg-clip-text text-transparent">
              All Blogs
            </span>
          </h2>
        </div>
        <hr className="border-dashed border-neutral-100/15" />
        {allBlogs.map((post) => (
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
