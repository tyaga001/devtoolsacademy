'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function TableOfContents({ content }) {
    const [headings, setHeadings] = useState([])
    const [activeId, setActiveId] = useState('')

    useEffect(() => {
        const elements = document.querySelectorAll('h2, h3')
        const headingData = Array.from(elements).map(elem => ({
            id: elem.id,
            text: elem.textContent,
            level: elem.tagName === 'H2' ? 2 : 3
        }))
        setHeadings(headingData)

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id)
                    }
                })
            },
            { rootMargin: '0px 0px -40% 0px' }
        )

        elements.forEach(elem => observer.observe(elem))

        return () => observer.disconnect()
    }, [content])

    return (
        <nav className="sticky top-8">
            <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
            <ul className="space-y-2">
                {headings.map(heading => (
                    <motion.li
                        key={heading.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ marginLeft: `${(heading.level - 2) * 16}px` }}
                    >
                        <a
                            href={`#${heading.id}`}
                            className={`block py-1 px-2 rounded transition-colors ${
                                activeId === heading.id
                                    ? 'bg-blue-500 text-white'
                                    : 'hover:bg-gray-700'
                            }`}
                        >
                            {heading.text}
                        </a>
                    </motion.li>
                ))}
            </ul>
        </nav>
    )
}