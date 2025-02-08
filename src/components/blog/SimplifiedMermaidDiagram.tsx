"use client"

import * as React from "react"

import mermaid from "mermaid"

interface Props {
  chartContent: string
}

const SimplifiedMermaidDiagram: React.FC<Props> = ({ chartContent }) => {
  const ref = React.useRef(null)

  React.useEffect(() => {
    if (ref.current) {
      mermaid.initialize({
        startOnLoad: true,
        theme: "default",
        securityLevel: "loose",
      })
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
