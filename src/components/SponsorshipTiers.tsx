"use client"
import * as React from "react"

import { Star, Trophy } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

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
    price: 5000,
    benefits: [
      "Big logo on homepage and DevToolsAcademy repo",
      "Backlink to your website",
      "Dedicated review blog post",
      "Featured in BytesizedBets newsletter (5000+ subscribers)",
      "1:1 consultation (30 min) for content strategy/developer marketing",
      "Guest post opportunity on DevToolsAcademy blog",
      "Featured in detailed comparison post vs competitors",
    ],
    stripeLink: "https://buy.stripe.com/dR6fZvbAz9dvcbm28m",
  },
  {
    title: "Hero Sponsor",
    icon: <Trophy className="size-6 text-yellow-500" />,
    price: 3000,
    benefits: [
      "Big logo on homepage and DevToolsAcademy repo",
      "Backlink to your website",
      "Dedicated review blog post on DevToolsAcademy website",
    ],
    stripeLink: "https://buy.stripe.com/8wMdRn7kj4Xf0sE28n",
  },
]

interface Props {}

const SponsorshipTiers: React.FC<Props> = () => {
  const handleContribute = (stripeLink: string) => {
    window.open(stripeLink, "_blank", "noopener,noreferrer")
  }

  return (
    <section className="mx-auto max-w-7xl">
      <hr className="border-dashed border-neutral-100/15" />
      <div className="grid grid-cols-1 md:grid-cols-2">
        {sponsorTiers.map((tier, index) => (
          <div
            className={cn(
              "flex flex-col p-8 border-dashed border-neutral-100/15",
              "border-b",
              index > 0 ? "border-l" : ""
            )}
            key={index}
          >
            <div className="mb-3 flex items-start justify-between">
              {tier.icon}
              <span className="text-sm font-semibold text-neutral-400">
                ONE-TIME
              </span>
            </div>
            <p className="mb-6 text-2xl font-semibold tracking-tight">
              {tier.title}
            </p>

            <div className="mb-12">
              <ul className="list-none space-y-2 text-sm text-neutral-300">
                {tier.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="mr-2 text-green-500">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-4 mt-auto text-center text-3xl font-bold">
              ${tier.price} USD
            </div>
            <Button
              className="w-full border border-dashed border-neutral-200 text-neutral-200 outline-none transition-colors hover:bg-neutral-300 hover:text-neutral-900 focus:bg-neutral-300 focus:text-neutral-900"
              onClick={() => handleContribute(tier.stripeLink)}
            >
              Contribute
            </Button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default SponsorshipTiers
