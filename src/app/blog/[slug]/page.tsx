import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPostBySlug, getViewCount, getAllPosts } from '@/lib/posts'
import TableOfContents from '@/components/TableOfContents'
import Breadcrumb from '@/components/Breadcrumb'
import CommentSection from '@/components/CommentSection'
import ViewCounter from '@/components/ViewCounter'
import { EyeIcon } from '@heroicons/react/24/outline'

const generateId = (children: any) => {
    if (Array.isArray(children)) {
        children = children.join('');
    }
    return typeof children === 'string' ? children.toLowerCase().replace(/\s+/g, '-') : '';
};

const components = {
    h2: (props: any) => <h2 id={generateId(props.children)} {...props} />,
    h3: (props: any) => <h3 id={generateId(props.children)} {...props} />,
    h4: (props: any) => <h4 id={generateId(props.children)} {...props} />,
}

const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

export default async function BlogPost({ params }: { params: { slug: string } }) {
    const post = await getPostBySlug(params.slug)
    const initialViews = await getViewCount(params.slug)

    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Blog', href: '/blog' },
        { label: post.title, href: `#` },
    ]

    return (
        <div className="max-w-5xl mx-auto px-4 py-12 relative">
            <Breadcrumb items={breadcrumbItems} />
            <h1 className="text-4xl font-bold mb-4 text-white">{post.title}</h1>
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center space-x-4">
                    <span className="text-gray-400">{formatDate(new Date())}</span>
                    <button className="text-blue-500 text-sm px-2 py-1 rounded border border-blue-500">
                        summarize with ChatGPT
                    </button>
                </div>
                <div className="flex items-center text-gray-400">
                    <EyeIcon className="w-5 h-5 mr-2" />
                    <ViewCounter slug={params.slug} initialViews={initialViews} />
                </div>
            </div>
            <div className="flex flex-col">
                <div className="w-full">
                    <div className="prose prose-invert max-w-none font-sans">
                        <MDXRemote source={post.content} components={components} />
                    </div>
                    <CommentSection postSlug={params.slug} />
                </div>
                <aside className="fixed top-1/4 right-4 w-64">
                    <TableOfContents />
                </aside>
            </div>
        </div>
    )
}

export async function generateStaticParams() {
    const posts = await getAllPosts()
    return posts.map((post) => ({
        slug: post.slug,
    }))
}