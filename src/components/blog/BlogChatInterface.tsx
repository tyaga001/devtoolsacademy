import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Send, X, Loader2 } from "lucide-react"

interface ChatMessage {
  role: "human" | "assistant"
  content: string
}

interface BlogChatInterfaceProps {
  blogContent: string
  onClose: () => void
}

const BlogChatInterface: React.FC<BlogChatInterfaceProps> = ({
  blogContent,
  onClose,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: ChatMessage = { role: "human", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: blogContent, query: input }),
      })

      if (!response.ok) throw new Error("Failed to get response")

      const data = await response.json()
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.answer },
      ])
    } catch (error) {
      console.error("Error in chat:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ])
    } finally {
      setIsLoading(false)
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
                className={`flex ${msg.role === "human" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] rounded-lg px-3 py-1.5 text-neutral-200 ${
                    msg.role === "human" ? "bg-blue-500" : "bg-neutral-700"
                  }`}
                >
                  {msg.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
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
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="grow bg-neutral-800 px-3 py-2 text-neutral-300 focus:outline-none"
              placeholder="Ask about the blog..."
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="bg-blue-500 px-4 py-2 text-neutral-300 transition-colors hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
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
