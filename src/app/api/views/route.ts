import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(request: NextRequest) {
  const { slug } = await request.json()

  try {
    const updatedPost = await prisma.post.update({
      where: { slug },
      data: { views: { increment: 1 } },
    })

    return NextResponse.json({ views: updatedPost.views })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update view count" },
      { status: 500 }
    )
  }
}
