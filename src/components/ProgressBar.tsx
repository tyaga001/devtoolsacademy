"use client"
import * as React from "react"

const ProgressBar: React.FC = () => {
  const [scrollPercentage, setScrollPercentage] = React.useState(0)

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.body.scrollHeight - window.innerHeight
      const scrollProgress = (scrollTop / docHeight) * 100
      setScrollPercentage(scrollProgress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed left-0 top-0 z-50 h-1 w-full">
      <div
        className="h-full bg-blue-500 transition-all duration-150"
        style={{ width: `${scrollPercentage}%` }}
      />
    </div>
  )
}

export default ProgressBar
