"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Briefcase,
  Code,
  Users,
  Zap,
  Brain,
  Palette,
  Shield,
  Database,
} from "lucide-react"

interface Category {
  name: string
  count: number
}

// Icon mapping for categories
const getCategoryIcon = (categoryName: string) => {
  const name = categoryName.toLowerCase()
  if (name.includes("developer relations") || name.includes("devrel"))
    return Users
  if (name.includes("engineering") || name.includes("software")) return Code
  if (name.includes("frontend") || name.includes("react")) return Palette
  if (name.includes("ai") || name.includes("ml") || name.includes("research"))
    return Brain
  if (name.includes("marketing") || name.includes("growth")) return Zap
  if (name.includes("security") || name.includes("auth")) return Shield
  if (name.includes("database") || name.includes("postgres")) return Database
  return Briefcase
}

// Group categories by type
const groupCategories = (categories: Category[]) => {
  const groups = {
    "Developer Relations": [] as Category[],
    Engineering: [] as Category[],
    "Marketing & Growth": [] as Category[],
    Specialized: [] as Category[],
  }

  categories.forEach((category) => {
    const name = category.name.toLowerCase()
    if (
      name.includes("developer relations") ||
      name.includes("devrel") ||
      name.includes("advocate") ||
      name.includes("community")
    ) {
      groups["Developer Relations"].push(category)
    } else if (
      name.includes("engineering") ||
      name.includes("software") ||
      name.includes("frontend") ||
      name.includes("backend") ||
      name.includes("platform")
    ) {
      groups["Engineering"].push(category)
    } else if (
      name.includes("marketing") ||
      name.includes("growth") ||
      name.includes("content")
    ) {
      groups["Marketing & Growth"].push(category)
    } else {
      groups["Specialized"].push(category)
    }
  })

  return groups
}

const JobCategories: React.FC = () => {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/jobs/categories")
        setCategories(response.data.categories)
      } catch (error) {
        console.error("Error fetching job categories:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const handleCategoryClick = (categoryName: string) => {
    router.push(`/jobs?categories=${encodeURIComponent(categoryName)}`)
  }

  if (isLoading) {
    return (
      <section className="mx-auto mb-20 max-w-6xl px-4 md:px-0">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            <span className="bg-gradient-to-b from-neutral-700 to-neutral-200 bg-clip-text text-transparent">
              Browse by Category
            </span>
          </h2>
          <p className="text-lg text-neutral-400">
            Find jobs in your area of expertise
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <Card key={index} className="border-neutral-800 bg-neutral-900/50">
              <CardContent className="p-6">
                <div className="h-6 w-32 bg-neutral-800 rounded animate-pulse mb-4" />
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-neutral-800 rounded animate-pulse" />
                  <div className="h-4 w-20 bg-neutral-800 rounded animate-pulse" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    )
  }

  if (categories.length === 0) {
    return null
  }

  const groupedCategories = groupCategories(categories)
  const topCategories = categories.sort((a, b) => b.count - a.count).slice(0, 8)

  return (
    <section className="mx-auto mb-20 max-w-6xl px-4 md:px-0">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
          <span className="bg-gradient-to-b from-neutral-700 to-neutral-200 bg-clip-text text-transparent">
            Browse by Category
          </span>
        </h2>
        <p className="text-lg text-neutral-400">
          Find jobs in your area of expertise
        </p>
      </div>

      {/* Top Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {topCategories.slice(0, 8).map((category) => {
          const IconComponent = getCategoryIcon(category.name)
          return (
            <Card
              key={category.name}
              className="border-neutral-800 bg-neutral-900/50 hover:bg-neutral-800/50 transition-all duration-200 cursor-pointer group"
              onClick={() => handleCategoryClick(category.name)}
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 rounded-full bg-blue-600/20 group-hover:bg-blue-600/30 transition-colors">
                    <IconComponent className="h-6 w-6 text-blue-400" />
                  </div>
                </div>
                <h3 className="font-semibold text-neutral-200 mb-2 text-sm leading-tight">
                  {category.name}
                </h3>
                <p className="text-xs text-neutral-400">
                  {category.count} {category.count === 1 ? "job" : "jobs"}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* All Categories by Group */}
      {Object.entries(groupedCategories).map(([groupName, groupCategories]) => {
        if (groupCategories.length === 0) return null

        return (
          <div key={groupName} className="mb-8">
            <h3 className="text-xl font-semibold text-neutral-300 mb-4 flex items-center gap-2">
              {groupName === "Developer Relations" && (
                <Users className="h-5 w-5" />
              )}
              {groupName === "Engineering" && <Code className="h-5 w-5" />}
              {groupName === "Marketing & Growth" && (
                <Zap className="h-5 w-5" />
              )}
              {groupName === "Specialized" && <Brain className="h-5 w-5" />}
              {groupName}
            </h3>
            <div className="flex flex-wrap gap-2">
              {groupCategories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => handleCategoryClick(category.name)}
                  className="group"
                >
                  <Badge
                    variant="outline"
                    className="flex items-center gap-2 px-3 py-1.5 text-sm border-neutral-700 bg-neutral-900/50 text-neutral-300 hover:bg-neutral-800 hover:text-neutral-200 hover:border-neutral-600 transition-all duration-200"
                  >
                    {category.name}
                    <span className="text-xs text-neutral-500 group-hover:text-neutral-400">
                      {category.count}
                    </span>
                  </Badge>
                </button>
              ))}
            </div>
          </div>
        )
      })}
    </section>
  )
}

export default JobCategories
