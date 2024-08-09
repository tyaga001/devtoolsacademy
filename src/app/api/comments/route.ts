import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const postSlug = searchParams.get('postSlug');

    if (!postSlug) {
        return NextResponse.json({ error: 'Post slug is required' }, { status: 400 });
    }

    const comments = await prisma.comment.findMany({
        where: { postSlug: postSlug as string },
        include: { user: true },
        orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(comments);
}

export async function POST(request: NextRequest) {
    const { userId } = getAuth(request);
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { postSlug, content } = await request.json();

    if (!postSlug || !content) {
        return NextResponse.json({ error: 'Post slug and content are required' }, { status: 400 });
    }

    const comment = await prisma.comment.create({
        data: {
            content,
            postSlug,
            userId,
        },
    });

    return NextResponse.json(comment, { status: 201 });
}