import { getMDXComponent } from 'next-mdx-remote/rsc'
import { getPostBySlug } from '@/lib/posts'

export default async function BlogPost({ params }: { params: { slug: string } }) {
    console.log("Params:", params); // Add this line
    const post = await getPostBySlug(params.slug)
    const Content = getMDXComponent(post.content)

    return (
        <article className="prose lg:prose-xl dark:prose-invert mx-auto">
            <h1>{post.title}</h1>
            <p>{post.views} views</p>
            <Content />
        </article>
    )
}