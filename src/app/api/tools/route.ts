import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const tools = await prisma.tool.findMany();

    if (tools.length === 0) {
      return NextResponse.json(
        { message: 'No tools found' },
        { status: 404 }
      );
    }

    return NextResponse.json(tools);
  } catch (error: any) {
    console.error('Error in API:', error.response?.data || error.message);

    return NextResponse.json(
      { error: 'Error processing request. Please try again.' },
      { status: error.response?.status || 500 }
    );
  }
}
