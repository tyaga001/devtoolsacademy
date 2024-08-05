'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const TableOfContents: React.FC<{ content: string }> = ({ content }) => {
    const [headings, setHeadings] = useState<Array<{ id: string; text: string; level: number }>>([])
    const [activeId, setActiveId] = useState('')

    useEffect(() => {
        const elements = document.querySelectorAll('h2, h3, h4')
        const headingData = Array.from(elements).map((elem) => ({
            id: elem.id,
            text: elem.textContent || '',
            level: parseInt(elem.tagName[1]),
        }))
        setHeadings(headingData)

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id)
                    }
                })
            },
            { rootMargin: '-20% 0% -35% 0%' }
        )

        elements.forEach((elem) => observer.observe(elem))

        return () => observer.disconnect()
    }, [content])

    return (
        <nav className="sticky top-8">
            <h2 className="text-xl font-semibold mb-4">TABLE OF CONTENTS</h2>
            <ul className="space-y-2">
                {headings.map((heading) => (
                    <motion.li
                        key={heading.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ marginLeft: `${(heading.level - 2) * 16}px` }}
                    >

                        href={`#${heading.id}`}
                        className={`block py-1 px-2 rounded transition-colors ${
                        activeId === heading.id
                            ? 'text-blue-400'
                            : 'text-gray-400 hover:text-white'
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

export default TableOfContents