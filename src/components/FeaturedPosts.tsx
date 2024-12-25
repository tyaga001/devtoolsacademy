"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"

import { Clock, Bookmark, Share2 } from "lucide-react"

interface BlogCardProps {
  title: string
  excerpt: string
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
      className="flex flex-col overflow-hidden rounded-xl bg-neutral-800 shadow-lg transition-all hover:scale-105"
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
        <div className="mb-4 flex items-center justify-between text-sm text-neutral-500">
          <span className="flex items-center">
            <Clock size={16} className="mr-1" /> {readTime || defaultReadTime}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <Link
            href={url}
            className="font-semibold text-purple-600 hover:text-purple-800"
          >
            Read More →
          </Link>
          <div className="flex items-center">
            <button
              className="mr-2 rounded-full p-1 text-neutral-400 hover:bg-neutral-100"
              aria-label="Save post"
            >
              <Bookmark size={20} />
            </button>
            <button
              className="rounded-full p-1 text-neutral-400 hover:bg-neutral-100"
              aria-label="Share post"
            >
              <Share2 size={20} />
            </button>
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
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-4xl font-bold text-neutral-200">
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
      </div>
    </section>
  )
}

export default FeaturedPosts
