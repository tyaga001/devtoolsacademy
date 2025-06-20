import React from "react"

import { getToolDetails } from "@/lib/tools"
import { getMetadata } from "@/lib/metadata"

import ToolDetailsPage from "@/components/tools/details/ToolDetailsPage"
import ToolNotFound from "@/components/tools/details/ToolNotFound"

export const metadata = getMetadata({
  path: "/tools",
  title: "Tools Details | DevTools Academy",
  description: "DevToolsAcademy Tool details",
})

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
    <main className="mt-[80px] min-h-screen">
      <hr className="border-dashed border-neutral-100/15" />
      <ToolDetailsPage tool={toolDetails} />
    </main>
  )
}
