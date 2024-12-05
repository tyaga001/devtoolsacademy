import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid gap-8 md:grid-cols-3">
                <div className="md:col-span-2 space-y-6">
                    <div className="flex items-start gap-4">
                        <Skeleton className="w-16 h-16 rounded-lg" />
                        <div className="space-y-2 flex-1">
                            <Skeleton className="h-8 w-3/4" />
                            <div className="flex gap-2">
                                <Skeleton className="h-6 w-20" />
                                <Skeleton className="h-6 w-20" />
                            </div>
                        </div>
                    </div>
                    <Skeleton className="h-24 w-full" />
                    <div className="flex gap-4">
                        <Skeleton className="h-10 w-32" />
                        <Skeleton className="h-10 w-32" />
                    </div>
                </div>
                <div className="space-y-6">
                    <Skeleton className="h-[200px] w-full rounded-lg" />
                    <Skeleton className="h-[150px] w-full rounded-lg" />
                </div>
            </div>
        </div>
    )
}