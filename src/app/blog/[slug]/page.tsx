import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPostBySlug, incrementViewCount } from '@/lib/posts'
import TableOfContents from '@/components/TableOfContents'

export default async function BlogPost({ params }: { params: { slug: string } }) {
    const post = await getPostBySlug(params.slug)
    await incrementViewCount(params.slug)

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <nav className="text-sm breadcrumbs mb-4">
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/blog">Blog</a></li>
                        <li>{post.title}</li>
                    </ul>
                </nav>
                <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                <div className="flex flex-col md:flex-row gap-12">
                    <div className="md:w-2/3">
                        <div className="prose prose-invert max-w-none">
                            <MDXRemote {...post.content} />
                        </div>
                    </div>
                    <aside className="md:w-1/3">
                        <TableOfContents content={post.content} />
                    </aside>
                </div>
            </div>
        </div>
    )
}