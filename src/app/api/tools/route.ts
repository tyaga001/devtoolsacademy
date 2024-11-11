import { NextRequest, NextResponse } from 'next/server'
import { mockTools } from '@/data/tools'
import { revalidatePath } from 'next/cache'


export async function GET(request: NextRequest) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  const searchParams = request.nextUrl.searchParams
  const search = searchParams.get('search') || ''
  const sortBy = searchParams.get('sortBy') || 'relevance'

  let filteredTools = mockTools

  if (search) {
    const searchLower = search.toLowerCase()
    filteredTools = filteredTools.filter(tool =>
      tool.name.toLowerCase().includes(searchLower) ||
      tool.description.toLowerCase().includes(searchLower) ||
      tool.tags.some(tag => tag.toLowerCase().includes(searchLower))
    )
  }

  // Sort tools
  switch (sortBy) {
    case 'stars':
      filteredTools.sort((a, b) => b.githubStars - a.githubStars)
      break
    case 'lastUpdate':
      filteredTools.sort((a, b) => new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime())
      break
    case 'relevance':
    default:
      break
  }

  return NextResponse.json(filteredTools)
}
