import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const postSlug = searchParams.get("postSlug")

  if (!postSlug) {
    return NextResponse.json(
      { error: "Post slug is required" },
      { status: 400 }
    )
  }

  const comments = await prisma.comment.findMany({
    where: { postSlug: postSlug as string },
    include: { user: true },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(comments)
}

export async function POST(request: NextRequest) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { postSlug, content } = await request.json()

  if (!postSlug || !content) {
    return NextResponse.json(
      { error: "Post slug and content are required" },
      { status: 400 }
    )
  }

  const user = await prisma.blogUser.findUnique({ where: { id: userId } })

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  const comment = await prisma.comment.create({
    data: {
      content,
      postSlug,
      userId: user.id,
    },
    include: { user: true },
  })

  return NextResponse.json(comment, { status: 201 })
}
