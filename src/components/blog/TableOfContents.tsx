"use client"

import React from "react"

const TableOfContents: React.FC = () => {
  const [headings, setHeadings] = React.useState<
    Array<{ id: string; text: string; level: number }>
  >([])
  const [activeId, setActiveId] = React.useState("")

  React.useEffect(() => {
    const elements = document.querySelectorAll(
      "article h2, article h3, article h4"
    )
    const headingData = Array.from(elements).map((elem) => ({
      id: elem.id,
      text: elem.textContent || "",
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
      { rootMargin: "-100px 0% -80% 0%" }
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
      const yOffset = -100 // Adjust this value based on your fixed header height
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
      setActiveId(id)
    }
  }

  return (
    <nav className="max-w-xs overflow-y-auto px-4">
      <h2 className="mb-4 text-lg font-semibold tracking-tight text-neutral-300">
        Contents
      </h2>
      <ul className="space-y-2 text-sm">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 2) * 8}px` }}
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className={`block py-1 transition-colors ${
                activeId === heading.id
                  ? "text-neutral-200"
                  : "text-neutral-500 hover:text-neutral-200"
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
