import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPostBySlug, incrementViewCount } from '@/lib/posts'
import { notFound } from 'next/navigation'

export default async function BlogPost({ params }: { params: { slug: string } }) {
    const post = await getPostBySlug(params.slug)
    await incrementViewCount(params.slug)

    if (!post) {
        return <div>Post not found</div>
    }

    return (
        <article className="prose dark:prose-invert lg:prose-xl mx-auto mt-8">
            <h1>{post.title}</h1>
            <p>{post.views} views</p>
            {post.content ? (
                <MDXRemote source={''} {...post.content} />
            ) : (
                <p>No content available</p>
            )}
        </article>
    )
}