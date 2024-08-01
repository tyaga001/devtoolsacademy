import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPostBySlug, incrementViewCount } from '@/lib/posts'
import BlogHeader from '@/components/BlogHeader'
import TableOfContents from '@/components/TableOfContents'
import SocialShare from '@/components/SocialShare'

export default async function BlogPost({ params }: { params: { slug: string } }) {
    const post = await getPostBySlug(params.slug)
    await incrementViewCount(params.slug)

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <BlogHeader title={post.title} date={post.publishedAt} views={post.views} />
            <div className="mt-8 flex gap-8">
                <aside className="w-64 hidden lg:block">
                    <TableOfContents content={post.content} />
                </aside>
                <article className="prose prose-invert lg:prose-xl flex-grow">
                    <MDXRemote source={post.content} />
                </article>
            </div>
            <SocialShare url={`/blog/${params.slug}`} title={post.title} />
        </div>
    )
}