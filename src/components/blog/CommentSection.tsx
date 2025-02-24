"use client"

import React, { useState, useEffect, useCallback } from "react"
import { useUser, SignInButton } from "@clerk/nextjs"
import { Comment, BlogUser } from "@prisma/client"
import { FaGithub } from "react-icons/fa6"

type CommentWithUser = Comment & { user: BlogUser }

const CommentSection: React.FC = () => {
  const [slug, setSlug] = React.useState("")

  const { isSignedIn } = useUser()
  const [comments, setComments] = useState<CommentWithUser[]>([])
  const [newComment, setNewComment] = useState("")

  const humorousPlaceholders = [
    "Spill the tea on this post! ☕️",
    "Drop your thoughts like it's hot! 🔥",
    "Unleash your inner code critic! 🧐",
    "Time to debug this post! 🐛",
    "Your keyboard is mightier than the sword! ⌨️",
  ]

  const randomPlaceholder = () =>
    humorousPlaceholders[
      Math.floor(Math.random() * humorousPlaceholders.length)
    ]

  React.useEffect(() => {
    if (window) {
      const postSlug = window.location.pathname
        .replace("blog", "")
        .replaceAll("/", "")
      setSlug(postSlug)
    }
  }, [])

  const fetchComments = useCallback(async () => {
    if (slug.length > 0) {
      try {
        const response = await fetch(`/api/comments?postSlug=${slug}`)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const data = await response.json()
        setComments(data)
      } catch (error) {
        console.error("Failed to fetch comments:", error)
      }
    }
  }, [slug])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const response = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug, content: newComment }),
    })

    if (response.ok) {
      setNewComment("")
      fetchComments()
    }
  }

  return (
    <div className="">
      <div className="p-8">
        <h2 className="mb-4 text-2xl font-bold">Developer Chatter Box 💬</h2>
        <p className="text-neutral-500">
          Join the discussion. Share your thoughts on dev tools, give feedback
          on the post 💪
        </p>
      </div>
      <hr className="border-dashed border-neutral-100/10" />
      <div className="p-8">
        {isSignedIn ? (
          <form onSubmit={handleSubmitComment} className="mb-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full rounded border bg-neutral-950 p-2 text-neutral-200"
              placeholder={randomPlaceholder()}
            />
            <button
              type="submit"
              className="mt-2 rounded bg-blue-600 px-4 py-2 text-neutral-200 hover:bg-blue-700"
            >
              Deploy Comment 🚀
            </button>
          </form>
        ) : (
          <div>
            <p className="mb-4">
              Hey there, code whisperer. Sign in to join the conversation.
            </p>
            <SignInButton mode="modal">
              <button className="flex items-center gap-2 rounded bg-neutral-200 px-4 py-2 text-neutral-900 hover:bg-neutral-100">
                <FaGithub />
                <span>
                  Authenticate with GitHub (it&apos;s where the cool devs hang)
                  😎
                </span>
              </button>
            </SignInButton>
          </div>
        )}
        <div className="mt-4 space-y-4">
          {comments.length === 0 ? (
            <p className="text-sm text-neutral-400">
              Be the first to break the silence. Your comment could start a
              revolution (or at least a fun thread).
            </p>
          ) : (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="border-b border-neutral-700 pb-4"
              >
                <div className="mb-2 flex items-center">
                  <div className="mr-3 size-10 rounded-full bg-blue-500"></div>
                  <div>
                    <p className="font-bold text-neutral-200">
                      {comment.user.name}
                      <span className="text-sm text-neutral-400">
                        {" // Code Contributor"}
                      </span>
                    </p>
                    <p className="text-sm text-neutral-400">
                      {new Date(comment.createdAt).toLocaleDateString()} at{" "}
                      {new Date(comment.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <p className="text-neutral-200">{comment.content}</p>
                <div className="mt-2">
                  <button className="mr-2 text-neutral-400 hover:text-blue-500">
                    👍 Like
                  </button>
                  <button className="text-neutral-400 hover:text-blue-500">
                    ↩️ Reply
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <hr className="border-dashed border-neutral-100/10" />
      <div className="p-8">
        <div className="text-sm text-neutral-400">
          <span className="font-semibold">Remember:</span> Be kind, be
          constructive, and may your code always compile on the first try. 🍀
        </div>
      </div>
    </div>
  )
}

export default CommentSection
