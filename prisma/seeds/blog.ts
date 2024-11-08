import { PrismaClient } from '@prisma/client'

declare global {
    var prisma: PrismaClient | undefined
}

const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
    global.prisma = prisma
}

const blogPosts = [
    {
        slug: 'supabase-vs-clerk',
        views: 976
    },
    {
        slug: 'mongodb-vs-postgreSQL',
        views: 1867
    },
    {
        slug: 'state-of-databases-2024',
        views: 1578
    },
    {
        slug: 'neon-vs-supabase',
        views: 9765
    }
] as const;

async function main() {
    try {
        console.log('🌱 Seeding blog posts...');

        const results = await Promise.all(
            blogPosts.map(async (post) => {
                const result = await prisma.post.upsert({
                    where: { slug: post.slug },
                    update: {}, // Keep existing views if post exists
                    create: {
                        slug: post.slug,
                        views: post.views
                    }
                });
                console.log(`📝 Created/Updated post: ${post.slug}`);
                return result;
            })
        );

        console.log(`\n✅ Seeded ${results.length} blog posts successfully!`);
    } catch (error) {
        console.error('\n❌ Seed error:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

// Check if this is being run directly
if (require.main === module) {
    main()
        .catch((error) => {
            console.error(error);
            process.exit(1);
        });
}

export default main;