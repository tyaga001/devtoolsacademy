import React from "react"
import { AlertCircle } from "lucide-react"

const AlertDescription = ({ children }: { children: React.ReactNode }) => (
  <div className="text-sm">{children}</div>
)

const Alert = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="mb-4 flex items-center rounded-lg border border-blue-300 bg-blue-50 p-4 text-blue-800 dark:border-blue-800 dark:bg-neutral-950 dark:text-blue-400"
      role="alert"
    >
      <AlertCircle className="mr-3 inline size-5 shrink-0" />
      <div>{children}</div>
    </div>
  )
}

Alert.Description = AlertDescription

export { Alert, AlertDescription }
