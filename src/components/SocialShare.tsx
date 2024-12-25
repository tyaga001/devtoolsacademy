"use client"

import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa6"

interface SocialShareProps {
  url: string
  title: string
}

export default function SocialShare({ url, title }: SocialShareProps) {
  const shareUrl = encodeURIComponent(`https://devtoolsacademy.com${url}`)
  const shareTitle = encodeURIComponent(title)

  return (
    <div className="flex gap-3">
      <a
        href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-neutral-500 hover:text-blue-400 transition-colors duration-200"
      >
        <FaTwitter size={21} />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-neutral-500 hover:text-blue-600 transition-colors duration-200"
      >
        <FaFacebookF size={19} />
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-neutral-500 hover:text-blue-700 transition-colors duration-200 "
      >
        <FaLinkedinIn size={21} />
      </a>
    </div>
  )
}
