import React from "react"
import { Metadata } from "next"

import ContributePage from "@/components/ContributePage"

export const metadata: Metadata = {
  title: "Contribute to Dev Tools Academy",
  description:
    "Learn how to contribute to Dev Tools Academy and help improve this open-source project.",
}

export default function ContributeRoute() {
  return (
    <main className="min-h-screen bg-neutral-950">
      <ContributePage />
    </main>
  )
}
