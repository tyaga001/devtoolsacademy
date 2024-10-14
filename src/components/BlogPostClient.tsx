'use client';

import React, { useState } from 'react';
import BlogChatInterface from '@/components/BlogChatInterface';
import { EyeIcon } from '@heroicons/react/24/outline';
import ViewCounter from '@/components/ViewCounter';
import { SocialMetadata } from '@/components/SocialMetadata';
import SocialShare from '@/components/SocialShare';

interface BlogPostClientProps {
    slug: string;
    title: string;
    publishedAt: string;
    initialViews: number;
    content: string;
    description: string;
    featuredImage: string;
}

const BlogPostClient: React.FC<BlogPostClientProps> = ({
                                                           slug,
                                                           title,
                                                           publishedAt,
                                                           initialViews,
                                                           content,
                                                           description,
                                                           featuredImage
                                                       }) => {
    const [showChat, setShowChat] = useState(false);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});
    };

    const baseUrl = 'https://devtoolsacademy.com';
    const postUrl = `${baseUrl}/blog/${slug}`;

    return (
        <>
            <SocialMetadata
                title={title}
                description={description}
                url={postUrl}
                image={`${baseUrl}${featuredImage}`}
                type="article"
            />
            <h1 className="text-4xl font-bold mb-4 text-white">{title}</h1>
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center space-x-4">
                    <span className="text-gray-400">{formatDate(publishedAt)}</span>
                    <button
                        onClick={() => setShowChat(true)}
                        className="text-blue-400 bg-blue-900 bg-opacity-30 hover:bg-opacity-50 transition-colors duration-200 text-sm px-4 py-2 rounded-full border border-blue-500"
                    >
                        Chat with Claude AI
                    </button>
                </div>
                <div className="flex items-center bg-gray-800 rounded-full px-3 py-1">
                    <EyeIcon className="w-5 h-5 mr-2 text-blue-400"/>
                    <ViewCounter slug={slug} initialViews={initialViews}/>
                </div>
            </div>
            <SocialShare url={`/blog/${slug}`} title={title} />
            {showChat && (
                <BlogChatInterface
                    blogContent={content}
                    onClose={() => setShowChat(false)}
                />
            )}
        </>
    );
};

export default BlogPostClient;