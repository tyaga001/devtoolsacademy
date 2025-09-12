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

export interface JobCardInterface {
  id: string
  title: string
  company: string
  companyLogo?: string | null
  location: string
  type: "FULL_TIME" | "PART_TIME" | "CONTRACT" | "FREELANCE" | "INTERNSHIP"
  salary?: string | null
  description: string
  categories: string[]
  tags: string[]
  featured: boolean
  slug: string
  applyUrl: string
  createdAt: Date
  expiresAt: Date
}

export interface JobDetailsInterface {
  id: string
  title: string
  company: string
  companyLogo?: string | null
  location: string
  type: "FULL_TIME" | "PART_TIME" | "CONTRACT" | "FREELANCE" | "INTERNSHIP"
  salary?: string | null
  description: string
  requirements: string[]
  benefits: string[]
  applyUrl: string
  contactEmail?: string | null
  categories: string[]
  tags: string[]
  featured: boolean
  active: boolean
  approved: boolean
  slug: string
  createdAt: Date
  updatedAt: Date
  expiresAt: Date
}
