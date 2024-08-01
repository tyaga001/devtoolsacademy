import { getPostBySlug, incrementViewCount } from '@/lib/posts'
import { MDXContent } from '@/components/MDXComponents'

export default async function BlogPost({ params }: { params: { slug: string } }) {
    const post = await getPostBySlug(params.slug)
    await incrementViewCount(params.slug)

    return (
        <article className="container py-8 prose dark:prose-invert max-w-none">
            <h1 className="mb-4">{post.title}</h1>
            <p className="text-muted-foreground mb-8">{post.views} views • {post.date}</p>
            <MDXContent source={post.content} />
        </article>
    )
}