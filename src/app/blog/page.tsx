import { Link } from "next-view-transitions"


import { cn, formatDate } from "@/lib/utils"
import { baseUrl,getMetadata } from "@/lib/metadata"

import { allBlogs } from "./data"

export const metadata = getMetadata({
  path: "/blog",
  title: "Blog | DevTools Academy",
  description: "Learn about awesome developer tools with our blogs",
  image: `${baseUrl}api/og?title=Blogs%20|%20DevToolsAcademy`,
})

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
