import * as React from "react"

import { getMetadata } from "@/lib/metadata"
import SponsorContent from "@/components/SponsorContent"

export const metadata = getMetadata({
  path: "/sponsor",
  title: "Sponsor | DevTools Academy",
  description: "Support the development of DevTools Academy",
})

export default function SponsorPage() {
  return (
    <main className="mb-16 mt-[80px]">
      <hr className="border-dashed border-neutral-100/10" />
      <section className="py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold tracking-tight md:text-5xl">
          <span className="bg-gradient-to-b from-neutral-700 to-neutral-200 bg-clip-text text-transparent">
            Sponsor Me.
          </span>
        </h1>
        <p className="text-base text-neutral-500 md:text-lg">
          I love doing open-source projects and write about developer tools ❤️
        </p>
      </section>

      <SponsorContent />

      <section className="mx-auto grid max-w-7xl grid-cols-2">
        <div className="border-r border-dashed border-neutral-100/10 px-6 py-12">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            <span className="bg-gradient-to-b from-neutral-700 to-neutral-200 bg-clip-text text-transparent">
              Why Your Support Matters
            </span>
          </h2>
        </div>

        <div className="space-y-4 px-6 py-12 leading-relaxed text-neutral-500 ">
          <p>
            As an independent consultant, your support is crucial in sustaining
            this project. Here&apos;s how your contribution makes a difference:
          </p>
          <ul className="list-none space-y-2">
            <li className="flex items-start">
              <svg
                className="mr-2 size-6 shrink-0 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <span>Enables me to focus on real users like you</span>
            </li>
            <li className="flex items-start">
              <svg
                className="mr-2 size-6 shrink-0 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <span>
                Allows me to spotlight awesome developer tools companies
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="mr-2 size-6 shrink-0 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <span>
                Frees me from external pressures and chasing outbound work
              </span>
            </li>
          </ul>
          <p className="mt-6 text-center italic">
            Your support empowers me to continue creating valuable content and
            resources for the developer community.
          </p>
        </div>
      </section>
      <hr className="border-dashed border-neutral-100/10" />

      <section className="mx-auto grid max-w-7xl grid-cols-2">
        <div className="border-r border-dashed border-neutral-100/10 px-6 py-12">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            <span className="bg-gradient-to-b from-neutral-700 to-neutral-200 bg-clip-text text-transparent">
              Who is behind this?
            </span>
          </h2>
        </div>

        <div className="space-y-4 px-6 py-12 leading-relaxed text-neutral-500 ">
          <h3 className="mb-6 text-2xl font-semibold tracking-tight">
            Hey, I&apos;m{" "}
            <a
              href="https://github.com/tyaga001"
              className="text-blue-400 underline transition-colors duration-300 hover:text-blue-300"
            >
              Ankur Tyagi
            </a>
          </h3>
          <div className="space-y-4 leading-relaxed text-neutral-500">
            <p>
              I&apos;m a software engineer based in Sweden who cares deeply
              about &quot;Writing&quot;.
            </p>
            <p>
              My mission is to help founders and developers learn, grow, and
              make better choices when it comes to developer tools.
            </p>
            <p>
              Your support keeps this project free, open, and evolving, allowing
              me to dedicate myself to making this blog better for you.
            </p>
            <p className="mt-8 text-lg font-semibold tracking-tight text-neutral-200">
              Thank you for being part of my journey.
            </p>
            <p className="mt-8 text-neutral-200">
              <strong className="text-neutral-100">Note:</strong> All blogs will
              remain live forever on this website as they are published and read
              10000+ times per month by devs.
            </p>
          </div>
        </div>
      </section>
      <hr className="border-dashed border-neutral-100/10" />
    </main>
  )
}
