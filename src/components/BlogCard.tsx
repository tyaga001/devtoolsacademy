import React, { useState } from "react"
import { Link } from "next-view-transitions"
import { OptimizedImage } from "./ui/OptimizedImage"

interface BlogCardProps {
  title: string
  excerpt: string
  image: string
  slug: string
}

const BlogCard: React.FC<BlogCardProps> = ({ title, excerpt, image, slug }) => {
  const [isClicked, setIsClicked] = useState(false)

  const handleCardClick = () => {
    setIsClicked(true)
  }

  return (
    <Link href={`/blog/${slug}`} passHref>
      <div
        className={`cursor-pointer overflow-hidden bg-white shadow-md transition-all duration-300 ${isClicked ? "scale-[98%] opacity-80" : "hover:shadow-lg"}`}
        tabIndex={0}
        role="button"
        onKeyDown={(e) => e.key === "Enter" && handleCardClick()}
        onClick={handleCardClick}
      >
        <div className="relative h-48 w-full">
          <OptimizedImage
            src={image}
            alt={title}
            width={400}
            height={200}
            className="size-full object-cover"
          />
        </div>
        <div className="p-6">
          <h3 className="mb-2 text-xl font-semibold">{title}</h3>
          <p className="mb-4 text-neutral-600">{excerpt}</p>
          <span
            className="font-semibold text-purple-700 hover:underline"
            tabIndex={0}
            role="button"
            onKeyDown={(e) => e.key === "Enter" && setIsClicked(true)}
            onClick={(e) => {
              e.stopPropagation()
              setIsClicked(true)
            }}
          >
            Read More
          </span>
        </div>
      </div>
    </Link>
  )
}

export default BlogCard
