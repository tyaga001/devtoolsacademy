import { NextResponse } from 'next/server';
import { syncAllGitHubMetrics } from '@/lib/api/github';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: Request) {
    // Verify cron secret if needed
    const authHeader = req.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const results = await syncAllGitHubMetrics();
        return NextResponse.json({
            success: true,
            ...results
        });
    } catch (error) {
        console.error('Cron sync failed:', error);
        return NextResponse.json({
            success: false,
            error: 'Sync failed'
        }, { status: 500 });
    }
}