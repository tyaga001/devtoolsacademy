"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useUser, SignInButton } from '@clerk/nextjs';
import { Comment, BlogUser } from '@prisma/client';

type CommentWithUser = Comment & { user: BlogUser };

const CommentSection: React.FC<{ postSlug: string }> = ({ postSlug }) => {
    const { isSignedIn, user } = useUser();
    const [comments, setComments] = useState<CommentWithUser[]>([]);
    const [newComment, setNewComment] = useState('');

    const humorousPlaceholders = [
        "Spill the tea on this post! ☕️",
        "Drop your thoughts like it's hot! 🔥",
        "Unleash your inner code critic! 🧐",
        "Time to debug this post! 🐛",
        "Your keyboard is mightier than the sword! ⌨️",
    ];

    const randomPlaceholder = () => humorousPlaceholders[Math.floor(Math.random() * humorousPlaceholders.length)];

    const fetchComments = useCallback(async () => {
        try {
            const response = await fetch(`/api/comments?postSlug=${postSlug}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setComments(data);
        } catch (error) {
            console.error('Failed to fetch comments:', error);
        }
    }, [postSlug]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    const handleSubmitComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const response = await fetch('/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ postSlug, content: newComment }),
        });

        if (response.ok) {
            setNewComment('');
            fetchComments();
        }
    };

    return (
        <div className="mt-8 bg-gray-900 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-white">Developer Chatter Box 💬</h2>
            <p className="text-gray-300 mb-4">
                Join the discussion. Share your thoughts on dev tools, give feedback on the post 💪
            </p>
            {isSignedIn ? (
                <form onSubmit={handleSubmitComment} className="mb-6">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="w-full p-2 border rounded bg-gray-800 text-white"
                        placeholder={randomPlaceholder()}
                    />
                    <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Deploy Comment 🚀
                    </button>
                </form>
            ) : (
                <div className="mb-6">
                    <p className="text-white mb-2">
                        Hey there, code whisperer. Sign in to join the conversation.
                    </p>
                    <SignInButton mode="modal">
                        <button className="px-4 py-2 bg-white text-gray-900 rounded hover:bg-gray-200">
                            Authenticate with GitHub (it&apos;s where the cool devs hang) 😎
                        </button>
                    </SignInButton>
                </div>
            )}
            <div className="space-y-4">
                {comments.length === 0 ? (
                    <p className="text-gray-400 italic">
                        Be the first to break the silence. Your comment could start a revolution (or at least a fun thread).
                    </p>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id} className="border-b border-gray-700 pb-4">
                            <div className="flex items-center mb-2">
                                <div className="w-10 h-10 rounded-full bg-blue-500 mr-3"></div>
                                <div>
                                    <p className="font-bold text-white">
                                        {comment.user.name}
                                        <span className="text-gray-400 text-sm">{" // Code Contributor"}</span>
                                    </p>
                                    <p className="text-gray-400 text-sm">
                                        {new Date(comment.createdAt).toLocaleDateString()} at {new Date(comment.createdAt).toLocaleTimeString()}
                                    </p>
                                </div>
                            </div>
                            <p className="text-white">{comment.content}</p>
                            <div className="mt-2">
                                <button className="text-gray-400 hover:text-blue-500 mr-2">👍 Like</button>
                                <button className="text-gray-400 hover:text-blue-500">↩️ Reply</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="mt-6 text-center">
                <p className="text-gray-400">
                    Remember: Be kind, be constructive, and may your code always compile on the first try. 🍀
                </p>
            </div>
        </div>
    );
};

export default CommentSection;
