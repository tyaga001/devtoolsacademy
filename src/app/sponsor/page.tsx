import * as React from "react"

import { generateMetadata } from "@/lib/metadata"
import SponsorContent from "@/components/SponsorContent"

export const metadata = generateMetadata({
  path: "/sponsor",
  title: "Sponsor | DevTools Academy",
  description: "Support the development of DevTools Academy",
})

export default function SponsorPage() {
  return <SponsorContent />
}
