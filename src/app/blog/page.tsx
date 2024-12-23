import Link from "next/link"

import { getAllPosts } from "@/lib/posts"
import { formatDate } from "@/lib/utils"

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold tracking-tighter md:mb-20">
        Blog Posts
      </h1>
      <div className="-mx-3 flex flex-col">
        {posts.map((post) => (
          <Link
            href={`/blog/${post.slug}`}
            key={post.slug}
            className="rounded-lg border-b border-gray-800 p-3 transition-colors hover:bg-gray-50/10 focus:bg-gray-50/10"
          >
            <p className="mb-1 text-2xl font-semibold tracking-tight text-gray-200">
              {post.title}
            </p>
            <p className="mb-2.5 text-gray-500">{post.summary}</p>
            <p className="text-sm text-gray-500">
              {formatDate(new Date(post.publishedAt))} • {post.views} views
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
