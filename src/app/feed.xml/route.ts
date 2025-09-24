import { allBlogs } from "@/app/blog/data"
import config from "@/lib/metadata"

const siteUrl = config.baseUrl

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")

export const revalidate = 3600

export async function GET() {
  const items = [...allBlogs]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .map((post) => {
      const postUrl = `${siteUrl}/blog/${post.slug}/`
      const pubDate = new Date(post.publishedAt).toUTCString()
      const description = escapeXml(post.description ?? post.excerpt ?? "")

      return `
        <item>
          <title>${escapeXml(post.title)}</title>
          <link>${postUrl}</link>
          <guid>${postUrl}</guid>
          <description>${description}</description>
          <pubDate>${pubDate}</pubDate>
        </item>
      `
    })
    .join("\n")

  const lastBuildDate = new Date(
    allBlogs[0]?.publishedAt ?? Date.now()
  ).toUTCString()

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>DevTools Academy</title>
      <link>${siteUrl}</link>
      <description>Developer tool comparisons, GTM strategies, and community insights.</description>
      <language>en</language>
      <lastBuildDate>${lastBuildDate}</lastBuildDate>
      ${items}
    </channel>
  </rss>`

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=UTF-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  })
}
