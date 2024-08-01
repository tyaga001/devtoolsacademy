import { motion } from 'framer-motion'

export default function BlogHeader({ title, date, views }) {
    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
        >
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            <div className="flex justify-center items-center space-x-4 text-gray-400">
                <time>{date}</time>
                <span>•</span>
                <span>{views} views</span>
            </div>
        </motion.header>
    )
}