import React from "react"

interface CalloutProps {
  children: React.ReactNode
  type?: "info" | "warning" | "error"
}

export const Callout: React.FC<CalloutProps> = ({
  children,
  type = "info",
}) => {
  const styles = {
    info: "bg-blue-900/30 border-blue-500 text-blue-500",
    warning: "bg-yellow-900/30 border-yellow-500 text-yellow-500",
    error: "bg-red-900/30 border-red-500 text-red-500",
  }

  return <div className={`my-4 border-l-4 p-4 ${styles[type]}`}>{children}</div>
}
