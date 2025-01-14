import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// export async function GET(request: NextRequest) {
//   const { slug } = request.nextUrl.searchParams

//   try {
//     const post = await prisma.post.findUnique({
//       where: { slug },
//       select: { views: true },
//     })

//     if (!post) {
//       return NextResponse.json({ error: "Post not found" }, { status: 404 })
//     }

//     return NextResponse.json({ views: post.views })
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to retrieve view count" },
//       { status: 500 }
//     )
//   }
// }

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
