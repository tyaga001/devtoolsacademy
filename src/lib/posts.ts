import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const postsDirectory = path.join(process.cwd(), 'posts')

export async function getAllPosts() {
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = await Promise.all(fileNames.map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, '')

        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data } = matter(fileContents)

        const postMeta = await prisma.post.findUnique({
            where: { slug },
            select: { views: true }
        })

        return {
            slug,
            title: data.title,
            views: postMeta?.views || 0
        }
    }))

    return allPostsData.sort((a, b) => (a.views > b.views ? -1 : 1))
}

export async function getPostBySlug(slug: string) {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const { data, content } = matter(fileContents)
    const mdxSource = await serialize(content)

    const postMeta = await prisma.post.findUnique({
        where: { slug },
        select: { views: true }
    })

    return {
        slug,
        title: data.title,
        content: mdxSource,
        views: postMeta?.views || 0
    }
}

export async function incrementViewCount(slug: string) {
    await prisma.post.upsert({
        where: { slug },
        update: { views: { increment: 1 } },
        create: { slug, views: 1 },
    })
}