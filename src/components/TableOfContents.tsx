// components/TableOfContents.tsx
"use client"

import React, { useState, useEffect } from 'react'

const TableOfContents: React.FC = () => {
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
            { rootMargin: '0% 0% -80% 0%' }
        )

        headingData.forEach((heading) => {
            const element = document.getElementById(heading.id)
            if (element) observer.observe(element)
        })

        return () => observer.disconnect()
    }, [])

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault()
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <nav className="sticky top-8">
            <h2 className="text-lg font-semibold mb-4 text-gray-200">TABLE OF CONTENTS</h2>
            <ul className="space-y-2 text-sm">
                {headings.map((heading) => (
                    <li
                        key={heading.id}
                        style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
                    >
                        <a
                        href={`#${heading.id}`}
                        onClick={(e) => handleClick(e, heading.id)}
                        className={`block py-1 transition-colors ${
                        activeId === heading.id
                            ? 'text-blue-400'
                            : 'text-gray-400 hover:text-blue-400'
                    }`}
                        >
                        {heading.text}
                    </a>
                    </li>
                    ))}
            </ul>
        </nav>
    )
}

export default TableOfContents