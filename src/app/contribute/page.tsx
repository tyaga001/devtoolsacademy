import React from "react"

import ContributePage from "@/components/ContributePage"
import { baseUrl, getMetadata } from "@/lib/metadata"

export const metadata = getMetadata({
  path: "/contribute",
  title: "Contribute to Dev Tools Academy",
  description:
    "Learn how to contribute to Dev Tools Academy and help improve this open-source project",
  image: `${baseUrl}api/og?title=Contribute%20|%20DevToolsAcademy`,
})

export default function ContributeRoute() {
  return (
    <main className="min-h-screen bg-neutral-950">
      <ContributePage />
    </main>
  )
}
