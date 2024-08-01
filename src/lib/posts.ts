import { getBlogPosts } from './mdx';
import { serialize } from 'next-mdx-remote/serialize';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllPosts() {
    const posts = getBlogPosts();
    return Promise.all(
        posts.map(async (post) => {
            const postMeta = await prisma.post.findUnique({
                where: { slug: post.slug },
            });

            if (!postMeta) {
                await prisma.post.create({
                    data: { slug: post.slug, views: 0 },
                });
            }

            return {
                slug: post.slug,
                title: post.metadata.title,
                publishedAt: post.metadata.publishedAt,
                summary: post.metadata.summary,
                views: postMeta?.views || 0,
            };
        })
    );
}

export async function getPostBySlug(slug: string) {
    const posts = getBlogPosts();
    const post = posts.find((p) => p.slug === slug);

    if (!post) {
        throw new Error(`Post not found: ${slug}`);
    }

    const mdxSource = await serialize(post.content);

    let postMeta = await prisma.post.findUnique({
        where: { slug },
    });

    if (!postMeta) {
        postMeta = await prisma.post.create({
            data: { slug, views: 0 },
        });
    }

    return {
        slug,
        title: post.metadata.title,
        content: mdxSource,
        publishedAt: post.metadata.publishedAt,
        summary: post.metadata.summary,
        views: postMeta.views,
    };
}

export async function incrementViewCount(slug: string) {
    await prisma.post.upsert({
        where: { slug },
        update: { views: { increment: 1 } },
        create: { slug, views: 1 },
    });
}