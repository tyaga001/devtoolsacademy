import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPostBySlug, incrementViewCount } from '@/lib/posts'

export default async function BlogPost({ params }: { params: { slug: string } }) {
    const post = await getPostBySlug(params.slug)
    await incrementViewCount(params.slug)

    return (
        <article className="prose lg:prose-xl dark:prose-invert mx-auto p-4 text-white">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-400 mb-8">{post.views} views</p>
            <div className="mt-8">
                <MDXRemote source={''} {...post.content} />
            </div>
        </article>
    )
}