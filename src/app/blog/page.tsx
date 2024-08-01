import { getAllPosts } from '@/lib/posts'
import { BlogCard } from '@/components/BlogCard'

export default async function BlogPage() {
    const posts = await getAllPosts()

    return (
        <div className="container py-8">
            <h1 className="text-4xl font-bold mb-8">Dev Tools Comparison Blog</h1>
            <div className="grid gap-6 md:grid-cols-2">
                {posts.map((post) => (
                    <BlogCard
                        key={post.slug}
                        title={post.title}
                        description={post.description}
                        date={post.date}
                        slug={post.slug}
                    />
                ))}
            </div>
        </div>
    )
}