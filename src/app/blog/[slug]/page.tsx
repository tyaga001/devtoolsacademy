import { getPostBySlug } from '../../../../lib/posts'
import { MDXRemote } from 'next-mdx-remote/rsc'

export default function BlogPost({ params }: { params: { slug: string } }) {
    const post = getPostBySlug(params.slug)

    if (!post) {
        return <div className="text-center text-2xl mt-20">Post not found</div>
    }

    return (
        <article className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-4 text-center">{post.title}</h1>
            <p className="text-gray-500 mb-8 text-center">{post.views} views</p>
            <div className="prose prose-invert prose-lg max-w-none">
                <MDXRemote source={post.content} />
            </div>
        </article>
    )
}