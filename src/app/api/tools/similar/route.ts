import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { SimilarRouteSchema } from '@/lib/ZodSchema';

export async function POST(req: NextRequest) {
  try {
    const { slug, tags, categories } = await req.json()

    const validatedFields = SimilarRouteSchema.safeParse({ slug, tags, categories })

    if (!validatedFields.success) {
      return NextResponse.json({ success: false, message: "Invalid review fields", validatedFields }, { status: 400 });
    }

    const [similarCategoriesTools, similarTagTools] = await Promise.all([
      prisma.tool.findMany({
        where: {
          AND: [
            { name: { notIn: [slug] } }, // Changed from 'not' to 'notIn'
            {
              categories: {
                hasSome: categories
              }
            }
          ]
        },
        select: { id: true, name: true, description: true, logo: true, categories: true, stars: true, forks: true, lastUpdated: true },
        take: 5
      }),
      prisma.tool.findMany({
        where: {
          AND: [
            { name: { notIn: [slug] } }, // Changed from 'not' to 'notIn'
            {
              tags: {
                hasSome: tags
              }
            }
          ]
        },
        select: { id: true, name: true, description: true, logo: true, categories: true, stars: true, forks: true, lastUpdated: true },
        take: 5
      })
    ])
    return NextResponse.json({
      similarTagTools,
      similarCategoriesTools
    }, { status: 200 });
  } catch (error: any) {
    console.error('Error in API:', error.response?.data || error.message);
    return NextResponse.json(
      { error: 'Error processing request. Please try again.' },
      { status: error.response?.status || 500 }
    );
  }
}
