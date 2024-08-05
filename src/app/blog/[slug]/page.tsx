// app/blog/[slug]/page.tsx
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPostBySlug, incrementViewCount } from '@/lib/posts'
import TableOfContents from '@/components/TableOfContents'

const components = {
    h2: (props: any) => <h2 id={props.children.toLowerCase().replace(/\s+/g, '-')} {...props} />,
    h3: (props: any) => <h3 id={props.children.toLowerCase().replace(/\s+/g, '-')} {...props} />,
    h4: (props: any) => <h4 id={props.children.toLowerCase().replace(/\s+/g, '-')} {...props} />,
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
    const post = await getPostBySlug(params.slug)
    await incrementViewCount(params.slug)

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <nav className="text-sm text-gray-400 mb-4">
                <a href="/" className="hover:text-gray-200">Home</a> {' > '}
                <a href="/blog" className="hover:text-gray-200">Tutorials</a> {' > '}
                <span className="text-gray-200">JavaScript</span>
            </nav>
            <h1 className="text-4xl font-bold mb-8 text-white">{post.title}</h1>
            <div className="flex flex-col lg:flex-row gap-12">
                <div className="lg:w-2/3">
                    <div className="prose prose-invert max-w-none">
                        <MDXRemote source={post.content} components={components} />
                    </div>
                </div>
                <aside className="lg:w-1/3">
                    <TableOfContents />
                </aside>
            </div>
        </div>
    )
}