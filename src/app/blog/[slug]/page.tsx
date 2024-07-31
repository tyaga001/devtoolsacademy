import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPostBySlug, incrementViewCount } from '@/lib/posts'

export default async function BlogPost({ params }: { params: { slug: string } }) {
    const post = await getPostBySlug(params.slug)
    await incrementViewCount(params.slug)

    return (
        <article className="prose lg:prose-xl dark:prose-invert mx-auto">
            <h1>{post.title}</h1>
            <p>{post.views} views</p>
            <MDXRemote {...post.content} />
        </article>
    )
}