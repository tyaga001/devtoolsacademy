import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { RecentPosts } from '@/components/RecentPosts'
import AnimatedHero from '@/components/AnimatedHero'

export default async function Home() {
    const allPosts = await getAllPosts()
    const recentPosts = allPosts.slice(0, 2) // Get the two most recent posts

    return (
        <div>
            <AnimatedHero />
            <div className="container mx-auto px-4 py-8">
                <p className="text-xl mb-8">
                    Welcome to Dev Tools Compare, where we provide in-depth, unbiased comparisons of the
                    developer tools to help you make informed decisions for your SaaS.
                </p>
                <RecentPosts posts={recentPosts} />
            </div>
        </div>
    )
}