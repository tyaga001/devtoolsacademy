import React from "react"
import dynamic from "next/dynamic"
import { Metadata } from "next"

const ContributePage = dynamic(() => import("@/components/ContributePage"), {
  ssr: false,
})

export const metadata: Metadata = {
  title: "Contribute to Dev Tools Academy",
  description:
    "Learn how to contribute to Dev Tools Academy and help improve this open-source project.",
}

export default function ContributeRoute() {
  return (
    <main className="min-h-screen bg-black">
      <ContributePage />
    </main>
  )
}
