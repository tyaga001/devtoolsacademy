import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const reqPage = parseInt(searchParams.get("page") || "1", 10)
  const page = isNaN(reqPage) || reqPage < 1 ? 1 : reqPage
  const perPage = 20
  const search = searchParams.get("search") || ""
  const categories = searchParams.get("categories")?.split(",") || []
  const tags = searchParams.get("tags")?.split(",") || []
  const location = searchParams.get("location") || ""
  const type = searchParams.get("type") || ""
  const featured = searchParams.get("featured") === "true"
  const sort = searchParams.get("sort") || "recent"

  try {
    const skip = (page - 1) * perPage
    const take = perPage

    const where: any = {
      active: true,
      approved: true,
      expiresAt: {
        gt: new Date(), // Only show non-expired jobs
      },
    }

    // Search in title, company, and description
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ]
    }

    // Filter by categories
    if (categories.length > 0) {
      where.categories = {
        hasSome: categories,
      }
    }

    // Filter by tags
    if (tags.length > 0) {
      where.tags = {
        hasSome: tags,
      }
    }

    // Filter by location
    if (location) {
      where.location = { contains: location, mode: "insensitive" }
    }

    // Filter by job type
    if (type) {
      where.type = type
    }

    // Filter by featured status
    if (featured) {
      where.featured = true
    }

    // Sorting options
    let orderBy: any = {}
    switch (sort) {
      case "salary":
        orderBy = { salary: "desc" }
        break
      case "company":
        orderBy = { company: "asc" }
        break
      case "featured":
        orderBy = [{ featured: "desc" }, { createdAt: "desc" }]
        break
      case "random":
        // For random ordering, we'll shuffle the results after fetching
        orderBy = { createdAt: "desc" }
        break
      case "recent":
      default:
        orderBy = { createdAt: "desc" }
    }

    const [jobs, totalJobs] = await Promise.all([
      (prisma as any).job.findMany({
        where,
        orderBy,
        skip,
        take,
        select: {
          id: true,
          title: true,
          company: true,
          companyLogo: true,
          location: true,
          type: true,
          salary: true,
          description: true,
          categories: true,
          tags: true,
          featured: true,
          slug: true,
          applyUrl: true,
          createdAt: true,
          expiresAt: true,
        },
      }),
      (prisma as any).job.count({ where }),
    ])

    // Shuffle jobs if random sorting is requested
    if (sort === "random") {
      // Fisher-Yates shuffle algorithm
      for (let i = jobs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[jobs[i], jobs[j]] = [jobs[j], jobs[i]]
      }
    }

    const totalPages = Math.ceil(totalJobs / perPage)

    if (jobs.length === 0) {
      return NextResponse.json({ message: "No jobs found" }, { status: 404 })
    }

    return NextResponse.json(
      {
        jobs,
        totalJobs,
        totalPages,
        currentPage: page,
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("Error in jobs API:", error.response?.data || error.message)

    return NextResponse.json(
      { error: "Error processing request. Please try again." },
      { status: error.response?.status || 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      title,
      company,
      companyLogo,
      location,
      type,
      salary,
      description,
      requirements,
      benefits,
      applyUrl,
      contactEmail,
      categories,
      tags,
      featured = false,
    } = body

    // Basic validation
    if (!title || !company || !location || !description || !applyUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Generate slug from title and company
    const slug = `${title}-${company}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

    // Set expiration date (30 days from now)
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 30)

    const job = await (prisma as any).job.create({
      data: {
        title,
        company,
        companyLogo,
        location,
        type,
        salary,
        description,
        requirements: requirements || [],
        benefits: benefits || [],
        applyUrl,
        contactEmail,
        categories: categories || [],
        tags: tags || [],
        featured,
        slug,
        expiresAt,
        active: true,
        approved: false, // Requires admin approval
      },
    })

    return NextResponse.json(
      {
        message: "Job created successfully",
        job: {
          id: job.id,
          slug: job.slug,
          title: job.title,
          company: job.company,
        },
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error("Error creating job:", error)

    return NextResponse.json(
      { error: "Error creating job. Please try again." },
      { status: 500 }
    )
  }
}
