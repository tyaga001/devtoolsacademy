"use client"

import React, { useEffect, useRef } from "react"
import mermaid from "mermaid"

mermaid.initialize({
  startOnLoad: true,
  theme: "default",
  securityLevel: "loose",
})

const SimplifiedMermaidDiagram = ({ chartContent }) => {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) {
      mermaid.contentLoaded()
    }
  }, [chartContent])

  return (
    <div className="mermaid" ref={ref}>
      {chartContent}
    </div>
  )
}

export default SimplifiedMermaidDiagram
