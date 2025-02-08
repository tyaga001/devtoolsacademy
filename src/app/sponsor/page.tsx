import * as React from "react"

import { baseUrl, getMetadata } from "@/lib/metadata"
import SponsorContent from "@/components/SponsorContent"

export const metadata = getMetadata({
  path: "/sponsor",
  title: "Sponsor | DevTools Academy",
  description: "Support the development of DevTools Academy",
  image: `${baseUrl}api/og?title=Sponsor%20|%20DevToolsAcademy`,
})

export default function SponsorPage() {
  return <SponsorContent />
}
