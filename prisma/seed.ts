import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
    }
];

const tools = [
    {
        name: 'Supabase',
        slug: 'supabase',
        description: 'The open source Firebase alternative.',
        logo: '/tool-logos/supabase.png',
        websiteUrl: 'https://supabase.com',
        githubUrl: 'https://github.com/supabase/supabase',
        categories: ['backend', 'database']
    },
    {
        name: 'Neon',
        slug: 'neon',
        description: 'Serverless Postgres',
        logo: '/tool-logos/neon.png',
        websiteUrl: 'https://neon.tech',
        githubUrl: 'https://github.com/neondatabase/neon',
        categories: ['database']
    },
    {
        name: 'Grafana',
        slug: 'grafana',
        description: 'The open and composable observability platform.',
        logo: '/tool-logos/grafana.png',
        websiteUrl: 'https://grafana.com',
        githubUrl: 'https://github.com/grafana/grafana',
        categories: ['backend']
    }
];

async function main() {
    try {
        // Create categories first
        console.log('Creating categories...');
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
        );

        // Create tools
        console.log('Creating tools...');
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
            });
            console.log(`Created/Updated tool: ${tool.name}`);
        }

        console.log('Seed completed successfully!');
    } catch (error) {
        console.error('Seed error:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

main()
    .catch((error: Error) => {
        console.error(error);
        process.exit(1);
    });