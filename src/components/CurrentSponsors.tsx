"use client"
import * as React from "react"
import Image from "next/image"

import StreamLogo from "@/assets/stream.png"
import CodeRabbitLogo from "@/assets/coderabbit.svg"
import { Heart } from "lucide-react"
import { Link } from "next-view-transitions"

interface Props {}

const CurrentSponsors: React.FC<Props> = () => {
  return (
    <section>
      <div className="mx-auto max-w-7xl">
        <div className="grid flex-1 place-content-center p-8">
          <div className="flex items-center gap-10">
            <Image src={StreamLogo} alt="Stream Logo" height={40} />
            <Image src={CodeRabbitLogo} alt="CodeRabbit Logo" height={35} />
            <Link
              href={"/sponsor/"}
              className="flex flex-cols items-center gap-3 border border-dashed border-neutral-100/15 px-6 py-3 bg-neutral-900 hover:bg-neutral-800"
            >
              <Heart size={18} />
              <span>Become a Sponsor</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CurrentSponsors
