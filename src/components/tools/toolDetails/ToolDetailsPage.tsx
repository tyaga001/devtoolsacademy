import * as React from "react"
import { ToolDetailsInterface } from "@/lib/types"
import {
  Star,
  GitFork,
  Clock,
  ExternalLink,
  Github,
  Book,
  Code,
  Hash,
  Tag,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Link } from "next-view-transitions"
import { Suspense } from "react"
import SimilarTools from "./SimilarTools"

interface ToolCardProps {
  tool: ToolDetailsInterface
}

const languageColors: { [key: string]: string } = {
  JavaScript: "#f1e05a",
  TypeScript: "#2b7489",
  CSS: "#563d7c",
  HTML: "#e34c26",
}

const languages: { [key: string]: number } = {
  JavaScript: 70,
  TypeScript: 20,
  CSS: 5,
  HTML: 5,
}

const ToolDetailsPage: React.FC<ToolCardProps> = ({ tool }) => {
  const totalLines = Object.values(languages).reduce((a, b) => a + b, 0)

  return (
    <div className="mx-auto max-w-7xl">
      <section className="flex items-center justify-between gap-8 p-8">
        <div className="flex flex-col gap-2">
          <div className="mb-4 flex items-center gap-4">
            <img
              src={`/images/logo/${tool.name}.png`}
              alt={`${tool.name} logo`}
              className="size-10 rounded border border-neutral-100/15 object-cover"
            />
            <div>
              <h1 className="text-4xl font-bold tracking-tighter">
                {tool.name}
              </h1>
            </div>
          </div>
          <p className=" pb-1 text-neutral-500">{tool.headline}</p>
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:gap-6">
          {tool.websiteUrl && (
            <Link href={tool.websiteUrl}>
              <div className="flex items-center gap-2 border border-dashed border-neutral-100/15 bg-neutral-900 px-5 py-2.5 text-sm outline-none transition-colors hover:bg-neutral-800 focus:bg-neutral-800">
                <ExternalLink className="size-4" />
                Visit Website
              </div>
            </Link>
          )}
          <Link href={tool.githubUrl}>
            <div className="flex items-center gap-2 border border-dashed border-neutral-100/15 bg-neutral-900 px-5 py-2.5 text-sm outline-none transition-colors hover:bg-neutral-800 focus:bg-neutral-800">
              <Github className="size-4" />
              View on GitHub
            </div>
          </Link>
          {tool.documentation && (
            <Link href={tool.documentation}>
              <div className="flex items-center gap-2 border border-dashed border-neutral-100/15 bg-neutral-900 px-5 py-2.5 text-sm outline-none transition-colors hover:bg-neutral-800 focus:bg-neutral-800">
                <Book className="size-4" />
                Documentation
              </div>{" "}
            </Link>
          )}
        </div>
      </section>

      <hr className="border-dashed border-neutral-100/15" />

      <section className="grid grid-cols-1 md:grid-cols-5">
        <div className="border-r border-dashed border-neutral-100/15 p-8 md:col-span-3">
          <h2 className="mb-2 text-xl font-semibold tracking-tighter">
            About {tool.name}
          </h2>
          <p className="mb-6 text-justify text-sm text-neutral-500 md:text-base">
            {tool.description}
          </p>
          <div className="pt-10">
            <img
              src={`/images/img/${tool.name}.png`}
              alt={`${tool.name} interface`}
              className="mb-6 rounded"
            />
          </div>
        </div>

        <aside className="md:col-span-2">
          <div className="grid grid-cols-1 gap-6 p-8 md:grid-cols-2">
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                <Tag className="size-4" />
                Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {tool.categories.map((category) => (
                  <Badge
                    key={category}
                    variant="secondary"
                    className="cursor-pointer bg-neutral-800 text-sm text-neutral-200 hover:bg-neutral-900"
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                <Hash className="size-4" />
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {tool.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="cursor-pointer bg-neutral-800 text-sm text-neutral-200 hover:bg-neutral-900"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <hr className="border-dashed border-neutral-100/15" />

          <div className="flex flex-col gap-2 p-8 md:col-span-2">
            <h2 className="mb-2 text-xl font-semibold tracking-tight">
              Repository Details
            </h2>
            <div className="mb-8 flex flex-wrap gap-x-4 gap-y-1">
              {Object.entries(languages).map(([lang, lines]) => (
                <div key={lang} className="flex items-center">
                  <span
                    className="mr-1 size-2 rounded-full"
                    style={{
                      backgroundColor: languageColors[lang] || "#8e8e8e",
                    }}
                  />
                  <span className="text-xs">{lang}</span>
                  <span className="ml-1 text-xs text-neutral-400">
                    {((lines / totalLines) * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="flex flex-col border-r border-dashed border-neutral-100/15 py-3">
                <Star className="mr-3 size-8 text-yellow-500" />
                <div className="mt-4">
                  <p className="text-xs text-neutral-400">Stars</p>
                  <p className="text-base font-semibold">
                    {typeof tool.stars === "number"
                      ? tool.stars.toLocaleString()
                      : "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex flex-col border-r border-dashed border-neutral-100/15 py-3 pl-5">
                <GitFork className="mr-3 size-8 text-blue-500" />
                <div className="mt-4">
                  <p className="text-xs text-neutral-400">Forks</p>
                  <p className="text-base font-semibold">
                    {typeof tool.forks === "number"
                      ? tool.forks.toLocaleString()
                      : "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex flex-col border-dashed border-neutral-100/15 py-3 pl-5">
                <Clock className="mr-3 size-8 text-green-500" />
                <div className="mt-4">
                  <p className="text-xs text-neutral-400">Last Commit</p>
                  <p className="text-base font-semibold">
                    {tool.lastUpdated
                      ? new Date(tool.lastUpdated).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-dashed border-neutral-100/15" />

          <div className="p-8">
            <h2 className="mb-4 text-xl font-semibold tracking-tight">
              Key Features
            </h2>
            <ul className="space-y-2">
              {tool.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-neutral-500"
                >
                  <Code className="text-green-400" size={20} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      <hr className="border-dashed border-neutral-100/15" />

      <Suspense fallback={<div>loading...</div>}>
        <SimilarTools
          slug={tool.name}
          tags={tool.tags}
          categories={tool.categories}
        />
      </Suspense>
    </div>
  )
}

export default ToolDetailsPage
