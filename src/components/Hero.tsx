"use client"

import React from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

import StreamLogo from "@/assets/stream.png"
import CodeRabbitLogo from "@/assets/coderabbit.svg"
import Image from "next/image"

const productHuntBadgeHtml = `<a href="https://www.producthunt.com/posts/dev-tools-academy?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-dev&#0045;tools&#0045;academy" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=493913&theme=light" alt="Dev&#0032;Tools&#0032;Academy - A&#0032;special&#0032;blog&#0032;made&#0032;for&#0032;Developers&#0046; | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>`

const Hero: React.FC = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black to-pink-900/20" />
      <div className="absolute inset-0 opacity-50">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
            }}
          />
        ))}
      </div>
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center justify-center px-4 text-center text-white">
        <div className="mb-5 flex items-center justify-center gap-2 md:gap-0">
          <a
            href="https://news.ycombinator.com/item?id=41223327#41246861"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-[40px] items-center gap-1.5 rounded-lg bg-[#ff7600] px-3 text-xs font-bold text-white transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-1 inline-block size-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M0 24V0h24v24H0zM6.951 5.896l4.112 7.708v5.064h1.583v-4.972l4.148-7.799h-1.749l-2.457 4.875c-.372.745-.688 1.434-.688 1.434s-.297-.708-.651-1.434L8.831 5.896h-1.88z" />
            </svg>
            <span>Featured on Hacker News</span>
          </a>
          <div
            className="sm:scale-75"
            dangerouslySetInnerHTML={{ __html: productHuntBadgeHtml }}
          />
        </div>
        <h1 className="mb-3 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent md:mb-8 md:text-8xl md:leading-[1.1]">
          A special blog made for Developers.
        </h1>
        <p className="mb-8 max-w-3xl text-base text-neutral-300 md:mb-12 md:text-xl">
          Honest reviews to help you choose the right developer tools for your
          SaaS.
        </p>
        <Link href="/blog" passHref>
          <Button className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 text-sm font-bold text-neutral-100 transition-all duration-300 hover:scale-105 hover:from-purple-600 hover:to-pink-600 hover:shadow-lg md:px-10 md:py-6 md:text-xl">
            Start Reading
          </Button>
        </Link>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <p className="mb-4 text-center text-sm font-medium text-neutral-100 md:mb-6 md:text-base">
          Current Sponsors:
        </p>
        <div className="flex items-center justify-center gap-4">
          <a href={"https://www.coderabbit.ai?rel=devtoolsacademy.com"}>
            <Image
              src={CodeRabbitLogo}
              alt="CodeRabbit"
              className="h-5 md:h-7"
            />
          </a>
          <a href={"https://getstream.io?rel=devtoolsacademy.com"}>
            <Image
              src={StreamLogo}
              alt="Stream"
              className="h-6 w-auto md:h-8"
            />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
