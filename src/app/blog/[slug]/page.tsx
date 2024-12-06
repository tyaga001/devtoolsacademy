import Image from 'next/image';
import Link from 'next/link';
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc';
import { getPostBySlug, getViewCount, getAllPosts } from '@/lib/posts';
import TableOfContents from '@/components/TableOfContents';
import Breadcrumb from '@/components/Breadcrumb';
import CommentSection from '@/components/CommentSection';
import BlogPostClient from '@/components/BlogPostClient';
import ServerlessDiagram from '@/components/ServerlessDiagram';
import CodeBlock from '@/components/CodeBlock';
import { Callout } from '@/components/Callout';
import { Alert, AlertDescription } from '@/components/Alert';
import { MDXComponents } from 'mdx/types';

const generateId = (children: any) => {
    if (Array.isArray(children)) {
        children = children.join('');
    }
    return typeof children === 'string' ? children.toLowerCase().replace(/\s+/g, '-') : '';
};

const components = {
    h1: (props: any) => <h1 className="text-4xl font-bold mt-8 mb-4" {...props} />,
    h2: (props: any) => <h2 id={generateId(props.children)} className="text-3xl font-semibold mt-6 mb-3" {...props} />,
    h3: (props: any) => <h3 id={generateId(props.children)} className="text-2xl font-semibold mt-4 mb-2" {...props} />,
    h4: (props: any) => <h4 id={generateId(props.children)} className="text-xl font-semibold mt-3 mb-2" {...props} />,
    p: (props: any) => <p className="my-2" {...props} />,
    a: (props: any) => <Link className="text-blue-500 hover:underline" {...props} />,
    Image: (props: any) => <Image alt={`${props.alt || props.title || 'No Description Available.'} `} className="my-4" {...props} />,
    blockquote: (props: any) => <blockquote className="border-l-4 border-gray-300 pl-4 my-4 italic" {...props} />,
    ServerlessDiagram: ServerlessDiagram,
    code: CodeBlock,
    Callout: Callout,
    Alert: Alert,
    AlertDescription: AlertDescription,
    table: (props: any) => <table className="min-w-full border border-gray-300 my-4" {...props} />,
    th: (props: any) => <th className="border border-gray-300 px-4 py-2 bg-gray-100" {...props} />,
    td: (props: any) => <td className="border border-gray-300 px-4 py-2" {...props} />,
};

export default async function BlogPost({params}: { params: { slug: string } }) {
    const post = await getPostBySlug(params.slug);
    const initialViews = await getViewCount(params.slug);

    const breadcrumbItems = [
        {label: 'Home', href: '/'},
        {label: 'Blog', href: '/blog'},
        {label: post.title, href: `#`},
    ];

    return (
        <div className="max-w-5xl mx-auto px-4 py-12 relative">
            <Breadcrumb items={breadcrumbItems}/>
            <BlogPostClient
                slug={params.slug}
                title={post.title}
                publishedAt={post.publishedAt}
                initialViews={initialViews}
                content={post.content}
                description={post.description}
                featuredImage={post.featuredImage || '/T.png'}
            />
            <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-3/4">
                    <article className="prose prose-lg dark:prose-invert max-w-none">
                        <MDXRemote source={post.content} components={components as MDXComponents} />
                    </article>
                    <CommentSection postSlug={params.slug}/>
                </div>
                <aside className="lg:w-1/4 lg:pl-8">
                    <div className="sticky top-24">
                        <TableOfContents />
                    </div>
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