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
          <div className="flex flex-col items-center gap-10 md:flex-row">
            <a
              href="https://getstream.io/?ref=devtoolsacademy.com"
              target="_blank"
            >
              <Image src={StreamLogo} alt="Stream Logo" height={40} />
            </a>
            <a
              href="https://coderabbit.ai/?ref=devtoolsacademy.com"
              target="_blank"
            >
              <Image src={CodeRabbitLogo} alt="CodeRabbit Logo" height={35} />
            </a>
            <Link
              href={"/sponsor/"}
              className="flex items-center gap-3 border border-dashed border-neutral-100/15 bg-neutral-900 px-6 py-3 outline-none transition-colors hover:bg-neutral-800 focus:bg-neutral-800"
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
