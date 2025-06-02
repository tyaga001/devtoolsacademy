import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get("slug")

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 })
  }

  // Validate slug to prevent path traversal
  if (!slug.match(/^[a-zA-Z0-9-_]+$/)) {
    return NextResponse.json({ error: "Invalid slug format" }, { status: 400 })
  }

  const filePath = path.join(process.cwd(), "src/app/blog", slug, "page.mdx")

  try {
    const content = await fs.promises.readFile(filePath, "utf8")
    // Remove frontmatter and imports to get just the content
    const cleanContent = content
      .replace(/^---[\s\S]*?---/, "")
      // strip any import/export-from lines
      .replace(/^(?:import|export)[\s\S]*?from[\s\S]*?$/gm, "")
      // strip dynamic import() calls
      .replace(/import\([\s\S]*?\)/gm, "")
      .trim()

    return NextResponse.json({ content: cleanContent })
  } catch (error) {
    console.error(`Error reading file for slug ${slug}:`, error)
    return NextResponse.json({ error: "Failed to read file" }, { status: 500 })
  }
}
