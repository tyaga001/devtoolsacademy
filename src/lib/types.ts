export interface ToolCardInterface {
  id: string
  name: string
  headline: string
  description: string
  categories: string[]
  features: string[]
  stars: number
  forks: number
  lastUpdated?: Date | undefined
  logo: string
  tags: string[]
  githubUrl?: string | undefined
  websiteUrl?: string | undefined
  documentation?: string | undefined
  createdAt?: Date | undefined
  updatedAt?: Date | undefined
}

export interface ToolDetailsInterface {
  id?: string
  name: string
  description: string
  categories: string[]
  stars: number
  forks: number
  headline: string
  features: string[]
  lastUpdated: Date
  logo: string
  tags: string[]
  githubUrl: string
  websiteUrl?: string | null
  documentation?: string | null
  createdAt: Date
  updatedAt: Date
}
