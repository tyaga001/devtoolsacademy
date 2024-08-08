"use client"

import React, { useState, useEffect } from 'react';
import { useUser, useAuth } from '@clerk/nextjs';
import { Comment } from '@prisma/client';

const CommentSection: React.FC<{ postSlug: string }> = ({ postSlug }) => {
    const { isSignedIn, user } = useUser();
    const { getToken } = useAuth();
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        fetchComments();
    }, [postSlug]);

    const fetchComments = async () => {
        const response = await fetch(`/api/comments?postSlug=${postSlug}`);
        const data = await response.json();
        setComments(data);
    };

    const handleSubmitComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const token = await getToken();
        const response = await fetch('/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ postSlug, content: newComment }),
        });

        if (response.ok) {
            setNewComment('');
            fetchComments();
        }
    };

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Comments</h2>
            {isSignedIn ? (
                <form onSubmit={handleSubmitComment} className="mb-4">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Write a comment..."
                    />
                    <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
                        Post Comment
                    </button>
                </form>
            ) : (
                <p>Please sign in to comment.</p>
            )}
            <div className="space-y-4">
                {comments.map((comment) => (
                    <div key={comment.id} className="border-b pb-2">
                        <p className="font-bold">{comment.user.name}</p>
                        <p>{comment.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentSection;
