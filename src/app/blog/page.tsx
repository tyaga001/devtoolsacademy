import { Link } from "next-view-transitions"

import { cn, formatDate } from "@/lib/utils"
import { getMetadata } from "@/lib/metadata"

import { allBlogs } from "./data"

export const metadata = getMetadata({
  path: "/blog",
  title: "Blog | DevTools Academy",
  description: "Learn about awesome developer tools with our blogs",
})

export default async function BlogPage() {
  return (
    <div className="py-36">
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-bold tracking-tight md:text-5xl">
          <span className="bg-gradient-to-b from-neutral-700 to-neutral-200 bg-clip-text text-transparent">
            Blog Posts
          </span>
        </h1>
      </div>
      <div className="mx-auto max-w-7xl py-16">
        <div className="flex flex-col">
          <hr className="border-dashed border-[#f6f6f6] opacity-10" />
          {allBlogs.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={cn(
                "p-4 transition-colors hover:bg-neutral-900 focus:bg-neutral-900",
                "border-b border-dashed border-[#f6f6f6]/10",
                "flex"
              )}
            >
              <div className="flex w-2/12 flex-col text-xs text-neutral-500 md:text-sm">
                <p className="mb-3">{formatDate(new Date(post.publishedAt))}</p>
                <p>by {post.author}</p>
              </div>
              <div className="w-10/12">
                <p className="mb-3 text-xl font-semibold tracking-tight text-neutral-300 md:text-2xl">
                  {post.title}
                </p>
                <p className="text-sm text-neutral-500 md:text-base">
                  {post.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
