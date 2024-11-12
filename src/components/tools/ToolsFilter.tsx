'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

export const categories = [
  "security",
  "automation",
  "design",
  "coding"
]

export const tags = [
  "automation",
  "design",
  "cloud",
  "checking",
  "bhot-bdhia"
]

export const licenses = [
  "MIT",
  "Apache",
  "Proprietary",
  "Free"
]
export function ToolsFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateFilters = (type: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    const currentValues = params.getAll(type)

    if (currentValues.includes(value)) {
      // Remove value if already exists
      const newValues = currentValues.filter(v => v !== value)
      params.delete(type)
      newValues.forEach(v => params.append(type, v))
    } else {
      // Add new value
      params.append(type, value)
    }

    router.push(`?${params.toString()}`)
  }

  const isChecked = (type: string, value: string) => {
    return searchParams.getAll(type).includes(value)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Filters</Button>
      </PopoverTrigger>
      <PopoverContent className="bg-neutral-800 z-10 w-[450px]">
        <div className="grid grid-cols-3 gap-4 p-4">
          <div className="space-y-2">
            <p className="font-semibold">Tags</p>
            {tags.map((tag) => (
              <CheckboxItem
                key={tag}
                type="tags"
                value={tag}
                checked={isChecked('tags', tag)}
                onCheckedChange={() => updateFilters('tags', tag)}
              />
            ))}
          </div>
          <div className="space-y-2">
            <p className="font-semibold">Categories</p>
            {categories.map((category) => (
              <CheckboxItem
                key={category}
                type="categories"
                value={category}
                checked={isChecked('categories', category)}
                onCheckedChange={() => updateFilters('categories', category)}
              />
            ))}
          </div>
          <div className="space-y-2">
            <p className="font-semibold">Licenses</p>
            {licenses.map((license) => (
              <CheckboxItem
                key={license}
                type="licenses"
                value={license}
                checked={isChecked('licenses', license)}
                onCheckedChange={() => updateFilters('licenses', license)}
              />
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

type CheckboxItemProps = {
  type: string
  value: string
  checked: boolean
  onCheckedChange: () => void
}

function CheckboxItem({ type, value, checked, onCheckedChange }: CheckboxItemProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
      <label>{value}</label>
    </div>
  )
}
