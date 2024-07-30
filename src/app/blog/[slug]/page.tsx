import { getPostBySlug, getAllPosts } from '../../../../lib/posts'
import { MDXRemote } from 'next-mdx-remote/rsc'

export default function BlogPost({ params }: { params: { slug: string } }) {
    const post = getPostBySlug(params.slug)

    if (!post) {
        return <div>Post not found</div>
    }

    return (
        <div>
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-400 mb-8">{post.views} views</p>
            <div className="prose prose-invert">
                <MDXRemote source={post.content} />
            </div>
        </div>
    )
}

export async function generateStaticParams() {
    const posts = getAllPosts()
    return posts.map((post) => ({
        slug: post.slug,
    }))
}