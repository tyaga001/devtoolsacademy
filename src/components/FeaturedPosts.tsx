"use client"

import React from "react"
import { Link } from "next-view-transitions"
import Image from "next/image"

import { CircleUserRound, Clock } from "lucide-react"

interface BlogCardProps {
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
      className="flex rounded-3xl bg-neutral-800 p-2.5 transition-transform hover:scale-105"
    >
      <div className="flex flex-col overflow-hidden rounded-2xl bg-neutral-950 shadow-lg">
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
      </div>
    </Link>
  )
}

interface FeaturedPostsProps {
  posts: BlogCardProps[]
}

const FeaturedPosts: React.FC<FeaturedPostsProps> = ({ posts }) => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="mb-12 text-center text-4xl font-bold tracking-tight text-neutral-200">
        Featured Posts
      </h2>
      <div
        className={`grid gap-8 ${posts.length === 2 ? "mx-auto max-w-4xl md:grid-cols-2" : "md:grid-cols-3"}`}
      >
        {posts.slice(0, 3).map((post) => (
          <BlogCard key={post.slug} {...post} />
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link
          href="/blog"
          className="inline-block rounded-full bg-purple-600 px-8 py-3 font-semibold text-white transition duration-300 hover:bg-purple-700"
        >
          View All Posts
        </Link>
      </div>
    </section>
  )
}

export default FeaturedPosts
