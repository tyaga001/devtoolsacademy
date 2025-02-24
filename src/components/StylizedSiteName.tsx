import React from "react"
import { Link } from "next-view-transitions"
import Image from "next/image"

const StylizedSiteName = () => {
  return (
    <Link href="/" className="group flex items-center space-x-2">
      <Image
        src="/images/T.png"
        alt="DevToolsAcademy Logo"
        width={40}
        height={40}
        className="rounded-full"
      />
      <div className="flex items-baseline">
        <span className="text-2xl font-extrabold tracking-tighter text-neutral-200 transition-colors duration-300 group-hover:text-purple-400">
          Dev
        </span>
        <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-lg font-bold tracking-tight text-transparent transition-colors duration-300 group-hover:from-purple-300 group-hover:to-pink-400">
          Tools
        </span>
        <span className="ml-0.5 text-sm font-medium tracking-wide text-neutral-300 transition-colors duration-300 group-hover:text-pink-300">
          Academy
        </span>
      </div>
    </Link>
  )
}

export default StylizedSiteName
