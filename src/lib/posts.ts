import fs from 'fs'
import path from 'path'
import matter from "gray-matter"
import { serialize } from 'next-mdx-remote/serialize'
import { PrismaClient } from '@prisma/client'
import { calculateReadingTime } from './utils'

const prisma = new PrismaClient()
const postsDirectory = path.join(process.cwd(), 'posts')

export async function getAllPosts() {
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = await Promise.all(fileNames.map(async (fileName) => {
        const slug = fileName.replace(/\.(md|mdx)$/, '')

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
            description: data.description,
            date: data.date,
            views: postMeta.views
        }
    }))

    return allPostsData.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()))
}

export async function getPostBySlug(slug: string) {
    let fullPath = path.join(postsDirectory, `${slug}.mdx`)

    if (!fs.existsSync(fullPath)) {
        fullPath = path.join(postsDirectory, `${slug}.md`)
    }

    if (!fs.existsSync(fullPath)) {
        throw new Error(`No file found for slug: ${slug}`);
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    const readingTime = calculateReadingTime(content)

    try {
        const mdxSource = await serialize(content, {
            mdxOptions: {
                development: process.env.NODE_ENV === 'development'
            }
        })

        let postMeta = await prisma.post.findUnique({
            where: { slug },
        })

        if (!postMeta) {
            postMeta = await prisma.post.create({
                data: { slug, views: 0 },
            })
        }

        console.log('File contents:', fileContents)
        console.log('Parsed data:', data)
        console.log('Parsed content:', content)
        console.log('MDX Source:', mdxSource)

        return {
            slug,
            title: data.title,
            content: mdxSource,
            description: data.description,
            readingTime,
            views: postMeta.views,
            date: data.date,
        }
    } catch (error) {
        console.error('Error processing MDX:', error)
        throw error
    }
}

export async function incrementViewCount(slug: string) {
    await prisma.post.upsert({
        where: { slug },
        update: { views: { increment: 1 } },
        create: { slug, views: 1 },
    })
}