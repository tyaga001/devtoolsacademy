import { getTools } from '@/lib/api/tools'
import { Input } from "@/components/ui/input"
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Loading from './loading'

const ToolsGrid = dynamic(() => import('@/components/tools/ToolsGrid'), {
    loading: () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
                <div
                    key={i}
                    className="h-48 bg-gray-900/50 rounded-lg animate-pulse"
                />
            ))}
        </div>
    ),
})

export default async function ToolsPage() {
    const { tools } = await getTools()

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col gap-8">
                <section className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text">
                        Developer Tools Directory
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Discover and compare the best open-source alternatives for your tech stack.
                    </p>
                    <div className="max-w-xl mx-auto">
                        <Input
                            type="search"
                            placeholder="Search developer tools..."
                            className="bg-gray-900/50"
                        />
                    </div>
                </section>

                <Suspense fallback={<Loading />}>
                    <ToolsGrid tools={tools} />
                </Suspense>
            </div>
        </div>
    )
}