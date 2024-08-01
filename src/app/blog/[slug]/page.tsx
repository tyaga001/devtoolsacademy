import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPostBySlug } from '@/lib/posts'
import { notFound } from 'next/navigation'

export default async function BlogPost({ params }: { params: { slug: string } }) {
    const post = await getPostBySlug(params.slug)

    if (!post) {
        notFound()
    }

    return (
        <article className="prose dark:prose-invert lg:prose-xl mx-auto mt-8">
            <h1>{post.title}</h1>
            <p>{post.views} views</p>
            <MDXRemote source={post.content} />
        </article>
    )
}