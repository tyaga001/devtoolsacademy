import * as React from "react"

import { getMetadata } from "@/lib/metadata"
import SponsorContent from "@/components/SponsorContent"

export const metadata = getMetadata({
  path: "/sponsor",
  title: "Sponsor | DevTools Academy",
  description: "Support the development of DevTools Academy",
})

export default function SponsorPage() {
  return <SponsorContent />
}
