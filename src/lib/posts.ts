import { PrismaClient } from '@prisma/client'
import { serialize } from 'next-mdx-remote/serialize'

const prisma = new PrismaClient()

export async function getAllPosts() {
    const posts = await prisma.post.findMany({
        select: {
            slug: true,
            title: true,
            views: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    })
    return posts
}

export async function getPostBySlug(slug: string) {
    console.log("Received slug:", slug); // Add this line
    if (!slug) {
        throw new Error("Slug is undefined");
    }
    const post = await prisma.post.findUnique({
        where: { slug },
    })

    if (!post) {
        throw new Error(`Post not found: ${slug}`)
    }

    const mdxSource = await serialize(post.content)

    return {
        ...post,
        content: mdxSource,
    }
}