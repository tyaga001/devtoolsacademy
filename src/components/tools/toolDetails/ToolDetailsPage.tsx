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
import Link from "next/link"
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
    <div className="px-1 pb-8 pt-16 text-gray-100 md:pb-20 lg:px-72 lg:pt-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex flex-col gap-2">
          <div className="flex items-center gap-4 rounded-lg">
            <img
              src={`/images/logo/${tool.name}.png`}
              alt={`${tool.name} logo`}
              className="size-10 rounded border border-white/10 object-cover"
            />
            <div>
              <h1 className="text-4xl font-bold">{tool.name}</h1>
            </div>
          </div>
          <div>
            <p className=" pb-1 text-gray-300">{tool.headline}</p>
            <div className="grid grid-cols-1 gap-6 pt-10 md:grid-cols-2">
              <div>
                <h3 className="mb-2 flex items-center text-lg font-semibold">
                  <Tag className="mr-2 size-5" />
                  Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tool.categories.map((category) => (
                    <Badge
                      key={category}
                      variant="outline"
                      className="cursor-pointer bg-[#141414] text-sm text-gray-300 opacity-80 hover:bg-[#141414] hover:opacity-100"
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="mb-2 flex items-center text-lg font-semibold">
                  <Hash className="mr-2 size-5" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tool.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer border-gray-600 text-sm text-gray-300 hover:bg-[#141414]"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" top-0 flex flex-col gap-3 bg-black py-4 md:sticky">
          <div>
            <h2 className="pb-1 text-2xl">Repository Details:</h2>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {Object.entries(languages).map(([lang, lines]) => (
              <div key={lang} className="flex items-center">
                <span
                  className="mr-1 size-2 rounded-full"
                  style={{
                    backgroundColor: languageColors[lang] || "#8e8e8e",
                  }}
                />
                <span className="text-xs">{lang}</span>
                <span className="ml-1 text-xs text-gray-400">
                  {((lines / totalLines) * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 ">
            <div className="flex items-center rounded border border-white/10 bg-gradient-to-br from-[#141414] to-transparent p-4">
              <Star className="mr-3 size-8 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-400">Stars</p>
                <p className="text-xl font-semibold">
                  {typeof tool.stars === "number"
                    ? tool.stars.toLocaleString()
                    : "N/A"}
                </p>
              </div>
            </div>
            <div className="flex items-center rounded border border-white/10 bg-gradient-to-br from-[#141414] to-transparent p-4">
              <GitFork className="mr-3 size-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-400">Forks</p>
                <p className="text-xl font-semibold">
                  {typeof tool.forks === "number"
                    ? tool.forks.toLocaleString()
                    : "N/A"}
                </p>
              </div>
            </div>
            <div className="flex items-center rounded border border-white/10 bg-gradient-to-br from-[#141414] to-transparent p-4">
              <Clock className="mr-3 size-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-400">Last Commited</p>
                <p className="text-xl font-semibold">
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
          {/* <div className="flex flex-col md:flex-row gap-2 md:gap-6 mb-8">
            <Link href={tool.githubUrl}>
              <div className="flex items-center text-gray-400 hover:text-gray-300 text-sm ">
                <Github className="w-4 h-4 mr-2" />
                View on GitHub
              </div>
            </Link>
            {tool.websiteUrl && (
              <Link href={tool.websiteUrl}>
                <div className="flex items-center text-gray-400 hover:text-gray-300 text-sm ">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Visit Website
                </div>
              </Link>
            )}
            {tool.documentation && (
              <Link href={tool.documentation}>
                <div className="flex items-center text-gray-400 hover:text-gray-300 text-sm ">
                  <Book className="w-4 h-4 mr-2" />
                  Documentation
                </div>
              </Link>
            )}
          </div> */}
        </div>
        <div className="mx-auto max-w-4xl  py-6">
          <div className="mt-12  rounded-xl">
            <h2 className="mb-2 text-2xl font-bold md:text-3xl">
              About {tool.name}
            </h2>
            <p className="mb-6 text-justify text-sm text-gray-300 md:text-base">
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

          <section className="mb-20 mt-24 md:mt-0">
            <h2 className="mb-6 text-2xl font-bold md:text-3xl">
              Key Features
            </h2>
            <ul className=" grid-cols-1 gap-4 md:grid md:grid-cols-2">
              {tool.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-gray-300"
                >
                  <Code className="text-green-400" size={20} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>
          <div className="flex items-center justify-center">
            <div className="mb-8 flex flex-col gap-2 md:flex-row md:gap-6">
              <Link href={tool.githubUrl}>
                <div className="rounded-[5px] bg-gray-800/50 p-2 text-gray-200 hover:bg-gray-700/50">
                  <div className="flex items-center  text-sm ">
                    <Github className="mr-2 size-4" />
                    View on GitHub
                  </div>
                </div>
              </Link>
              {tool.websiteUrl && (
                <Link href={tool.websiteUrl}>
                  <div className="rounded-[5px] bg-blue-800/50 p-2 text-blue-200 hover:bg-blue-700/50">
                    <div className="flex items-center  text-sm ">
                      <ExternalLink className="mr-2 size-4" />
                      Visit Website
                    </div>
                  </div>{" "}
                </Link>
              )}
              {tool.documentation && (
                <Link href={tool.documentation}>
                  <div className="rounded-[5px] bg-purple-800/50 p-2 text-purple-200 hover:bg-purple-700/50">
                    <div className="flex items-center  text-sm ">
                      <Book className="mr-2 size-4" />
                      Documentation
                    </div>
                  </div>{" "}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
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
