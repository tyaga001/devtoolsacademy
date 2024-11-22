import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {

  const searchParams = req.nextUrl.searchParams
  const reqPage = parseInt(searchParams.get('page') || '1', 10);
  const page = reqPage === 0 ? 1 : reqPage
  const perPage = 10

  try {
    const skip = (page - 1) * perPage;
    const take = perPage;

    const tools = await prisma.tool.findMany({
      skip,
      take,
      select: { id: true, name: true, description: true, logo: true, categories: true, stars: true, forks: true, lastUpdated: true },
    });

    const totalTools = await prisma.tool.count();
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
