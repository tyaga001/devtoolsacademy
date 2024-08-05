"use client"

import React, { useState, useEffect } from 'react'

const TableOfContents: React.FC = () => {
    const [headings, setHeadings] = useState<Array<{ id: string; text: string; level: number }>>([])

    useEffect(() => {
        const elements = document.querySelectorAll('h2, h3, h4')
        const headingData = Array.from(elements).map((elem) => ({
            id: elem.id,
            text: elem.textContent || '',
            level: parseInt(elem.tagName[1]),
        }))
        setHeadings(headingData)
    }, [])

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
                            className="text-gray-400 hover:text-blue-400 transition-colors"
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
