"use client"

import { Twitter, Facebook, Linkedin } from "lucide-react"

interface SocialShareProps {
  url: string
  title: string
}

export default function SocialShare({ url, title }: SocialShareProps) {
  const shareUrl = encodeURIComponent(`https://devtoolsacademy.com${url}`)
  const shareTitle = encodeURIComponent(title)

  return (
    <div className="flex space-x-4">
      <a
        href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-neutral-500 hover:text-blue-400 transition-colors duration-200"
      >
        <Twitter size={24} />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-neutral-500 hover:text-blue-600 transition-colors duration-200"
      >
        <Facebook size={24} />
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-neutral-500 hover:text-blue-700 transition-colors duration-200 "
      >
        <Linkedin size={24} />
      </a>
    </div>
  )
}
