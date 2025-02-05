"use client"
import * as React from "react"

import { Star, Trophy, Award, Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface SponsorTier {
  title: string
  icon: React.ReactNode
  price: number
  benefits: string[]
  stripeLink: string
}

const sponsorTiers: SponsorTier[] = [
  {
    title: "VIP Sponsor",
    icon: <Star className="size-6 text-yellow-400" />,
    price: 2000,
    benefits: [
      "Big logo on homepage and DevToolsAcademy repo",
      "Backlink to your website",
      "Dedicated review blog post on DevToolsAcademy and The Ankur Tyagi",
      "Featured in BytesizedBets newsletter (5000+ subscribers)",
    ],
    stripeLink: "https://buy.stripe.com/dR6fZvbAz9dvcbm28m",
  },
  {
    title: "Hero Sponsor",
    icon: <Trophy className="size-6 text-yellow-500" />,
    price: 1000,
    benefits: [
      "Big logo on homepage and DevToolsAcademy repo",
      "Backlink to your website",
      "Dedicated review blog post on DevToolsAcademy website",
    ],
    stripeLink: "https://buy.stripe.com/8wMdRn7kj4Xf0sE28n",
  },
  {
    title: "Catalyst Sponsor",
    icon: <Award className="size-6 text-orange-400" />,
    price: 500,
    benefits: ["Small logo on homepage and DevToolsAcademy repo"],
    stripeLink: "https://buy.stripe.com/28ofZvbAzblD3EQfZe",
  },
  {
    title: "Backer Sponsor",
    icon: <Heart className="size-6 text-red-400" />,
    price: 99,
    benefits: ["Small logo in DevToolsAcademy repo", "my heartfelt thanks."],
    stripeLink: "https://buy.stripe.com/8wM9B78ongFXa3e9AN",
  },
]

interface Props {}

const SponsorContent: React.FC<Props> = () => {
  const handleContribute = (stripeLink: string) => {
    window.open(stripeLink, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-36">
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <h1 className="mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-6xl font-bold tracking-tight text-transparent md:text-8xl">
          Sponsor Me.
        </h1>
        <p className="mb-12 text-lg text-neutral-300 md:text-xl">
          I love doing open-source projects and write about developer tools{" "}
          <span className="text-red-500">❤️</span>
        </p>

        <div className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {sponsorTiers.map((tier, index) => (
            <Card
              key={index}
              className="flex flex-col overflow-hidden border-neutral-700 bg-neutral-950 text-white"
            >
              <CardHeader className="bg-neutral-900 p-4">
                <div className="mb-2 flex items-center justify-between">
                  {tier.icon}
                  <span className="text-sm font-semibold text-neutral-400">
                    MEMBERSHIP
                  </span>
                </div>
                <CardTitle className="text-2xl font-bold">
                  {tier.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="grow p-4">
                <ul className="list-none space-y-2 text-sm text-neutral-300">
                  {tier.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-2 text-green-500">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="mt-auto bg-neutral-900 p-4">
                <div className="w-full">
                  <div className="mb-4 text-center text-3xl font-bold">
                    ${tier.price} USD
                  </div>
                  <Button
                    className="w-full bg-purple-600 text-white transition-colors duration-300 hover:bg-purple-700"
                    onClick={() => handleContribute(tier.stripeLink)}
                  >
                    Contribute
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mx-auto mb-16 max-w-3xl rounded-lg bg-neutral-900 p-8 shadow-lg">
          <h3 className="mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-center text-2xl font-semibold text-transparent">
            Why Your Support Matters
          </h3>
          <div className="space-y-4 text-lg leading-relaxed text-neutral-300">
            <p>
              As an independent consultant, your support is crucial in
              sustaining this project. Here&apos;s how your contribution makes a
              difference:
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
        </div>

        <h2 className="mb-8 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-center text-4xl font-bold text-transparent">
          Who is behind this?
        </h2>

        <div className="mx-auto max-w-3xl rounded-lg bg-neutral-900 p-8 text-center shadow-2xl">
          <h3 className="mb-6 text-4xl font-bold text-white">
            Hey, I&apos;m{" "}
            <a
              href="https://github.com/tyaga001"
              className="text-blue-400 underline transition-colors duration-300 hover:text-blue-300"
            >
              Ankur Tyagi
            </a>
          </h3>
          <div className="space-y-4 text-lg leading-relaxed text-neutral-300">
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
            <p className="mt-6 text-xl font-semibold text-white">
              Thank you for being part of my journey.
            </p>
            <p className="mt-8 rounded-lg border border-neutral-300 bg-neutral-100 p-4 text-center text-neutral-500 shadow-lg">
              <strong className="text-neutral-700">Note:</strong> All blogs will
              remain live forever on this website as they are published and read
              10000+ times per month by devs.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SponsorContent
