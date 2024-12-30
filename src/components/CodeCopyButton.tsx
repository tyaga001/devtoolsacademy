"use client"
import * as React from "react"

import { Check, Clipboard } from "lucide-react"

interface Props {
  code: string
}

const CodeCopyButton: React.FC<Props> = ({ code }) => {
  const [isCopied, setIsCopied] = React.useState(false)

  const copyToClipboard = React.useCallback(() => {
    navigator.clipboard.writeText(code)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }, [code])

  return (
    <button
      onClick={copyToClipboard}
      className="absolute -right-1 -top-4 flex size-8 items-center justify-center rounded bg-neutral-800 font-mono leading-none text-neutral-100 hover:bg-neutral-700 focus:bg-neutral-950 focus:outline-none"
    >
      {isCopied ? (
        <Check className="inline-block" size={16} />
      ) : (
        <Clipboard className="inline-block" size={16} />
      )}
    </button>
  )
}

export default CodeCopyButton
