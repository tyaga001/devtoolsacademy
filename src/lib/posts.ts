import prisma from './prisma'

export async function getAllPosts() {
    const posts = await prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
    })
    return posts
}

export async function getPostBySlug(slug: string) {
    const post = await prisma.post.findUnique({
        where: { slug },
    })
    return post
}