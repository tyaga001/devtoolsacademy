import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    // Get all unique categories from active, approved jobs
    const jobs = await prisma.job.findMany({
      where: {
        active: true,
        approved: true,
        expiresAt: {
          gt: new Date(),
        },
      },
      select: {
        categories: true,
      },
    })

    // Flatten and count categories
    const categoryCount: { [key: string]: number } = {}

    jobs.forEach((job: any) => {
      job.categories.forEach((category: any) => {
        categoryCount[category] = (categoryCount[category] || 0) + 1
      })
    })

    // Convert to array and sort by count
    const categories = Object.entries(categoryCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)

    if (categories.length === 0) {
      return NextResponse.json(
        { message: "No job categories found" },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        categories,
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error(
      "Error in job categories API:",
      error.response?.data || error.message
    )

    return NextResponse.json(
      { error: "Error processing request. Please try again." },
      { status: error.response?.status || 500 }
    )
  }
}
