"use client"
import * as React from "react"
import Image from "next/image"

import StreamLogo from "@/assets/stream.png"
import CodeRabbitLogo from "@/assets/coderabbit.svg"
import EloqDataLogo from "@/assets/eloqdata.png"
import ClineLogo from "@/assets/cline.svg"
import { Heart } from "lucide-react"
import { Link } from "next-view-transitions"

interface Props {}

const CurrentSponsors: React.FC<Props> = () => {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Our Amazing Sponsors
            </span>
          </h2>
          <p className="text-base text-neutral-400 md:text-lg">
            Supporting the future of developer tools education
          </p>
        </div>

        {/* Sponsors Grid */}
        <div className="mb-16 flex flex-wrap items-center justify-center gap-8 md:gap-12">
          <a
            href="https://getstream.io/?ref=devtoolsacademy.com"
            target="_blank"
            className="flex items-center transition-all hover:scale-105 hover:opacity-80"
            rel="noopener noreferrer"
          >
            <Image src={StreamLogo} alt="Stream Logo" height={40} />
          </a>
          <a
            href="https://coderabbit.ai/?ref=devtoolsacademy.com"
            target="_blank"
            className="flex items-center transition-all hover:scale-105 hover:opacity-80"
            rel="noopener noreferrer"
          >
            <Image src={CodeRabbitLogo} alt="CodeRabbit Logo" height={38} />
          </a>
          <a
            href="https://www.eloqdata.com/?ref=devtoolsacademy.com"
            target="_blank"
            className="flex items-center transition-all hover:scale-105 hover:opacity-80"
            rel="noopener noreferrer"
          >
            <Image src={EloqDataLogo} alt="EloqData Logo" height={52} />
          </a>
          <a
            href="https://cline.bot/?ref=devtoolsacademy.com"
            target="_blank"
            className="flex items-center transition-all hover:scale-105 hover:opacity-80"
            rel="noopener noreferrer"
          >
            <Image src={ClineLogo} alt="Cline Logo" height={45} />
          </a>
        </div>

        {/* Call to Action */}
        <div className="flex justify-center">
          <Link
            href={"/sponsor/"}
            className="group flex items-center gap-3 border border-dashed border-neutral-100/15 bg-neutral-900 px-8 py-4 outline-none transition-all hover:scale-105 hover:border-neutral-100/30 hover:bg-neutral-800 focus:bg-neutral-800"
          >
            <Heart
              size={20}
              className="transition-colors group-hover:text-red-400"
            />
            <span className="text-base font-medium">Become a Sponsor</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CurrentSponsors
