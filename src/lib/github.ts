const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

interface GitHubRepo {
    stargazers_count: number;
    forks_count: number;
    updated_at: string;
}

interface GitHubRepoError {
    message: string;
    documentation_url: string;
}

export async function getGitHubRepoData(githubUrl: string) {
    try {
        // Extract owner and repo from GitHub URL
        const [owner, repo] = githubUrl
            .replace('https://github.com/', '')
            .split('/');

        const response = await fetch(
            `https://api.github.com/repos/${owner}/${repo}`,
            {
                headers: {
                    Accept: 'application/vnd.github.v3+json',
                    ...(GITHUB_TOKEN && { Authorization: `token ${GITHUB_TOKEN}` }),
                },
                next: { revalidate: 3600 }, // Cache for 1 hour
            }
        );

        if (!response.ok) {
            const error = (await response.json()) as GitHubRepoError;
            throw new Error(error.message);
        }

        const data = (await response.json()) as GitHubRepo;

        return {
            stars: data.stargazers_count,
            forks: data.forks_count,
            lastUpdated: new Date(data.updated_at),
        };
    } catch (error) {
        console.error('Error fetching GitHub data:', error);
        return null;
    }
}