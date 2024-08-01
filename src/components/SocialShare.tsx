import { motion } from 'framer-motion'
import { Twitter, Facebook, LinkedIn } from 'lucide-react'

export default function SocialShare({ url, title }) {
    const shareUrl = encodeURIComponent(`https://yourblog.com${url}`)
    const shareTitle = encodeURIComponent(title)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 flex justify-center space-x-4"
        >
            <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                <Twitter size={24} />
            </a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-500">
                <Facebook size={24} />
            </a>
            <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}`} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-600">
                <LinkedIn size={24} />
            </a>
        </motion.div>
    )
}