"use client"

import React, { useState, useEffect } from 'react';
import { useUser, SignInButton } from '@clerk/nextjs';
import { Comment, User } from '@prisma/client';

type CommentWithUser = Comment & { user: User };

const CommentSection: React.FC<{ postSlug: string }> = ({ postSlug }) => {
    const { isSignedIn, user } = useUser();
    const [comments, setComments] = useState<CommentWithUser[]>([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        fetchComments();
    }, [postSlug]);

    const fetchComments = async () => {
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
    };

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
            <h2 className="text-2xl font-bold mb-4 text-white">Comments</h2>
            {isSignedIn ? (
                <form onSubmit={handleSubmitComment} className="mb-6">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="w-full p-2 border rounded bg-gray-800 text-white"
                        placeholder="Write a comment..."
                    />
                    <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Post Comment
                    </button>
                </form>
            ) : (
                <div className="mb-6">
                    <p className="text-white mb-2">Please sign in to comment.</p>
                    <SignInButton mode="modal">
                        <button className="px-4 py-2 bg-white text-gray-900 rounded hover:bg-gray-200">
                            Sign in
                        </button>
                    </SignInButton>
                </div>
            )}
            <div className="space-y-4">
                {comments.map((comment) => (
                    <div key={comment.id} className="border-b border-gray-700 pb-4">
                        <div className="flex items-center mb-2">
                            <div className="w-10 h-10 rounded-full bg-blue-500 mr-3"></div>
                            <div>
                                <p className="font-bold text-white">{comment.user.name}</p>
                                <p className="text-gray-400 text-sm">{new Date(comment.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <p className="text-white">{comment.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentSection;