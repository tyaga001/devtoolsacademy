import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Loader2, User, BotIcon } from 'lucide-react';
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { ChatSuggestions } from './ChatSuggestions';
import DOMPurify from 'dompurify';
import parse from "html-react-parser";
import { useToast } from '@/hooks/use-toast';

interface ChatMessage {
    role: 'human' | 'assistant';
    content: string;
}

interface BlogChatInterfaceProps {
    blogContent: string;
    blogTitle: string;
    blogDescription: string;
    onClose: () => void;
}

const BlogChatInterface: React.FC<BlogChatInterfaceProps> = ({ blogContent, blogTitle, blogDescription, onClose }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
   const {toast} = useToast();
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async (customPrompt?: string) => {
        const promptToSend = customPrompt || input;
        if (!promptToSend.trim()) {
             toast({variant:'destructive',
                color:'gray',
                duration:1000,
                style:{background:'#7f1d1d',color:'white',border:'gray',borderRadius:'5px'},
                description:"Please enter valid input."
             })
             
            return;
        };

        const userMessage: ChatMessage = { role: 'human', content: promptToSend };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/summarize', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: blogContent, query: promptToSend }),
            });



            if (!response.ok) {
                const data = await response.json();
                setMessages(prev => [...prev, { role: 'assistant', content: "Error: " + data.error }]);
                return;

            }
            const data = await response.json();

            const responseAnswer = parseContent(data.answer);

            setMessages(prev => [...prev, { role: 'assistant', content: responseAnswer }]);
        } catch (error: any) {
            console.error('Error in chat:', error);
            setMessages(prev => [...prev, { role: 'assistant', content: "I have encountered some error. Please try again." }]);
        } finally {
            setIsLoading(false);
        }
    };
    const handleSummary = async () => {


        handleSend("Please Summarize this blog for me.")

    }
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-20 overflow-y-auto h-full w-full flex items-center justify-center p-4"
        >
            <motion.div
                className="bg-[#18181a] rounded-xl border-[1px] border-white/30 w-full max-w-4xl mx-auto shadow-md shadow-neutral-400/30 overflow-hidden"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                <div className="flex justify-between items-center bg-[#09090b] p-4 border-b-[1px] border-white/20 shadow-lg shadow-black">
                    <h2 className="text-3xl font-sans font-medium  flex-1 flex justify-center items-center gap-4 text-center  text-[#eaeaea]">Chat about the Blog <ChatBubbleLeftIcon className='w-7 h-7'></ChatBubbleLeftIcon></h2>
                    <button onClick={onClose} className="text-gray-300 hover:text-white">
                        <X size={24} />
                    </button>
                </div>
                <div className="ChatArea h-[400px] overflow-y-auto p-6 px-8 space-y-4 ">
                    <AnimatePresence>
                        {messages.length == 0 ? <ChatSuggestions title={blogTitle} description={blogDescription} handleSend={handleSend}></ChatSuggestions > : messages.map((msg, index) => (
                            <motion.div key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }} className='flex flex-col  gap-4 '>
                                <div className='flex gap-4 items-start'>
                                    <div className='min-w-12 min-h-12 border shadow-lg border-white/40 shadow-black flex items-center justify-center rounded-full bg-black'>
                                        {msg.role === "human" ? <User></User> : <BotIcon></BotIcon>}
                                    </div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className={`flex ${msg.role === 'human' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`max-w-full text-[16px] leading-relaxed tracking-wide shadow-lg shadow-black px-5 py-4 rounded-xl ${msg.role === 'human' ? 'bg-white/80 text-black/80' : 'bg-[#09090b] text-gray-200'
                                            }`}
                                        >
                                            {parse(msg.content)}
                                        </div>
                                    </motion.div>
                                </div>
                                <div className={`w-full h-[0.5px] ${index === messages.length - 1 ? "hidden" : "block"} bg-gray-500/50 my-3`}></div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex justify-start items-start gap-4"
                        >
                            <div className='min-w-12 min-h-12 border border-white flex items-center justify-center rounded-full bg-black'>
                                <BotIcon></BotIcon>
                            </div>
                            <div className="bg-[#09090b] shadow-lg shadow-black text-gray-200 p-3 rounded-[13px] flex items-center space-x-2">

                                <Loader2 className="animate-spin " size={18} />
                                <span>AI is thinking...</span>
                            </div>
                        </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <div className="p-4 bg-[#09090b] border-t-[1px] border-white/20">
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            className="flex-grow bg-[#09090b] text-white p-2 placeholder:text-[14px] placeholder:tracking-wide placeholder:text-white/80 rounded focus:outline-none focus:ring-[1px] focus:ring-gray-200/40 border shadow-lg shadow-black border-gray-200/10 placeholder:font-[200]"
                            placeholder="Ask about the blog..."
                        />
                        <button onClick={handleSummary} className='bg-white hidden md:block text-xs text-black hover:bg-white/60 rounded px-4 border border-black'>Summarize </button>

                        <button onClick={() => handleSend()}
                            disabled={isLoading} className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
                            <span className="absolute inset-0 overflow-hidden rounded-full">
                                <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                            </span>
                            <div className="relative w-12 h-12 flex justify-center items-center z-10 rounded-full bg-zinc-950  ring-1 ring-white/10 ">
                                <span>
                                    <Send size={18} />

                                </span>

                            </div>
                            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
                        </button>

                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};



const parseContent = (content: string) => {
    const formattedContent = content.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');


    const paragraphWrapped = formattedContent
        .split('\n\n')
        .map((line) => `<p>${line.trim()}</p>`)
        .join('');

    return DOMPurify.sanitize(paragraphWrapped);


};





export default BlogChatInterface;