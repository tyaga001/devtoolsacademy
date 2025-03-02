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
            <h1 className='text-lg text-center md:text-2xl  font-[200] text-white/50'>Go Ahead. Ask <b className='text-white font-bold'>AI</b> about anything related to this <b className='text-white font-bold'>Blog</b>.</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 w-full gap-5'>
                <div onClick={() => { handleSend(`Make me understand this blog : ${title}?`) }} className='px-4 py-5 border border-white/40 rounded-[14px] bg-black/70 text-sm font-[200] text-white/60 w-full hover:bg-black hover:scale-105 hover:text-white hover:border-white/90 duration-200 cursor-pointer'>
                    Make me understand this blog : {title}?
                </div>
                <div onClick={() => { handleSend(`What does "${description}" mean in this blog? `) }} className='px-4 py-5 border border-white/40 rounded-[14px] hover:scale-105 bg-black/70 text-sm font-[200] text-white/60 w-full hover:bg-black hover:text-white hover:border-white/90 duration-200 cursor-pointer'>
                    What does &quot;{description}&quot; mean in this blog?
                </div>
            </div>
        </div>
    )
}

