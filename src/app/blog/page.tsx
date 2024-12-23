import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blogs | Dev Tools Academy',
  description: 'A special blog made for Developers.',
  openGraph: {
    title: 'Blogs | Dev Tools Academy',
    description: 'A special blog made for Developers.',
    url: process.env.NEXT_PUBLIC_BASE_URL,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=Blogs%20|%20DevToolsAcademy`,
        width: 1200,
        height: 639,
        alt: 'DevToolsAcademy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blogs | Dev Tools Academy',
    description: 'A special blog made for Developers.',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=Blogs%20|%20DevToolsAcademy`,
        width: 1200,
        height: 639,
        alt: 'DevToolsAcademy',
      },
    ],
  },
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
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
              {post.publishedAt} • {post.views} views
            </p>
            <p>{post.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
