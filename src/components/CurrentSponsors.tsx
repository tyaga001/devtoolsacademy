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
import PluraiLogo from "@/assets/plurai.png"
import { Heart } from "lucide-react"
import { Link } from "next-view-transitions"

interface Props {}

type Sponsor = {
  id: string
  href: string
  logo: StaticImageData
  alt: string
}

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
  {
    id: "plurai",
    href: "https://www.plurai.ai/?ref=devtoolsacademy.com",
    logo: PluraiLogo,
    alt: "Plurai",
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
          <ul className="mx-auto flex max-w-6xl list-none flex-wrap items-center justify-center gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:gap-x-10 lg:gap-y-12">
            {sponsors.map(({ id, href, logo, alt }) => (
              <li
                key={id}
                className="flex basis-[45%] justify-center sm:basis-[30%] lg:basis-[22%]"
              >
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={alt}
                  className="group flex h-16 w-full items-center justify-center rounded-xl px-4 py-3 outline-none transition duration-200 hover:bg-white/[0.03] focus-visible:ring-2 focus-visible:ring-white/20 sm:h-20"
                >
                  <Image
                    src={logo}
                    alt={`${alt} logo`}
                    width={logo.width}
                    height={logo.height}
                    className="h-9 w-auto max-w-full object-contain object-center opacity-80 transition duration-200 group-hover:opacity-100 sm:h-10 lg:h-11"
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
