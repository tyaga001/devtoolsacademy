"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Plus, X, Loader2, ArrowLeft } from "lucide-react"
import { JobSubmissionSchema } from "@/lib/ZodSchema"
import { z } from "zod"

type JobFormData = z.infer<typeof JobSubmissionSchema>

const jobTypes = [
  { value: "FULL_TIME", label: "Full-time" },
  { value: "PART_TIME", label: "Part-time" },
  { value: "CONTRACT", label: "Contract" },
  { value: "FREELANCE", label: "Freelance" },
  { value: "INTERNSHIP", label: "Internship" },
]

const popularCategories = [
  "Developer Relations",
  "Developer Advocate",
  "Technical Writing",
  "Community Management",
  "Developer Marketing",
  "API Documentation",
  "Developer Experience",
  "Technical Content",
]

const JobSubmissionForm: React.FC = () => {
  const [formData, setFormData] = useState<Partial<JobFormData>>({
    type: "FULL_TIME",
    requirements: [],
    benefits: [],
    categories: [],
    tags: [],
    featured: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [newRequirement, setNewRequirement] = useState("")
  const [newBenefit, setNewBenefit] = useState("")
  const [newCategory, setNewCategory] = useState("")
  const [newTag, setNewTag] = useState("")

  const handleInputChange = (field: keyof JobFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const addArrayItem = (
    field: "requirements" | "benefits" | "categories" | "tags",
    value: string
  ) => {
    if (!value.trim()) return

    const currentArray = (formData[field] as string[]) || []
    if (!currentArray.includes(value.trim())) {
      handleInputChange(field, [...currentArray, value.trim()])
    }
  }

  const removeArrayItem = (
    field: "requirements" | "benefits" | "categories" | "tags",
    index: number
  ) => {
    const currentArray = (formData[field] as string[]) || []
    handleInputChange(
      field,
      currentArray.filter((_, i) => i !== index)
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    try {
      // Validate form data
      const validatedData = JobSubmissionSchema.parse(formData)

      const response = await fetch("/api/jobs/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to submit job")
      }

      // Redirect to Stripe payment
      window.location.href = "https://buy.stripe.com/7sYaEZays1SZ1aZ2U9frW0n"
      // Reset form
      setFormData({
        type: "FULL_TIME",
        requirements: [],
        benefits: [],
        categories: [],
        tags: [],
        featured: false,
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            fieldErrors[err.path[0] as string] = err.message
          }
        })
        setErrors(fieldErrors)
      } else {
        setErrors({
          general: error instanceof Error ? error.message : "An error occurred",
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // Note: This success state is now rarely shown since we redirect to Stripe
  // But keeping it as fallback in case redirect fails
  if (submitSuccess) {
    return (
      <Card className="border border-green-600/30 bg-green-600/10 shadow-lg">
        <CardContent className="p-12 text-center">
          <div className="mb-6 inline-flex size-16 items-center justify-center rounded-full bg-green-600/20">
            <svg
              className="size-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="mb-4 text-2xl font-light text-neutral-100">
            Position Submitted Successfully
          </h2>
          <p className="mb-8 text-neutral-300">
            Thank you for your submission. You should be redirected to complete
            payment via Stripe. If not redirected automatically,{" "}
            <a
              href="https://buy.stripe.com/7sYaEZays1SZ1aZ2U9frW0n"
              className="font-medium text-neutral-100 underline decoration-2 hover:text-neutral-300"
            >
              click here to proceed
            </a>
            .
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/jobs">
              <Button
                variant="outline"
                className="border-neutral-300 text-neutral-300 hover:bg-neutral-50"
              >
                <ArrowLeft className="mr-2 size-4" />
                Back to Job Board
              </Button>
            </Link>
            <Button
              onClick={() => setSubmitSuccess(false)}
              className="bg-white text-black hover:bg-neutral-100"
            >
              Submit Another Position
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border border-neutral-800 bg-[#141414] shadow-lg">
      <CardContent className="p-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          {errors.general && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
              {errors.general}
            </div>
          )}

          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-neutral-100">
              Contact Information
            </h3>
            <div>
              <label
                htmlFor="contactName"
                className="mb-3 block text-sm font-medium text-neutral-300"
              >
                Contact name
              </label>
              <Input
                id="contactName"
                type="text"
                placeholder="Your name"
                value={formData.contactName || ""}
                onChange={(e) =>
                  handleInputChange("contactName", e.target.value)
                }
                className="border-neutral-700 bg-neutral-800 py-3 text-neutral-100 placeholder:text-neutral-500 focus:border-neutral-500 focus:ring-0"
              />
              {errors.contactEmail && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.contactEmail}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contactEmail"
                className="mb-3 block text-sm font-medium text-neutral-300"
              >
                Contact email
              </label>
              <Input
                id="contactEmail"
                type="email"
                placeholder="your.email@company.com"
                value={formData.contactEmail || ""}
                onChange={(e) =>
                  handleInputChange("contactEmail", e.target.value)
                }
                className="border-neutral-700 bg-neutral-800 py-3 text-neutral-100 placeholder:text-neutral-500 focus:border-neutral-500 focus:ring-0"
              />
              {errors.contactEmail && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.contactEmail}
                </p>
              )}
            </div>
          </div>

          {/* Company Information */}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="company"
                className="mb-3 block text-sm font-medium text-neutral-300"
              >
                Company name
              </label>
              <Input
                id="company"
                type="text"
                placeholder="e.g. Stripe, Vercel, OpenAI"
                value={formData.company || ""}
                onChange={(e) => handleInputChange("company", e.target.value)}
                className="border-neutral-700 bg-neutral-800 py-3 text-neutral-100 placeholder:text-neutral-500 focus:border-neutral-500 focus:ring-0"
              />
              {errors.company && (
                <p className="mt-2 text-sm text-red-600">{errors.company}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="companyLogo"
                className="mb-3 block text-sm font-medium text-neutral-300"
              >
                Company logo URL (optional)
              </label>
              <Input
                id="companyLogo"
                type="url"
                placeholder="https://company.com/logo.png"
                value={formData.companyLogo || ""}
                onChange={(e) =>
                  handleInputChange("companyLogo", e.target.value)
                }
                className="border-neutral-700 bg-neutral-800 py-3 text-neutral-100 placeholder:text-neutral-500 focus:border-neutral-500 focus:ring-0"
              />
              {errors.companyLogo && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.companyLogo}
                </p>
              )}
            </div>
          </div>

          {/* Job Details */}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="mb-3 block text-sm font-medium text-neutral-300"
              >
                Job title
              </label>
              <Input
                id="title"
                type="text"
                placeholder="e.g. Senior Developer Advocate"
                value={formData.title || ""}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="border-neutral-700 bg-neutral-800 py-3 text-neutral-100 placeholder:text-neutral-500 focus:border-neutral-500 focus:ring-0"
              />
              {errors.title && (
                <p className="mt-2 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="applyUrl"
                className="mb-3 block text-sm font-medium text-neutral-300"
              >
                Job posting URL
              </label>
              <Input
                id="applyUrl"
                type="url"
                placeholder="https://company.com/careers/devrel-role"
                value={formData.applyUrl || ""}
                onChange={(e) => handleInputChange("applyUrl", e.target.value)}
                className="border-neutral-700 bg-neutral-800 py-3 text-neutral-100 placeholder:text-neutral-500 focus:border-neutral-500 focus:ring-0"
              />
              {errors.applyUrl && (
                <p className="mt-2 text-sm text-red-600">{errors.applyUrl}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="location"
                className="mb-3 block text-sm font-medium text-neutral-300"
              >
                Location
              </label>
              <Input
                id="location"
                type="text"
                placeholder="e.g. Remote, San Francisco, New York"
                value={formData.location || ""}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="border-neutral-700 bg-neutral-800 py-3 text-neutral-100 placeholder:text-neutral-500 focus:border-neutral-500 focus:ring-0"
              />
              {errors.location && (
                <p className="mt-2 text-sm text-red-600">{errors.location}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="jobType"
                className="mb-3 block text-sm font-medium text-neutral-300"
              >
                Job type
              </label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between border-neutral-700 bg-neutral-800 text-neutral-100 hover:bg-neutral-700"
                  >
                    {jobTypes.find((type) => type.value === formData.type)
                      ?.label || "Select job type"}
                    <ChevronDown className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full border-neutral-700 bg-neutral-800">
                  {jobTypes.map((type) => (
                    <DropdownMenuItem
                      key={type.value}
                      onClick={() => handleInputChange("type", type.value)}
                      className="text-neutral-100 hover:bg-neutral-700"
                    >
                      {type.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              {errors.type && (
                <p className="mt-2 text-sm text-red-600">{errors.type}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="salary"
                className="mb-3 block text-sm font-medium text-neutral-300"
              >
                Salary range{" "}
                <span className="text-neutral-500">(optional)</span>
              </label>
              <Input
                id="salary"
                type="text"
                placeholder="e.g. $120k-$180k, €80k-€120k, Competitive"
                value={formData.salary || ""}
                onChange={(e) => handleInputChange("salary", e.target.value)}
                className="border-neutral-700 bg-neutral-800 py-3 text-neutral-100 placeholder:text-neutral-500 focus:border-neutral-500 focus:ring-0"
              />
              {errors.salary && (
                <p className="mt-2 text-sm text-red-600">{errors.salary}</p>
              )}
            </div>
          </div>

          {/* Job Description */}
          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-neutral-300"
            >
              Job description
              <span className="ml-2 text-xs text-neutral-500">
                {formData.description?.length || 0}/2000
              </span>
            </label>
            <textarea
              id="description"
              placeholder="Provide a brief description of the role, key responsibilities, and requirements..."
              value={formData.description || ""}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={6}
              maxLength={2000}
              className="w-full rounded-md border border-neutral-700 bg-neutral-800 px-4 py-3 text-neutral-100 placeholder:text-neutral-500 focus:border-neutral-500 focus:outline-none focus:ring-0"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-400">{errors.description}</p>
            )}
          </div>

          {/* Categories */}
          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-medium text-neutral-300"
            >
              Categories
            </label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Add category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addArrayItem("categories", newCategory)
                      setNewCategory("")
                    }
                  }}
                  id="category"
                  className="border-neutral-700 bg-neutral-800 py-3 text-neutral-100 placeholder:text-neutral-500 focus:border-neutral-500 focus:ring-0"
                />
                <Button
                  type="button"
                  onClick={() => {
                    addArrayItem("categories", newCategory)
                    setNewCategory("")
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="size-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {popularCategories.map((category) => (
                  <Button
                    key={category}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayItem("categories", category)}
                    className="border-neutral-600 text-neutral-300 hover:bg-neutral-700"
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {formData.categories && formData.categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.categories.map((category, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 rounded-md bg-blue-600/20 px-2 py-1 text-sm text-blue-300"
                    >
                      {category}
                      <button
                        type="button"
                        onClick={() => removeArrayItem("categories", index)}
                        className="text-blue-300 hover:text-blue-100"
                      >
                        <X className="size-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {errors.categories && (
              <p className="mt-1 text-sm text-red-400">{errors.categories}</p>
            )}
          </div>

          {/* Requirements */}
          <div>
            <label
              htmlFor="requirements"
              className="mb-2 block text-sm font-medium text-neutral-300"
            >
              Requirements (optional)
            </label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Add requirement"
                  id="requirements"
                  value={newRequirement}
                  onChange={(e) => setNewRequirement(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addArrayItem("requirements", newRequirement)
                      setNewRequirement("")
                    }
                  }}
                  className="border-neutral-700 bg-neutral-800 py-3 text-neutral-100 placeholder:text-neutral-500 focus:border-neutral-500 focus:ring-0"
                />
                <Button
                  type="button"
                  onClick={() => {
                    addArrayItem("requirements", newRequirement)
                    setNewRequirement("")
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="size-4" />
                </Button>
              </div>

              {formData.requirements && formData.requirements.length > 0 && (
                <div className="space-y-1">
                  {formData.requirements.map((req, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-md bg-neutral-800 px-3 py-2 text-sm text-neutral-300"
                    >
                      {req}
                      <button
                        type="button"
                        onClick={() => removeArrayItem("requirements", index)}
                        className="text-neutral-500 hover:text-neutral-300"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Benefits */}
          <div>
            <label
              htmlFor="benefit"
              className="mb-2 block text-sm font-medium text-neutral-300"
            >
              Benefits (optional)
            </label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Add benefit"
                  value={newBenefit}
                  id="benefit"
                  onChange={(e) => setNewBenefit(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addArrayItem("benefits", newBenefit)
                      setNewBenefit("")
                    }
                  }}
                  className="border-neutral-700 bg-neutral-800 py-3 text-neutral-100 placeholder:text-neutral-500 focus:border-neutral-500 focus:ring-0"
                />
                <Button
                  type="button"
                  onClick={() => {
                    addArrayItem("benefits", newBenefit)
                    setNewBenefit("")
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="size-4" />
                </Button>
              </div>

              {formData.benefits && formData.benefits.length > 0 && (
                <div className="space-y-1">
                  {formData.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-md bg-neutral-800 px-3 py-2 text-sm text-neutral-300"
                    >
                      {benefit}
                      <button
                        type="button"
                        onClick={() => removeArrayItem("benefits", index)}
                        className="text-neutral-500 hover:text-neutral-300"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label
              htmlFor="tag"
              className="mb-2 block text-sm font-medium text-neutral-300"
            >
              Tags (optional)
            </label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Add tag"
                  id="tag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addArrayItem("tags", newTag)
                      setNewTag("")
                    }
                  }}
                  className="border-neutral-700 bg-neutral-800 py-3 text-neutral-100 placeholder:text-neutral-500 focus:border-neutral-500 focus:ring-0"
                />
                <Button
                  type="button"
                  onClick={() => {
                    addArrayItem("tags", newTag)
                    setNewTag("")
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="size-4" />
                </Button>
              </div>

              {formData.tags && formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 rounded-md bg-green-600/20 px-2 py-1 text-sm text-green-300"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => removeArrayItem("tags", index)}
                        className="text-green-300 hover:text-green-100"
                      >
                        <X className="size-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-8">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white py-4 text-base font-medium text-black hover:bg-neutral-100 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Submitting & Redirecting to Payment...
                </>
              ) : (
                "Submit Position & Pay $199"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default JobSubmissionForm
