import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export default async function BlogPage() {
    const posts = await getAllPosts()

    return (
        <div>
            <h1 className="text-4xl font-bold mb-8 text-center">Dev Tools Comparison Blog</h1>
            <ul className="space-y-6">
                {posts.map((post) => (
                    <li key={post.slug} className="border-b border-gray-700 pb-4">
                        <Link href={`/blog/${post.slug}`} className="text-2xl font-semibold hover:text-gray-300">
                            {post.title}
                        </Link>
                        <p className="text-gray-400 mt-2">{post.views} views</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}