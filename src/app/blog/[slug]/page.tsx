// @ts-ignore
import prisma from './prisma'

export async function getAllPosts() {
    let posts: any;
    posts = await prisma.post.findMany({
        orderBy: {createdAt: 'desc'},
        select: {
            slug: true,
            title: true,
            views: true,
        },
    });
    return posts
}

export async function getPostBySlug(slug: string) {
    let post: any;
    post = await prisma.post.findUnique({
        where: {slug},
    });
    return post
}