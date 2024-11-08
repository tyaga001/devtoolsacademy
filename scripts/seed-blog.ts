#!/usr/bin/env ts-node
import main from '../prisma/seeds/blog';

main()
    .catch((error) => {
        console.error('Failed to seed blog posts:', error);
        process.exit(1);
    });