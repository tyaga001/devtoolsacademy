import Link from "next/link"
import * as React from "react"

interface Post {
  slug: string
  title: string
  summary: string
  publishedAt: string
  views: number
}

interface RecentPostsProps {
  posts: Post[]
}

export const RecentPosts: React.FC<RecentPostsProps> = ({ posts }) => {
  return (
    <div>
      <h2 className="mb-6 text-3xl font-bold">Recent Posts:</h2>
      <div className="space-y-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block rounded-lg bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg dark:bg-gray-800"
          >
            <h3 className="mb-2 text-2xl font-semibold">{post.title}</h3>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              {post.summary}
            </p>
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>{post.publishedAt}</span>
              <span>{post.views} views</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
