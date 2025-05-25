"use client"

import React, { useRef, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Send, X, Loader2 } from "lucide-react"
import { useChat } from "@ai-sdk/react"

interface BlogChatInterfaceProps {
  blogContent: string
  onClose: () => void
}

const BlogChatInterface: React.FC<BlogChatInterfaceProps> = ({
  blogContent,
  onClose,
}) => {
  const { messages, input, setInput, append, status } = useChat({
    body: {
      blogContent,
    },
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
    inputRef.current?.focus()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || status === "streaming") return
    const currentInput = input
    setInput("")
    append({ content: currentInput, role: "user" })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-neutral-600/50 backdrop-blur-md"
    >
      <motion.div
        className="mx-auto w-full max-w-2xl overflow-hidden border border-dashed border-neutral-100/15 bg-neutral-900 shadow-xl"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="flex items-center justify-between border-b border-dashed border-neutral-100/15 p-5">
          <h2 className="my-0 text-xl font-bold leading-none text-neutral-200">
            Chat about the Blog
          </h2>
          <button
            onClick={onClose}
            className="text-neutral-200 hover:text-neutral-400"
          >
            <X size={24} />
          </button>
        </div>
        <div className="h-96 space-y-4 overflow-y-auto p-4">
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] rounded-lg px-3 py-1.5 text-neutral-200 ${msg.role === "user" ? "bg-blue-500" : "bg-neutral-700"}`}
                >
                  {msg.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {status === "submitted" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="flex items-center space-x-2 rounded-lg bg-neutral-700 p-3 text-neutral-200">
                <Loader2 className="animate-spin" size={18} />
                <span>AI is thinking...</span>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4">
          <div className="flex border border-dashed border-neutral-100/15">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="grow bg-neutral-800 px-3 py-2 text-neutral-300 focus:outline-none"
              placeholder="Ask about the blog..."
              disabled={status === "streaming"}
            />
            <button
              onClick={handleSend}
              disabled={status === "streaming" || !input.trim()}
              className="bg-blue-500 px-4 py-2 text-neutral-300 transition-colors hover:bg-blue-600 focus:bg-blue-600 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default BlogChatInterface
