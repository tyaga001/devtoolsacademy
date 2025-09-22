import { MetadataRoute } from "next"

import { allBlogs } from "@/app/blog/data"
import { baseUrl } from "@/lib/metadata"
import prisma from "@/lib/prisma"

export const dynamic = "force-dynamic"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = allBlogs.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}/`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  // Fetch all tools directly from the database
  const tools = await prisma.tool.findMany()
  const toolPages = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.name}/`,
    lastModified: tool.updatedAt || tool.lastUpdated || new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/tools/`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contribute/`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/sponsor/`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/creator-partnerships/`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ]

  return [...staticRoutes, ...blogPosts, ...toolPages]
}
