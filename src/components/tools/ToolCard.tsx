import type { Tool } from '@/lib/api/tools'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { GitForkIcon, StarIcon, Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface ToolCardProps {
    tool: Tool
}

export default function ToolCard({ tool }: ToolCardProps) {
    return (
        <Link href={`/tools/${tool.slug}`}>
            <Card className="h-full hover:border-blue-500/50 transition-colors">
                <CardHeader className="space-y-2">
                    <div className="flex items-center space-x-3">
                        <div className="relative w-10 h-10 shrink-0">
                            <Image
                                src={tool.logo}
                                alt={tool.name}
                                fill
                                className="rounded-lg object-contain"
                            />
                        </div>
                        <div className="min-w-0">
                            <h3 className="text-lg font-semibold truncate">{tool.name}</h3>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {tool.categories.map((category) => (
                            <Badge
                                key={category.id}
                                variant="secondary"
                                className="truncate max-w-[150px]"
                            >
                                {category.name}
                            </Badge>
                        ))}
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-gray-400 line-clamp-2">
                        {tool.description}
                    </p>
                </CardContent>
                <CardFooter>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                        {tool.githubUrl && (
                            <>
                                <div className="flex items-center space-x-1">
                                    <StarIcon className="h-4 w-4" />
                                    <span>{tool.stars.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <GitForkIcon className="h-4 w-4" />
                                    <span>{tool.forks.toLocaleString()}</span>
                                </div>
                            </>
                        )}
                        {tool.lastCommit && (
                            <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{new Date(tool.lastCommit).toLocaleDateString()}</span>
                            </div>
                        )}
                    </div>
                </CardFooter>
            </Card>
        </Link>
    )
}