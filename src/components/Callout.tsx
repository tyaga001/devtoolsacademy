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
    info: "bg-blue-100 border-blue-500 text-blue-700",
    warning: "bg-yellow-100 border-yellow-500 text-yellow-700",
    error: "bg-red-100 border-red-500 text-red-700",
  }

  return <div className={`my-4 border-l-4 p-4 ${styles[type]}`}>{children}</div>
}
