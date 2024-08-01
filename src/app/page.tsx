import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { RecentPosts } from '@/components/RecentPosts'

export default async function Home() {
    const allPosts = await getAllPosts()
    const recentPosts = allPosts.slice(0, 2) // Get the two most recent posts

    return (
        <div className="container py-8">
            <h1 className="text-4xl font-bold mb-4">We Compare Developer Tools</h1>
            <p className="text-xl mb-4">Unbiased Developer Tools Comparisons – Your One-Stop Resource</p>
            <p className="mb-8">
                Welcome to Dev Tools Compare, where we provide in-depth, unbiased comparisons of the
                developer tools to help you make informed decisions for your SaaS.
            </p>
            <RecentPosts posts={recentPosts} />
        </div>
    )
}