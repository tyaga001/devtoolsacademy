import { prisma } from '@/lib/prisma'
import { getGitHubRepoData } from '@/lib/github'
import type { Tool as PrismaTool, Category, Prisma } from '@prisma/client'

export type SortOption = 'stars' | 'newest' | 'oldest' | 'updated' | 'forks'

type CategorySelect = {
    id: string
    name: string
    slug: string
    createdAt: Date
    description: string | null
    updatedAt: Date
}

export type Tool = PrismaTool & {
    categories: CategorySelect[]
}

interface ToolsParams {
    category?: string
    search?: string
    sort?: SortOption
    limit?: number
    offset?: number
}

interface ToolsResponse {
    tools: Tool[]
    total: number
    hasMore: boolean
}

export async function getTools({
                                   category,
                                   search,
                                   sort = 'stars',
                                   limit = 12,
                                   offset = 0
                               }: ToolsParams = {}): Promise<ToolsResponse> {
    try {
        const where: Prisma.ToolWhereInput = {
            AND: [
                category ? {
                    categories: {
                        some: {
                            slug: category
                        }
                    }
                } : {},
                // Search filter
                search ? {
                    OR: [
                        {
                            name: {
                                contains: search,
                                mode: 'insensitive' as Prisma.QueryMode
                            }
                        },
                        {
                            description: {
                                contains: search,
                                mode: 'insensitive' as Prisma.QueryMode
                            }
                        }
                    ]
                } : {}
            ]
        }

        const [tools, total] = await Promise.all([
            prisma.tool.findMany({
                where,
                include: {
                    categories: true,
                },
                take: limit,
                skip: offset,
                orderBy: getSortOrder(sort),
            }),
            prisma.tool.count({ where })
        ])

        // Fetch and update GitHub data
        const toolsWithGitHubData = await Promise.all(
            tools.map(async (tool) => {
                if (tool.githubUrl) {
                    try {
                        const githubData = await getGitHubRepoData(tool.githubUrl)

                        if (githubData) {
                            // Update the database with fresh GitHub data
                            await prisma.tool.update({
                                where: { id: tool.id },
                                data: {
                                    stars: githubData.stars,
                                    forks: githubData.forks,
                                    lastCommit: githubData.lastUpdated,
                                },
                            })

                            return {
                                ...tool,
                                stars: githubData.stars,
                                forks: githubData.forks,
                                lastCommit: githubData.lastUpdated,
                            }
                        }
                    } catch (error) {
                        console.error(`Error fetching GitHub data for ${tool.name}:`, error)
                    }
                }
                return tool
            })
        )

        return {
            tools: toolsWithGitHubData,
            total,
            hasMore: offset + toolsWithGitHubData.length < total
        }
    } catch (error) {
        console.error('Error fetching tools:', error)
        throw error
    }
}

export async function getToolBySlug(slug: string): Promise<Tool | null> {
    try {
        const tool = await prisma.tool.findUnique({
            where: { slug },
            include: {
                categories: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                        createdAt: true,
                        description: true,
                        updatedAt: true,
                    },
                },
            },
        })

        if (!tool) {
            return null
        }

        if (tool.githubUrl) {
            try {
                const githubData = await getGitHubRepoData(tool.githubUrl)
                if (githubData) {
                    const updatedTool = await prisma.tool.update({
                        where: { id: tool.id },
                        data: {
                            stars: githubData.stars,
                            forks: githubData.forks,
                            lastCommit: githubData.lastUpdated,
                        },
                        include: {
                            categories: {
                                select: {
                                    id: true,
                                    name: true,
                                    slug: true,
                                    createdAt: true,
                                    description: true,
                                    updatedAt: true,
                                },
                            },
                        },
                    })
                    return updatedTool as Tool
                }
            } catch (error) {
                console.error(`Error fetching GitHub data for ${tool.name}:`, error)
            }
        }

        return tool as Tool
    } catch (error) {
        console.error('Error fetching tool:', error)
        return null
    }
}

function getSortOrder(sort: SortOption): Prisma.ToolOrderByWithRelationInput {
    switch (sort) {
        case 'newest':
            return { createdAt: 'desc' }
        case 'oldest':
            return { createdAt: 'asc' }
        case 'updated':
            return { lastCommit: 'desc' }
        case 'forks':
            return { forks: 'desc' }
        case 'stars':
        default:
            return { stars: 'desc' }
    }
}