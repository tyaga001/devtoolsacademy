import React from 'react'
import Link from 'next/link'
import { OptimizedImage } from './ui/OptimizedImage'

interface BlogCardProps {
    title: string
    excerpt: string
    image: string
    slug: string
}

const BlogCard: React.FC<BlogCardProps> = ({ title, excerpt, image, slug }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative w-full h-48">
                <OptimizedImage
                    src={image}
                    alt={title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600 mb-4">{excerpt}</p>
                <Link href={`/blog/${slug}`} className="text-purple-700 font-semibold hover:underline">
                    Read More
                </Link>
            </div>
        </div>
    )
}

export default BlogCard