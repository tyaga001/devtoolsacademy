export interface ToolCardInterface {
  id?: string
  name: string
  description: string
  categories: string[]
  stars: number
  forks: number
  lastUpdated: Date
  logo: string
}
export interface ToolDetailsInterface {
  id?: string
  name: string
  description: string
  categories: string[]
  stars: number
  forks: number
  lastUpdated: Date
  logo: string
  tags: string[]
  githubUrl: string
  websiteUrl?: string | null
  documentation?: string | null
  createdAt: Date
  updatedAt: Date
}
