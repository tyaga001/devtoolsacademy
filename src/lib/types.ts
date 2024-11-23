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

export interface ToolDetailsInterface extends ToolCardInterface {
  tags: string[]
  githubUrl: URL
  websiteUrl?: URL
  documentation?: URL
  createdAt: Date
  updatedAt: Date
}
