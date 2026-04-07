"use client"
import * as React from "react"
import Image from "next/image"
import type { StaticImageData } from "next/image"

import StreamLogo from "@/assets/stream.png"
import CodeRabbitLogo from "@/assets/coderabbit.svg"
import EloqDataLogo from "@/assets/eloqdata.png"
import ClineLogo from "@/assets/cline.svg"
import OrchidsLogo from "@/assets/orchids.png"
import OumiWordmark from "@/assets/oumi-wordmark.svg"
import { Heart } from "lucide-react"
import { Link } from "next-view-transitions"

interface Props {}

type Sponsor = {
  id: string
  href: string
  logo: StaticImageData
  alt: string
}

/**
 * Row 1: Stream, CodeRabbit, Cline · Row 2: Orchids, Oumi (center), EloqData (last)
 * — 3 columns from `sm` up so Oumi sits in the middle of the second row.
 */
const sponsors: Sponsor[] = [
  {
    id: "stream",
    href: "https://getstream.io/?ref=devtoolsacademy.com",
    logo: StreamLogo,
    alt: "Stream",
  },
  {
    id: "coderabbit",
    href: "https://coderabbit.ai/?ref=devtoolsacademy.com",
    logo: CodeRabbitLogo,
    alt: "CodeRabbit",
  },
  {
    id: "cline",
    href: "https://cline.bot/?ref=devtoolsacademy.com",
    logo: ClineLogo,
    alt: "Cline",
  },
  {
    id: "orchids",
    href: "https://www.orchids.app/?ref=devtoolsacademy.com",
    logo: OrchidsLogo,
    alt: "Orchids",
  },
  {
    id: "oumi",
    href: "https://oumi.ai/?ref=devtoolsacademy.com",
    logo: OumiWordmark,
    alt: "Oumi",
  },
  {
    id: "eloqdata",
    href: "https://www.eloqdata.com/?ref=devtoolsacademy.com",
    logo: EloqDataLogo,
    alt: "EloqData",
  },
]

const CurrentSponsors: React.FC<Props> = () => {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-8">
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

        <div className="mb-16 rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-transparent px-4 py-10 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset] sm:px-8 md:py-12">
          <ul className="mx-auto grid max-w-6xl list-none grid-cols-2 place-items-center gap-x-6 gap-y-10 sm:grid-cols-3 sm:gap-x-8 lg:gap-y-14">
            {sponsors.map(({ id, href, logo, alt }) => (
              <li
                key={id}
                className="flex w-full max-w-[240px] justify-center sm:max-w-[260px]"
              >
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-full flex-col items-center justify-center rounded-xl px-3 py-2 outline-none ring-white/0 transition duration-200 hover:ring-2 hover:ring-white/10 focus-visible:ring-2 focus-visible:ring-white/20"
                >
                  <Image
                    src={logo}
                    alt={`${alt} logo`}
                    width={logo.width}
                    height={logo.height}
                    className="h-10 w-auto max-w-full object-contain object-center sm:h-11 lg:h-12"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

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
