import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const job = await prisma.job.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
    })

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 })
    }

    // Only return active, approved, and non-expired jobs for public access
    if (!job.active || !job.approved || job.expiresAt < new Date()) {
      return NextResponse.json({ error: "Job not available" }, { status: 404 })
    }

    return NextResponse.json({ job }, { status: 200 })
  } catch (error: any) {
    console.error("Error fetching job:", error)
    return NextResponse.json(
      { error: "Error fetching job. Please try again." },
      { status: 500 }
    )
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
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
      featured,
      active,
      approved,
    } = body

    // Check if job exists
    const existingJob = await prisma.job.findUnique({
      where: { id },
    })

    if (!existingJob) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 })
    }

    // Update slug if title or company changed
    let slug = existingJob.slug
    if (title !== existingJob.title || company !== existingJob.company) {
      slug = `${title}-${company}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
    }

    const updatedJob = await prisma.job.update({
      where: { id },
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
        active,
        approved,
        slug,
      },
    })

    return NextResponse.json(
      {
        message: "Job updated successfully",
        job: updatedJob,
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("Error updating job:", error)
    return NextResponse.json(
      { error: "Error updating job. Please try again." },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Check if job exists
    const existingJob = await prisma.job.findUnique({
      where: { id },
    })

    if (!existingJob) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 })
    }

    // Soft delete by setting active to false
    await prisma.job.update({
      where: { id },
      data: {
        active: false,
      },
    })

    return NextResponse.json(
      { message: "Job deleted successfully" },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("Error deleting job:", error)
    return NextResponse.json(
      { error: "Error deleting job. Please try again." },
      { status: 500 }
    )
  }
}
