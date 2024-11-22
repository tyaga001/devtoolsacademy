import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Loader2 } from 'lucide-react';

interface ChatMessage {
    role: 'human' | 'assistant';
    content: string;
}

interface BlogChatInterfaceProps {
    blogContent: string;
    onClose: () => void;
}

const BlogChatInterface: React.FC<BlogChatInterfaceProps> = ({ blogContent, onClose }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: ChatMessage = { role: 'human', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/summarize', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: blogContent, query: input }),
            });


            if (!response.ok) {
                // throw new Error("Something went wrong")
                const data = await response.json();
                setMessages(prev => [...prev, { role: 'assistant', content: "Error: " + data.error }]);
                return;

            }
            const data = await response.json();
            console.log(data);

            setMessages(prev => [...prev, { role: 'assistant', content: data.answer }]);
        } catch (error: any) {
            console.error('Error in chat:', error);
            setMessages(prev => [...prev, { role: 'assistant', content: "I have encountered some error. Please try again." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center p-4"
        >
            <motion.div
                className="bg-gray-800 rounded-lg w-full max-w-2xl mx-auto shadow-xl overflow-hidden"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                <div className="flex justify-between items-center bg-gray-700 p-4">
                    <h2 className="text-xl font-bold text-white">Chat about the Blog</h2>
                    <button onClick={onClose} className="text-gray-300 hover:text-white">
                        <X size={24} />
                    </button>
                </div>
                <div className="h-96 overflow-y-auto p-4 space-y-4">
                    <AnimatePresence>
                        {messages.map((msg, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className={`flex ${msg.role === 'human' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-3/4 p-3 rounded-lg ${msg.role === 'human' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-200'
                                    }`}>
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
                            <div className="bg-gray-700 text-gray-200 p-3 rounded-lg flex items-center space-x-2">
                                <Loader2 className="animate-spin" size={18} />
                                <span>AI is thinking...</span>
                            </div>
                        </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <div className="p-4 bg-gray-700">
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            className="flex-grow bg-gray-600 text-white p-2 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Ask about the blog..."
                        />
                        <button
                            onClick={handleSend}
                            disabled={isLoading}
                            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-700"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default BlogChatInterface;