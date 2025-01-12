import Link from "next/link"

import { getAllPosts } from "@/lib/posts"
import { formatDate } from "@/lib/utils"

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className="mx-auto max-w-5xl px-4 py-36">
      <h1 className="mb-8 text-3xl font-bold tracking-tighter text-neutral-200 md:mb-20 md:text-5xl">
        Blog Posts
      </h1>
      <div className="-mx-3 flex flex-col gap-3">
        {posts.map((post) => (
          <Link
            href={`/blog/${post.slug}`}
            key={post.slug}
            className="flex items-start gap-6 rounded-lg p-4 transition-colors hover:bg-neutral-900 focus:bg-neutral-900"
          >
            <div className="w-3/12 flex-1">
              <p className="mb-1 mt-1.5 text-xs text-neutral-500 md:text-sm">
                {formatDate(new Date(post.publishedAt))}
              </p>
              <p className="text-xs text-neutral-500 md:text-sm">
                {post.views} views
              </p>
            </div>
            <div className="w-9/12">
              <p className="mb-1 text-xl font-semibold tracking-tight text-neutral-300 md:text-2xl">
                {post.title}
              </p>
              <p className="mb-2.5 text-sm text-neutral-500 md:text-base">
                {post.summary}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
