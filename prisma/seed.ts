import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const categories = [
    {
        name: 'Frontend',
        slug: 'frontend',
        description: 'Frontend development tools and frameworks'
    },
    {
        name: 'Backend',
        slug: 'backend',
        description: 'Backend development tools and frameworks'
    },
    {
        name: 'Database',
        slug: 'database',
        description: 'Database systems and tools'
    },
    {
        name: 'DevOps',
        slug: 'devops',
        description: 'DevOps and infrastructure tools'
    },
    {
        name: 'Analytics',
        slug: 'analytics',
        description: 'Analytics and monitoring tools'
    },
    {
        name: 'Productivity',
        slug: 'productivity',
        description: 'Tools to improve developer productivity'
    },
    {
        name: 'Communication',
        slug: 'communication',
        description: 'Team communication and collaboration tools'
    }
]

const tools = [
    {
        name: 'Supabase',
        slug: 'supabase',
        description: 'The open source Firebase alternative. A powerful, scalable backend platform offering real-time databases, authentication, and serverless functions.',
        logo: '/tool-logos/supabase.png',
        websiteUrl: 'https://supabase.com',
        githubUrl: 'https://github.com/supabase/supabase',
        categories: ['backend', 'database']
    },
    {
        name: 'Neon',
        slug: 'neon',
        description: 'Serverless Postgres. Neon separates storage and compute to offer autoscaling, branching, and bottomless storage.',
        logo: '/tool-logos/neon.png',
        websiteUrl: 'https://neon.tech',
        githubUrl: 'https://github.com/neondatabase/neon',
        categories: ['database']
    },
    {
        name: 'Cal.com',
        slug: 'cal',
        description: 'Scheduling infrastructure for absolutely everyone. The open-source Calendly alternative.',
        logo: '/tool-logos/cal.png',
        websiteUrl: 'https://cal.com',
        githubUrl: 'https://github.com/calcom/cal.com',
        categories: ['productivity']
    },
    {
        name: 'ClickHouse',
        slug: 'clickhouse',
        description: 'Fast open-source column-oriented database management system for real-time analytics.',
        logo: '/tool-logos/clickhouse.png',
        websiteUrl: 'https://clickhouse.com',
        githubUrl: 'https://github.com/ClickHouse/ClickHouse',
        categories: ['database', 'analytics']
    },
    {
        name: 'Meilisearch',
        slug: 'meilisearch',
        description: 'Lightning-fast search engine that fits effortlessly into your apps.',
        logo: '/tool-logos/meilisearch.png',
        websiteUrl: 'https://www.meilisearch.com',
        githubUrl: 'https://github.com/meilisearch/meilisearch',
        categories: ['backend', 'database']
    },
    {
        name: 'Joplin',
        slug: 'joplin',
        description: 'Your secure, open-source note-taking companion with powerful organization features.',
        logo: '/tool-logos/joplin.png',
        websiteUrl: 'https://joplinapp.org',
        githubUrl: 'https://github.com/laurent22/joplin',
        categories: ['productivity']
    },
    {
        name: 'Rocket.Chat',
        slug: 'rocketchat',
        description: 'Enterprise-grade team chat solution with high standards for data protection.',
        logo: '/tool-logos/rocketchat.png',
        websiteUrl: 'https://rocket.chat',
        githubUrl: 'https://github.com/RocketChat/Rocket.Chat',
        categories: ['communication']
    },
    {
        name: 'PocketBase',
        slug: 'pocketbase',
        description: 'Open Source backend in a single file with realtime subscriptions, authentication and file storage.',
        logo: '/tool-logos/pocketbase.png',
        websiteUrl: 'https://pocketbase.io',
        githubUrl: 'https://github.com/pocketbase/pocketbase',
        categories: ['backend', 'database']
    },
    {
        name: 'Gitea',
        slug: 'gitea',
        description: 'A painless self-hosted Git service with powerful collaboration features.',
        logo: '/tool-logos/gitea.png',
        websiteUrl: 'https://gitea.io',
        githubUrl: 'https://github.com/go-gitea/gitea',
        categories: ['devops']
    },
    {
        name: 'Sentry',
        slug: 'sentry',
        description: 'Error tracking and performance monitoring for your entire stack.',
        logo: '/tool-logos/sentry.png',
        websiteUrl: 'https://sentry.io',
        githubUrl: 'https://github.com/getsentry/sentry',
        categories: ['devops', 'analytics']
    }
]

async function main() {
    try {
        // Create categories first
        console.log('Creating categories...')
        await Promise.all(
            categories.map(category =>
                prisma.category.upsert({
                    where: { slug: category.slug },
                    update: {},
                    create: {
                        name: category.name,
                        slug: category.slug,
                        description: category.description
                    }
                })
            )
        )

        // Create tools
        console.log('Creating tools...')
        for (const tool of tools) {
            await prisma.tool.upsert({
                where: { slug: tool.slug },
                update: {},
                create: {
                    name: tool.name,
                    slug: tool.slug,
                    description: tool.description,
                    logo: tool.logo,
                    websiteUrl: tool.websiteUrl,
                    githubUrl: tool.githubUrl,
                    categories: {
                        connect: tool.categories.map(slug => ({ slug }))
                    }
                }
            })
            console.log(`Created/Updated tool: ${tool.name}`)
        }

        console.log('Seed completed successfully!')
    } catch (error) {
        console.error('Seed error:', error)
        throw error
    } finally {
        await prisma.$disconnect()
    }
}

main()
    .catch((error: Error) => {
        console.error(error)
        process.exit(1)
    })