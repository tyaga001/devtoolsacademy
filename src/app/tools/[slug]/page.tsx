import React from "react"
import type { Metadata } from "next"

import { getToolDetails } from "@/lib/tools"
import { getMetadata } from "@/lib/metadata"

import ToolDetailsPage from "@/components/tools/details/ToolDetailsPage"
import ToolNotFound from "@/components/tools/details/ToolNotFound"

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  const response = await getToolDetails(slug)
  const toolDetails = response.toolDetails

  return getMetadata({
    path: `/tools/${slug}/`,
    title: `${toolDetails?.name} | Tools | DevTools Academy`,
    description: `${toolDetails?.headline}, DevToolsAcademy`,
  })
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
    <main className="mt-[80px] min-h-screen">
      <hr className="border-dashed border-neutral-100/15" />
      <ToolDetailsPage tool={toolDetails} />
    </main>
  )
}
