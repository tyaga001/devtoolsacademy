import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPostBySlug, incrementViewCount } from '@/lib/posts'
import BlogHeader from '@/components/BlogHeader'
import SocialShare from '@/components/SocialShare'

export default async function BlogPost({ params }: { params: { slug: string } }) {
    const post = await getPostBySlug(params.slug)
    await incrementViewCount(params.slug)

    return (
        <div className="container mx-auto px-4 py-8">
            <BlogHeader title={post.title} date={post.publishedAt} views={post.views} />
            <article className="prose dark:prose-invert mx-auto mt-8">
                <MDXRemote source={post.content} />
            </article>
            <SocialShare url={`/blog/${params.slug}`} title={post.title} />
        </div>
    )
}