import Link from "next/link"

import { getAllPosts } from "@/lib/posts"
import { formatDate } from "@/lib/utils"

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold">Blog Posts</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug} className="border-b pb-4">
            <Link
              href={`/blog/${post.slug}`}
              className="text-2xl font-semibold hover:underline"
            >
              {post.title}
            </Link>
            <p className="text-gray-500">
              {formatDate(new Date(post.publishedAt))} • {post.views} views
            </p>
            <p>{post.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
