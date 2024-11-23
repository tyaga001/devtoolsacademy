import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const reqPage = parseInt(searchParams.get('page') || '1', 10);
  const page = reqPage === 0 ? 1 : reqPage;
  const perPage = 4;
  const search = searchParams.get('search') || '';
  const categories = searchParams.get('categories')?.split(',') || [];
  const tags = searchParams.get('tags')?.split(',') || [];
  const sort = searchParams.get('sort') || 'recent';

  try {
    const skip = (page - 1) * perPage;
    const take = perPage;

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (categories.length > 0) {
      where.categories = {
        hasSome: categories
      };
    }

    if (tags.length > 0) {
      where.tags = {
        hasSome: tags
      };
    }

    let orderBy: any = {};
    switch (sort) {
      case 'popular':
        orderBy = { stars: 'desc' };
        break;
      case 'alphabetical':
        orderBy = { name: 'asc' };
        break;
      case 'recent':
      default:
        orderBy = { lastUpdated: 'desc' };
    }

    const [tools, totalTools] = await Promise.all([
      prisma.tool.findMany({
        where,
        orderBy,
        skip,
        take,
        select: {
          id: true,
          name: true,
          description: true,
          logo: true,
          categories: true,
          tags: true,
          stars: true,
          forks: true,
          lastUpdated: true
        },
      }),
      prisma.tool.count({ where })
    ]);

    const totalPages = Math.ceil(totalTools / perPage);

    if (tools.length === 0) {
      return NextResponse.json(
        { message: 'No tools found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      tools,
      totalPages
    }, { status: 200 });
  } catch (error: any) {
    console.error('Error in API:', error.response?.data || error.message);
    return NextResponse.json(
      { error: 'Error processing request. Please try again.' },
      { status: error.response?.status || 500 }
    );
  }
}
