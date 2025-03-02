"use client"

import React, { useState } from 'react';
import { EyeIcon } from '@heroicons/react/24/outline';
import BlogChatInterface from './blog/BlogChatInterface';
// import ViewCounter from '@/components/ViewCounter';
// import { SocialMetadata } from '@/components/SocialMetadata';
// import SocialShare from '@/components/SocialShare';

interface BlogPostClientProps {
    slug: string
    title: string
    publishedAt: string
    initialViews: number
    content: string
    description: string
    featuredImage: string
}

const BlogPostClient: React.FC<BlogPostClientProps> = ({
    slug,
    title,
    publishedAt,
    initialViews,
    content,
    description,
    featuredImage,
}) => {
    const [showChat, setShowChat] = useState(false)





    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const baseUrl = 'https://devtoolsacademy.com';
    const postUrl = `${baseUrl}/blog/${slug}`;

    return (
        <>
            {/* <SocialMetadata
                title={title}
                description={description}
                url={postUrl}
                image={`${baseUrl}${featuredImage}`}
                type="article"
            /> */}
            <h1 className="text-4xl font-bold mb-4 text-white">{title}</h1>
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center space-x-4">
                    <span className="text-gray-400">{formatDate(publishedAt)}</span> <p>•</p>
                    <button onClick={() => setShowChat(true)} className="inline-flex h-10 animate-shimmer items-center justify-center  border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 rounded-full text-sm ">
                        Summarize with AI
                    </button>
                </div>
                <div className="flex items-center bg-gray-800 rounded-full px-3 py-1">
                    <EyeIcon className="w-5 h-5 mr-2 text-blue-400" />
                    {/* <ViewCounter slug={slug} initialViews={initialViews} /> */}
                </div>
            </div>
            {/* <SocialShare url={`/blog/${slug}`} title={title} /> */}
            {showChat && (
                <BlogChatInterface
                    blogContent={content}
                    blogDescription={description}
                    blogTitle={title}
                    onClose={() => setShowChat(false)}
                />
            )}
        </>
    );
};

export default BlogPostClient
