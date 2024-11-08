// @/lib/api/tools.ts
import { prisma } from '@/lib/prisma'
import { getGitHubRepoData } from '@/lib/github'
import type { Tool as PrismaTool, Category, Prisma } from '@prisma/client'

export type SortOption = 'stars' | 'newest' | 'oldest' | 'updated' | 'forks'

export type Tool = PrismaTool & {
    categories: Category[]
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
        // Build the where clause with proper Prisma types
        const where: Prisma.ToolWhereInput = {
            AND: [
                // Category filter
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