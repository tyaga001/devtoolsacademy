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

        const postMeta = await prisma.post.upsert({
            where: { slug },
            update: {}, // This doesn't change anything if the record exists
            create: { slug, views: 0, title: data.title },
        })

        return {
            slug,
            title: data.title,
            views: postMeta.views
        }
    }))

    return allPostsData.sort((a, b) => (a.views > b.views ? -1 : 1))
}

export async function getPostBySlug(slug: string) {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const { data, content } = matter(fileContents)
    const mdxSource = await serialize(content)

    const postMeta = await prisma.post.upsert({
        where: { slug },
        update: {}, // This doesn't change anything if the record exists
        create: { slug, views: 0, title: data.title },
    })

    return {
        slug,
        title: data.title,
        content: mdxSource,
        views: postMeta.views,
    }
}

export async function incrementViewCount(slug: string) {
    await prisma.post.upsert({
        where: { slug },
        update: { views: { increment: 1 } },
        create: { slug, views: 1, title: '' }, // Provide an empty string as default title
    })
}