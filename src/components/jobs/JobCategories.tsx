"use client"

import React, { useEffect, useMemo, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import axios from "axios"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
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
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const selectedCategory = searchParams.get("categories")
  const hasSelectedCategory = Boolean(selectedCategory)

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
    const params = new URLSearchParams(searchParams.toString())
    params.set("categories", categoryName)
    params.set("page", "1")
    router.push(`${pathname}?${params.toString()}`)
  }

  const clearCategory = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete("categories")
    params.delete("page")
    router.push(`${pathname}?${params.toString()}`)
  }

  const groupedCategories = useMemo(
    () => groupCategories(categories),
    [categories]
  )

  const topCategories = useMemo(
    () => [...categories].sort((a, b) => b.count - a.count).slice(0, 8),
    [categories]
  )

  if (isLoading) {
    return (
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-light tracking-tight text-white md:text-4xl">
              Explore by Specialty
            </h2>
            <p className="text-lg text-neutral-400">
              Discover opportunities tailored to your expertise
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[...Array(8)].map((_, index) => (
              <Card
                key={index}
                className="border border-neutral-800 bg-[#141414] shadow-sm"
              >
                <CardContent className="p-8 text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="size-16 animate-pulse rounded-2xl bg-neutral-100" />
                  </div>
                  <div className="mb-2 h-4 w-24 animate-pulse rounded bg-neutral-100" />
                  <div className="h-3 w-16 animate-pulse rounded bg-neutral-100" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (categories.length === 0) {
    return null
  }

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        {hasSelectedCategory && (
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-neutral-800 bg-neutral-900/50 px-4 py-3 text-sm text-neutral-200">
            <span>
              Filtering by{" "}
              <span className="font-semibold">{selectedCategory}</span>
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearCategory}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950 px-3 py-1 text-xs text-neutral-300 hover:border-neutral-700 hover:bg-neutral-900"
            >
              <X className="size-3" />
              Reset filters
            </Button>
          </div>
        )}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-light tracking-tight text-white md:text-4xl">
            Explore by Specialty
          </h2>
          <p className="text-lg text-neutral-400">
            Discover opportunities tailored to your expertise
          </p>
        </div>

        {/* Top Categories Grid */}
        <div className="mb-16 grid grid-cols-2 gap-6 md:grid-cols-4">
          {topCategories.slice(0, 8).map((category) => {
            const IconComponent = getCategoryIcon(category.name)
            return (
              <Card
                key={category.name}
                className={`group cursor-pointer border border-neutral-800 bg-[#141414] shadow-sm transition-all duration-300 hover:border-neutral-700 hover:shadow-md ${
                  selectedCategory === category.name
                    ? "border-neutral-600 bg-neutral-800"
                    : ""
                }`}
                onClick={() => handleCategoryClick(category.name)}
              >
                <CardContent className="p-8 text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="rounded-2xl bg-neutral-800 p-4 transition-colors group-hover:bg-neutral-700">
                      <IconComponent className="size-8 text-neutral-400" />
                    </div>
                  </div>
                  <h3 className="mb-2 text-sm font-semibold leading-tight text-neutral-100">
                    {category.name}
                  </h3>
                  <p className="text-xs text-neutral-500">
                    {category.count}{" "}
                    {category.count === 1 ? "position" : "positions"}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* All Categories by Group */}
        <div className="space-y-12">
          {Object.entries(groupedCategories).map(
            ([groupName, groupCategories]) => {
              if (groupCategories.length === 0) return null

              return (
                <div key={groupName}>
                  <h3 className="mb-6 flex items-center gap-3 text-xl font-medium text-neutral-100">
                    {groupName === "Developer Relations" && (
                      <Users className="size-5 text-neutral-400" />
                    )}
                    {groupName === "Engineering" && (
                      <Code className="size-5 text-neutral-400" />
                    )}
                    {groupName === "Marketing & Growth" && (
                      <Zap className="size-5 text-neutral-400" />
                    )}
                    {groupName === "Specialized" && (
                      <Brain className="size-5 text-neutral-400" />
                    )}
                    {groupName}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {groupCategories.map((category) => (
                      <button
                        key={category.name}
                        onClick={() => handleCategoryClick(category.name)}
                        className="group"
                      >
                        <Badge
                          variant="outline"
                          className={`flex items-center gap-2 border-neutral-700 bg-[#141414] px-4 py-2 text-sm font-medium text-neutral-300 transition-all duration-200 hover:border-neutral-700 hover:bg-neutral-800 hover:text-neutral-100 ${
                            selectedCategory === category.name
                              ? "border-neutral-600 bg-neutral-800 text-neutral-100"
                              : ""
                          }`}
                        >
                          {category.name}
                          <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-500 group-hover:bg-neutral-200">
                            {category.count}
                          </span>
                        </Badge>
                      </button>
                    ))}
                  </div>
                </div>
              )
            }
          )}
        </div>
      </div>
    </section>
  )
}

export default JobCategories
