import Link from "next/link"

import { getAllPosts } from "@/lib/posts"
import { formatDate } from "@/lib/utils"

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold tracking-tighter text-neutral-200 md:mb-20">
        Blog Posts
      </h1>
      <div className="-mx-3 flex flex-col">
        {posts.map((post, index) => (
          <>
            <Link
              href={`/blog/${post.slug}`}
              key={post.slug}
              className="rounded-lg p-3 transition-colors hover:bg-neutral-50/10 focus:bg-neutral-50/10"
            >
              <p className="mb-1 text-2xl font-semibold tracking-tight text-neutral-200">
                {post.title}
              </p>
              <p className="mb-2.5 text-neutral-400">{post.summary}</p>
              <p className="text-sm text-neutral-400">
                {formatDate(new Date(post.publishedAt))} • {post.views} views
              </p>
            </Link>
            {index < posts.length - 1 && <hr className="border-neutral-700" />}
          </>
        ))}
      </div>
    </div>
  )
}
