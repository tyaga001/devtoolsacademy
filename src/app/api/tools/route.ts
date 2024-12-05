import { getTools, type SortOption } from '@/lib/api/tools'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)

        const params = {
            category: searchParams.get('category') || undefined,
            search: searchParams.get('search') || undefined,
            sort: (searchParams.get('sort') as SortOption) || 'stars',
            limit: Math.min(parseInt(searchParams.get('limit') || '12'), 50),
            offset: parseInt(searchParams.get('offset') || '0')
        }

        const response = await getTools(params)

        return NextResponse.json(response, {
            headers: {
                'Cache-Control': 'no-store, max-age=0',
                'Content-Type': 'application/json',
            }
        })
    } catch (error) {
        console.error('API Error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch tools' },
            { status: 500 }
        )
    }
}