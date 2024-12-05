import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    ExternalLink,
    Github,
    Star,
    GitFork,
    Clock
} from 'lucide-react'
import Image from 'next/image'

interface Category {
    id: string
    name: string
}

interface Tool {
    name: string
    logo: string
    description: string
    categories: Category[]
    websiteUrl: string
    githubUrl?: string
    stars: number
    forks: number
    lastCommit?: string
    updatedAt: string
}

interface ToolPageProps {
    params: {
        slug: string
    }
}

async function getToolData(slug: string): Promise<Tool> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/tools/${slug}`, {
            next: { revalidate: 60 }, // Cache for 1 minute
        })

        if (!res.ok) {
            if (res.status === 404) {
                return notFound()
            }
            throw new Error('Failed to fetch tool data')
        }

        return res.json()
    } catch (error) {
        console.error('Error fetching tool:', error)
        throw error
    }
}

export default async function ToolPage({ params }: ToolPageProps) {
    const tool = await getToolData(params.slug)

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid gap-8 md:grid-cols-3">
                {/* Left Column - Main Info */}
                <div className="md:col-span-2 space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="relative w-16 h-16 shrink-0">
                            <Image
                                src={tool.logo}
                                alt={tool.name}
                                fill
                                className="rounded-lg object-contain"
                            />
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold">{tool.name}</h1>
                            <div className="flex flex-wrap gap-2">
                                {tool.categories.map((category: Category) => (
                                    <Badge key={category.id} variant="secondary">
                                        {category.name}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>

                    <p className="text-lg text-gray-400">
                        {tool.description}
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Button asChild>
                            <a href={tool.websiteUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Visit Website
                            </a>
                        </Button>
                        {tool.githubUrl && (
                            <Button variant="outline" asChild>
                                <a href={tool.githubUrl} target="_blank" rel="noopener noreferrer">
                                    <Github className="mr-2 h-4 w-4" />
                                    View Source
                                </a>
                            </Button>
                        )}
                    </div>
                </div>

                {/* Right Column - Stats */}
                <div className="space-y-6">
                    <div className="rounded-lg border bg-card p-6 space-y-4">
                        <h2 className="text-xl font-semibold">Repository Stats</h2>
                        <div className="space-y-3">
                            {tool.githubUrl && (
                                <>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Star className="h-4 w-4" />
                                            <span>Stars</span>
                                        </div>
                                        <span>{tool.stars.toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <GitFork className="h-4 w-4" />
                                            <span>Forks</span>
                                        </div>
                                        <span>{tool.forks.toLocaleString()}</span>
                                    </div>
                                </>
                            )}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    <span>Last Updated</span>
                                </div>
                                <span>
                                    {tool.lastCommit
                                        ? new Date(tool.lastCommit).toLocaleDateString()
                                        : new Date(tool.updatedAt).toLocaleDateString()
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}