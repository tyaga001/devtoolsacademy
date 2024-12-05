'use client';

import { Tool } from '@/lib/api/tools'
import ToolCard from './ToolCard'

interface ToolsGridProps {
    tools: Tool[]
}

export default function ToolsGrid({ tools = [] }: ToolsGridProps) {
    if (!tools.length) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-400">
                    No tools found. Try adjusting your search or filters.
                </p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
            ))}
        </div>
    )
}