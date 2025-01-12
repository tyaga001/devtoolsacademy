import React from "react"
import { Metadata } from "next"
import { getToolDetails } from "@/lib/tools"
import ToolDetailsPage from "@/components/tools/toolDetails/ToolDetailsPage"
import ToolNotFound from "@/components/tools/toolDetails/ToolNotFound"

export const metadata: Metadata = {
  title: "Dev Tools Academy",
  description: "DevToolsAcademy Tool details",
}

export default async function ToolDetailRoute({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  const response = await getToolDetails(slug)
  const toolDetails = response.toolDetails

  if (!toolDetails) {
    return <ToolNotFound />
  }

  return (
    <main className="min-h-screen w-full px-4 py-36">
      <ToolDetailsPage tool={toolDetails} />
    </main>
  )
}
