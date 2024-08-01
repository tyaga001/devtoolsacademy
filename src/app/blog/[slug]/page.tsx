import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug, incrementViewCount } from '@/lib/posts';

export default async function BlogPost({ params }: { params: { slug: string } }) {
    const post = await getPostBySlug(params.slug);
    await incrementViewCount(params.slug);

    return (
        <article className="prose dark:prose-invert lg:prose-xl mx-auto mt-8">
            <h1>{post.title}</h1>
            <p>{post.views} views • {post.publishedAt}</p>
            <MDXRemote source={post.content} />
        </article>
    );
}