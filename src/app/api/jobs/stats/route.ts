import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    const [
      totalJobs,
      activeJobs,
      featuredJobs,
      recentJobs,
      jobsByType,
      jobsByLocation,
      topCompanies,
    ] = await Promise.all([
      // Total jobs ever created
      prisma.job.count(),

      // Currently active jobs
      prisma.job.count({
        where: {
          active: true,
          approved: true,
          expiresAt: { gt: now },
        },
      }),

      // Featured jobs
      prisma.job.count({
        where: {
          active: true,
          approved: true,
          featured: true,
          expiresAt: { gt: now },
        },
      }),

      // Jobs posted in last 30 days
      prisma.job.count({
        where: {
          createdAt: { gte: thirtyDaysAgo },
        },
      }),

      // Jobs by type
      prisma.job.groupBy({
        by: ["type"],
        where: {
          active: true,
          approved: true,
          expiresAt: { gt: now },
        },
        _count: {
          type: true,
        },
      }),

      // Jobs by location (top 10)
      prisma.job.groupBy({
        by: ["location"],
        where: {
          active: true,
          approved: true,
          expiresAt: { gt: now },
        },
        _count: {
          location: true,
        },
        orderBy: {
          _count: {
            location: "desc",
          },
        },
        take: 10,
      }),

      // Top companies by job count
      prisma.job.groupBy({
        by: ["company"],
        where: {
          active: true,
          approved: true,
          expiresAt: { gt: now },
        },
        _count: {
          company: true,
        },
        orderBy: {
          _count: {
            company: "desc",
          },
        },
        take: 10,
      }),
    ])

    // Format the data
    const stats = {
      overview: {
        totalJobs,
        activeJobs,
        featuredJobs,
        recentJobs,
      },
      breakdown: {
        byType: jobsByType.map((item) => ({
          type: item.type,
          count: item._count.type,
        })),
        byLocation: jobsByLocation.map((item) => ({
          location: item.location,
          count: item._count.location,
        })),
        topCompanies: topCompanies.map((item) => ({
          company: item.company,
          count: item._count.company,
        })),
      },
    }

    return NextResponse.json(
      {
        stats,
        generatedAt: now.toISOString(),
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("Error in job stats API:", error)

    return NextResponse.json(
      { error: "Error processing request. Please try again." },
      { status: 500 }
    )
  }
}
