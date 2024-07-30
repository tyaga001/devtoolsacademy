import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getAllPosts() {
    const fileNames = fs.readdirSync(postsDirectory)
    return fileNames.map((fileName) => {
        const slug = fileName.replace(/\.md$/, '')
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data } = matter(fileContents)

        return {
            slug,
            title: data.title,
            views: data.views || 0,
        }
    })
}

export function getPostBySlug(slug: string) {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
        slug,
        title: data.title,
        views: data.views || 0,
        content,
    }
}