import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug, getViewCount, getAllPosts } from '@/lib/posts';
import TableOfContents from '@/components/TableOfContents';
import Breadcrumb from '@/components/Breadcrumb';
import CommentSection from '@/components/CommentSection';
import BlogPostClient from '@/components/BlogPostClient';

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
            />
            <div className="flex flex-col">
                <div className="w-full">
                    <div className="prose prose-invert max-w-none font-sans">
                        <MDXRemote source={post.content} components={components}/>
                    </div>
                    <CommentSection postSlug={params.slug}/>
                </div>
                <aside className="fixed top-1/4 right-4 w-64">
                    <TableOfContents/>
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