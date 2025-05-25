import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get("slug")

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 })
  }

  try {
    const filePath = path.join(process.cwd(), "src/app/blog", slug, "page.mdx")
    const content = fs.readFileSync(filePath, "utf8")

    // Remove frontmatter and imports to get just the content
    const cleanContent = content
      .replace(/^---[\s\S]*?---/, "")
      .replace(/^import[\s\S]*?from[\s\S]*?$/gm, "")
      .trim()

    return NextResponse.json({ content: cleanContent })
  } catch (error) {
    console.error("Error reading blog content:", error)
    return NextResponse.json(
      { error: "Failed to fetch blog content" },
      { status: 500 }
    )
  }
}
