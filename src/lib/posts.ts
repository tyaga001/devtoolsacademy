import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const postsDirectory = path.join(process.cwd(), 'posts')

export async function getAllPosts() {
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = await Promise.all(fileNames.map(async (fileName) => {
        const slug = fileName.replace(/\.mdx$/, '')

        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data } = matter(fileContents)

        let postMeta = await prisma.post.findUnique({
            where: { slug },
        })

        if (!postMeta) {
            postMeta = await prisma.post.create({
                data: { slug, views: 0 },
            })
        }

        return {
            slug,
            title: data.title,
            publishedAt: data.publishedAt,
            summary: data.summary,
            views: postMeta.views
        }
    }))

    return allPostsData.sort((a, b) => (new Date(b.publishedAt) as any) - (new Date(a.publishedAt) as any))
}

export async function getPostBySlug(slug: string) {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const { data, content } = matter(fileContents)

    let postMeta = await prisma.post.findUnique({
        where: { slug },
    })

    if (!postMeta) {
        postMeta = await prisma.post.create({
            data: { slug, views: 0 },
        })
    }

    return {
        slug,
        title: data.title,
        content: content,
        publishedAt: data.publishedAt,
        summary: data.summary,
        views: postMeta.views,
    }
}

export async function incrementViewCount(slug: string) {
    await prisma.post.upsert({
        where: { slug },
        update: { views: { increment: 1 } },
        create: { slug, views: 1 },
    })
}