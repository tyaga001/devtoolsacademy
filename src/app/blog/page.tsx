import { Link } from "next-view-transitions"

import { formatDate } from "@/lib/utils"
import { getMetadata } from "@/lib/metadata"

import { allBlogs } from "./data"

export const metadata = getMetadata({
  path: "/blog",
  title: "Blog | DevTools Academy",
  description: "Learn about awesome developer tools with our blogs",
})

export default async function BlogPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-36">
      <h1 className="mb-8 text-3xl font-bold tracking-tighter text-neutral-200 md:mb-20 md:text-5xl">
        Blog Posts
      </h1>
      <div className="-mx-3 flex flex-col">
        {allBlogs.map((post) => (
          <Link
            href={`/blog/${post.slug}`}
            key={post.slug}
            className="rounded-lg p-4 transition-colors hover:bg-neutral-900 focus:bg-neutral-900"
          >
            <p className="mb-1 text-xl font-semibold tracking-tight text-neutral-300 md:text-2xl">
              {post.title}
            </p>
            <p className="mb-2.5 text-sm text-neutral-500 md:text-base">
              {post.description}
            </p>
            <p className="flex items-center gap-2 text-xs text-neutral-500 md:text-sm">
              <span>{post.author}</span>
              <span>·</span>
              <span>{formatDate(new Date(post.publishedAt))}</span>
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
