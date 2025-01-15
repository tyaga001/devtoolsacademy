import React from 'react'
import { motion } from "framer-motion";

interface BlogChatSuggestionProps {
    title: string,
    description: string,
    handleSend: (customPrompt?: string) => void
}
export const ChatSuggestions: React.FC<BlogChatSuggestionProps> = ({ title, description, handleSend }) => {





    return (
        <div className='w-full flex py-6 flex-col gap-6 items-center'>
            <h1 className='text-lg text-center md:text-2xl  font-[300] text-white/70'>Go Ahead. Ask <b className='text-white font-medium'>AI</b> about anything related to this <b className='text-white font-medium'>Blog</b>.</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 w-full gap-5'>
                <motion.div onClick={() => { handleSend(`Make me understand this blog : ${title}?`) }} initial={{ y: 20, opacity: 0 }} whileHover={{ scale: 1.05 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.1 }} exit={{ y: 20, opacity: 0 }} className='px-4 py-5 border border-white/40 rounded-[14px] bg-black/70 text-sm font-[200] text-white/60 w-full hover:bg-black hover:text-white/80 cursor-pointer'>
                    Make me understand this blog : {title}?
                </motion.div>
                <motion.div onClick={() => { handleSend(`What does "${description}" means in this blog? `) }} initial={{ y: 20, opacity: 0 }} whileHover={{ scale: 1.05 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.1 }} exit={{ y: 20, opacity: 0 }} className='px-4 py-5 border border-white/40 rounded-[14px] bg-black/70 text-sm font-[200] text-white/60 w-full hover:bg-black hover:text-white/80 cursor-pointer'>
                    What does &quot;{description}&quot; mean in this blog?
                </motion.div>
            </div>
        </div>
    )
}

