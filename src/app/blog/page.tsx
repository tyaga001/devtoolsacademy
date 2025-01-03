import Link from "next/link"

import { getAllPosts } from "@/lib/posts"
import { formatDate } from "@/lib/utils"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blogs | Dev Tools Academy",
  description: "A special blog made for Developers.",
  openGraph: {
    title: "Blogs | Dev Tools Academy",
    description: "A special blog made for Developers.",
    url: process.env.NEXT_PUBLIC_BASE_URL ?? "https://devtoolsacademy.com",
    images: [
      {
        url: `${
          process.env.NEXT_PUBLIC_BASE_URL ?? "https://devtoolsacademy.com"
        }/api/og?title=Blogs%20|%20DevToolsAcademy`,
        width: 1200,
        height: 639,
        alt: "DevToolsAcademy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blogs | Dev Tools Academy",
    description: "A special blog made for Developers.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=Blogs%20|%20DevToolsAcademy`,
        width: 1200,
        height: 639,
        alt: "DevToolsAcademy",
      },
    ],
  },
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className="mx-auto max-w-4xl px-4 py-36">
      <h1 className="mb-8 text-3xl font-bold tracking-tighter text-neutral-200 md:mb-20 md:text-5xl">
        Blog Posts
      </h1>
      <div className="-mx-3 flex flex-col">
        {posts.map((post) => (
          <>
            <Link
              href={`/blog/${post.slug}`}
              key={post.slug}
              className="rounded-lg p-4 transition-colors hover:bg-neutral-900 focus:bg-neutral-900"
            >
              <p className="mb-1 text-xl font-semibold tracking-tight text-neutral-300 md:text-2xl">
                {post.title}
              </p>
              <p className="mb-2.5 text-sm text-neutral-500 md:text-base">
                {post.summary}
              </p>
              <p className="text-xs text-neutral-500 md:text-sm">
                {formatDate(new Date(post.publishedAt))} • {post.views} views
              </p>
            </Link>
          </>
        ))}
      </div>
    </div>
  )
}
