import { prisma } from '@/lib/prisma';

interface GitHubRepo {
    stargazers_count: number;
    forks_count: number;
    pushed_at: string;
    updated_at: string;
    description: string;
    topics: string[];
    homepage: string;
}

interface GitHubError {
    message: string;
    documentation_url: string;
}

class GitHubService {
    private token: string;
    private cache: Map<string, { data: GitHubRepo; timestamp: number }>;
    private CACHE_TTL = 3600000; // 1 hour in milliseconds

    constructor() {
        this.token = process.env.GITHUB_TOKEN || '';
        this.cache = new Map();
    }

    private getRepoIdentifier(url: string): { owner: string; repo: string } | null {
        try {
            const [owner, repo] = url
                .replace('https://github.com/', '')
                .split('/');
            return { owner, repo };
        } catch {
            return null;
        }
    }

    private async fetchRepoData(owner: string, repo: string): Promise<GitHubRepo> {
        const response = await fetch(
            `https://api.github.com/repos/${owner}/${repo}`,
            {
                headers: {
                    Accept: 'application/vnd.github.v3+json',
                    ...(this.token && { Authorization: `token ${this.token}` }),
                },
                // Remove next.js specific options
            }
        );

        if (!response.ok) {
            const error = await response.json() as GitHubError;
            throw new Error(`GitHub API Error: ${error.message}`);
        }

        return response.json();
    }

    private getCachedData(cacheKey: string) {
        const cached = this.cache.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
            return cached.data;
        }
        return null;
    }

    private setCachedData(cacheKey: string, data: GitHubRepo) {
        this.cache.set(cacheKey, {
            data,
            timestamp: Date.now(),
        });
    }

    async syncToolMetrics(toolId: string): Promise<boolean> {
        try {
            const tool = await prisma.tool.findUnique({
                where: { id: toolId },
                select: { githubUrl: true }
            });

            if (!tool?.githubUrl) return false;

            const repoInfo = this.getRepoIdentifier(tool.githubUrl);
            if (!repoInfo) return false;

            const cacheKey = `${repoInfo.owner}/${repoInfo.repo}`;
            let repoData = this.getCachedData(cacheKey);

            if (!repoData) {
                repoData = await this.fetchRepoData(repoInfo.owner, repoInfo.repo);
                this.setCachedData(cacheKey, repoData);
            }

            await prisma.tool.update({
                where: { id: toolId },
                data: {
                    stars: repoData.stargazers_count,
                    forks: repoData.forks_count,
                    lastCommit: new Date(repoData.pushed_at),
                    description: repoData.description || undefined,
                    websiteUrl: repoData.homepage || undefined,
                    updatedAt: new Date()
                }
            });

            return true;
        } catch (error) {
            console.error(`Failed to sync metrics for tool ${toolId}:`, error);
            return false;
        }
    }

    async syncAllTools() {
        const tools = await prisma.tool.findMany({
            where: {
                githubUrl: { not: null }
            },
            select: {
                id: true
            }
        });

        const results = await Promise.allSettled(
            tools.map(tool => this.syncToolMetrics(tool.id))
        );

        return {
            total: tools.length,
            succeeded: results.filter(r => r.status === 'fulfilled' && r.value).length,
            failed: results.filter(r => r.status === 'rejected' || (r.status === 'fulfilled' && !r.value)).length
        };
    }
}

// Create a singleton instance
export const githubService = new GitHubService();

// Utility functions
export async function syncGitHubMetrics(toolId: string) {
    return githubService.syncToolMetrics(toolId);
}

export async function syncAllGitHubMetrics() {
    return githubService.syncAllTools();
}