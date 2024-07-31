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
        const slug = fileName.replace(/\.mdx?$/, '')

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
            views: postMeta.views
        }
    }))

    return allPostsData.sort((a, b) => (a.views > b.views ? -1 : 1))
}

export async function getPostBySlug(slug: string) {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const { data, content } = matter(fileContents)
    const mdxSource = await serialize(content)

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
        content: mdxSource,
        views: postMeta.views
    }
}

export async function incrementViewCount(slug: string) {
    await prisma.post.upsert({
        where: { slug },
        update: { views: { increment: 1 } },
        create: { slug, views: 1 },
    })
}