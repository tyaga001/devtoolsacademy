import React from 'react'
import algoliasearch from 'algoliasearch'
import ToolsFilter from './ToolsFilter'
import SearchBar from './SearchBar'

interface AlgoliaSearchProps {
  searchParams: {
    query?: string
  }
}

interface Tool {
  name: string
  description: string
  url: string
  categories: string[]
  stars: number
  forks: number
  logo: string
  tags: string[]
  githubUrl: string
  websiteUrl: string
  documentation: string
}

export const getTools = async (text: string): Promise<Tool[]> => {
  if (!text) {
    return []
  }
  const client = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!
  )

  const index = client.initIndex('data')
  const { hits } = await index.search<Tool>(text, {
    hitsPerPage: 20,
  })

  return hits
}

const AlgoliaSearch: React.FC<AlgoliaSearchProps> = async () => {

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center space-x-4 mb-6">
        <SearchBar />
        <ToolsFilter />
      </div>
    </div>
  )
}

export default AlgoliaSearch


