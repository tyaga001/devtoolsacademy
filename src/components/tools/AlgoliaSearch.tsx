import React from "react"
import algoliasearch from "algoliasearch"
import ToolsFilter from "./ToolsFilter"
import { ToolCardInterface } from "@/lib/types"

interface AlgoliaSearchProps {
  searchParams: {
    query?: string
  }
}

export const getTools = async (text: string): Promise<ToolCardInterface[]> => {
  if (!text) {
    return []
  }
  const client = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!
  )

  const index = client.initIndex("toolData")
  const { hits } = await index.search<ToolCardInterface>(text, {
    hitsPerPage: 20,
  })

  return hits
}

const AlgoliaSearch: React.FC<AlgoliaSearchProps> = async () => {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 md:px-0">
      <ToolsFilter />
    </div>
  )
}

export default AlgoliaSearch
