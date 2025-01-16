"use client"

import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa6"

interface SocialShareProps {
  title: string
}

export default function SocialShare({ title }: SocialShareProps) {
  const shareUrl = encodeURIComponent(window.location.href)
  const shareTitle = encodeURIComponent(title)

  return (
    <div className="flex gap-3">
      <a
        href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-neutral-500 outline-none transition-colors duration-200 hover:text-blue-400 focus:text-blue-400"
      >
        <FaTwitter size={21} />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-neutral-500 outline-none transition-colors duration-200 hover:text-blue-600 focus:text-blue-600"
      >
        <FaFacebookF size={19} />
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-neutral-500 outline-none transition-colors duration-200 hover:text-blue-700 focus:text-blue-700"
      >
        <FaLinkedinIn size={21} />
      </a>
    </div>
  )
}
