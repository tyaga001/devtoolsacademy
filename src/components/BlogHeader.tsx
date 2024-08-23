'use client'

import { motion } from 'framer-motion'
import { formatDate } from '@/lib/utils'

interface BlogHeaderProps {
    title: string;
    publishedAt: string;
    views: number;
}

export default function BlogHeader({ title, publishedAt, views }: BlogHeaderProps) {
    const formattedDate = formatDate(new Date(publishedAt))

    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
        >
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            <div className="flex justify-center items-center space-x-4 text-gray-400">
                <time dateTime={publishedAt}>{formattedDate}</time>
                <span>•</span>
                <span>{views} views</span>
            </div>
        </motion.header>
    )
}