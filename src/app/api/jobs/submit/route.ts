import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

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
      // Payment fields (for future Stripe integration)
      // paymentIntentId, // TODO: Use for Stripe integration
      paymentStatus,
    } = body

    // Validation
    if (
      !title ||
      !company ||
      !location ||
      !description ||
      !applyUrl ||
      !contactEmail
    ) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          required: [
            "title",
            "company",
            "location",
            "description",
            "applyUrl",
            "contactEmail",
          ],
        },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(contactEmail)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Validate URL format
    const urlRegex = /^https?:\/\/.+/
    if (!urlRegex.test(applyUrl)) {
      return NextResponse.json(
        {
          error:
            "Invalid apply URL format. Must start with http:// or https://",
        },
        { status: 400 }
      )
    }

    // Generate unique slug
    const baseSlug = `${title}-${company}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

    // Check if slug exists and make it unique
    let slug = baseSlug
    let counter = 1
    while (await prisma.job.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`
      counter++
    }

    // Set expiration date (30 days from now)
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 30)

    // Create job submission
    const job = await prisma.job.create({
      data: {
        title: title.trim(),
        company: company.trim(),
        companyLogo: companyLogo?.trim() || null,
        location: location.trim(),
        type: type || "FULL_TIME",
        salary: salary?.trim() || null,
        description: description.trim(),
        requirements: requirements || [],
        benefits: benefits || [],
        applyUrl: applyUrl.trim(),
        contactEmail: contactEmail.trim().toLowerCase(),
        categories: categories || [],
        tags: tags || [],
        featured: featured && paymentStatus === "succeeded", // Only featured if payment succeeded
        slug,
        expiresAt,
        active: true,
        approved: false, // Requires manual approval
      },
    })

    // TODO: Send email notification to admin about new job submission
    // TODO: Send confirmation email to company

    return NextResponse.json(
      {
        success: true,
        message:
          "Job submitted successfully! It will be reviewed and published within 24 hours.",
        job: {
          id: job.id,
          slug: job.slug,
          title: job.title,
          company: job.company,
          status: "pending_approval",
        },
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error("Error submitting job:", error)

    // Handle unique constraint violations
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "A job with this title and company already exists" },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: "Error submitting job. Please try again." },
      { status: 500 }
    )
  }
}
