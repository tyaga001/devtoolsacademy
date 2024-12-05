import { getToolBySlug } from '@/lib/api/tools'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(
    req: Request,
    { params }: { params: { slug: string } }
) {
    try {
        const tool = await getToolBySlug(params.slug)

        if (!tool) {
            return NextResponse.json(
                { error: 'Tool not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(tool, {
            headers: {
                'Cache-Control': 'no-store, max-age=0',
                'Content-Type': 'application/json',
            }
        })
    } catch (error) {
        console.error('API Error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch tool details' },
            { status: 500 }
        )
    }
}