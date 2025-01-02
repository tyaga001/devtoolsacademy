"use client"

import { useState } from "react"

interface Feature {
  name: string
  tool1: boolean
  tool2: boolean
}

interface ComparisonTableProps {
  tool1Name: string
  tool2Name: string
  features: Feature[]
}

export function ComparisonTable({
  tool1Name,
  tool2Name,
  features,
}: ComparisonTableProps) {
  const [activeFeatures, setActiveFeatures] = useState<string[]>([])

  const toggleFeature = (featureName: string) => {
    setActiveFeatures((prev) =>
      prev.includes(featureName)
        ? prev.filter((f) => f !== featureName)
        : [...prev, featureName]
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full overflow-hidden rounded-lg bg-white shadow-md dark:bg-neutral-950">
        <thead className="bg-neutral-200 dark:bg-neutral-700">
          <tr>
            <th className="px-4 py-2">Feature</th>
            <th className="px-4 py-2">{tool1Name}</th>
            <th className="px-4 py-2">{tool2Name}</th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature) => (
            <tr
              key={feature.name}
              className={`cursor-pointer ${
                activeFeatures.includes(feature.name)
                  ? "bg-blue-100 dark:bg-blue-900"
                  : ""
              }`}
              onClick={() => toggleFeature(feature.name)}
            >
              <td className="border px-4 py-2">{feature.name}</td>
              <td className="border px-4 py-2 text-center">
                {feature.tool1 ? "✅" : "❌"}
              </td>
              <td className="border px-4 py-2 text-center">
                {feature.tool2 ? "✅" : "❌"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
