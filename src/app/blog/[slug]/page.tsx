import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPostBySlug, incrementViewCount } from '@/lib/posts'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'

export default async function BlogPost({ params }: { params: { slug: string } }) {
    const post = await getPostBySlug(params.slug)
    await incrementViewCount(params.slug)

    return (
        <article className="prose prose-invert lg:prose-xl mx-auto">
            <Breadcrumb items={[
                { label: 'Blogs', href: '/blog' },
                { label: post.title, href: `/blog/${params.slug}` },
            ]} />
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex justify-between items-center mb-8">
                <time className="text-gray-400">{post.publishedAt}</time>
                <div className="flex items-center space-x-4">
                    <span>{post.views} views</span>
                    <Button variant="outline" size="sm">
                        Summarize with AI
                    </Button>
                </div>
            </div>
            <MDXRemote source={post.content} />
        </article>
    )
}