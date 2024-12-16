import { ToolDetailsInterface } from "@/lib/types";
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
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Suspense } from "react";
import SimilarTools from "./SimilarTools";

interface ToolCardProps {
  tool: ToolDetailsInterface;
}

const languageColors: { [key: string]: string } = {
  JavaScript: "#f1e05a",
  TypeScript: "#2b7489",
  CSS: "#563d7c",
  HTML: "#e34c26",
};

const languages: { [key: string]: number } = {
  JavaScript: 70,
  TypeScript: 20,
  CSS: 5,
  HTML: 5,
};

const ToolDetailsPage: React.FC<ToolCardProps> = ({ tool }) => {
  const totalLines = Object.values(languages).reduce((a, b) => a + b, 0);

  return (
    <div className="text-gray-100 pb-8 md:pb-20 px-1 lg:px-72 pt-16 lg:pt-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col gap-2 mb-8">
          <div className="flex items-center gap-4 rounded-lg">
            <img
              src={`/images/logo/${tool.name}.png`}
              alt={`${tool.name} logo`}
              className="w-10 h-10 object-cover border border-white border-opacity-10 rounded"
            />
            <div>
              <h1 className="text-4xl font-bold">{tool.name}</h1>
            </div>
          </div>
          <div>
            <p className=" pb-1 text-gray-300">{tool.headline}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10">
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <Tag className="w-5 h-5 mr-2" />
                  Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tool.categories.map((category) => (
                    <Badge
                      key={category}
                      variant="outline"
                      className="text-sm bg-[#141414] text-gray-300 opacity-80 hover:bg-[#141414] hover:opacity-100 cursor-pointer"
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <Hash className="w-5 h-5 mr-2" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tool.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-sm border-gray-600 text-gray-300 hover:bg-[#141414] cursor-pointer"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" md:sticky bg-black top-0 flex flex-col gap-3 py-4">
          <div>
            <h2 className="text-2xl pb-1">Repository Details:</h2>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {Object.entries(languages).map(([lang, lines]) => (
              <div key={lang} className="flex items-center">
                <span
                  className="w-2 h-2 rounded-full mr-1"
                  style={{
                    backgroundColor: languageColors[lang] || "#8e8e8e",
                  }}
                />
                <span className="text-xs">{lang}</span>
                <span className="text-xs text-gray-400 ml-1">
                  {((lines / totalLines) * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
            <div className="flex items-center bg-gradient-to-br from-[#141414] to-transparent border border-white border-opacity-10 p-4 rounded">
              <Star className="w-8 h-8 mr-3 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-400">Stars</p>
                <p className="text-xl font-semibold">
                  {typeof tool.stars === "number"
                    ? tool.stars.toLocaleString()
                    : "N/A"}
                </p>
              </div>
            </div>
            <div className="flex items-center bg-gradient-to-br from-[#141414] to-transparent border border-white border-opacity-10 p-4 rounded">
              <GitFork className="w-8 h-8 mr-3 text-blue-500" />
              <div>
                <p className="text-sm text-gray-400">Forks</p>
                <p className="text-xl font-semibold">
                  {typeof tool.forks === "number"
                    ? tool.forks.toLocaleString()
                    : "N/A"}
                </p>
              </div>
            </div>
            <div className="flex items-center bg-gradient-to-br from-[#141414] to-transparent border border-white border-opacity-10 p-4 rounded">
              <Clock className="w-8 h-8 mr-3 text-green-500" />
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
        <div className="max-w-4xl mx-auto  py-6">
          <div className="mt-12  rounded-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              About {tool.name}
            </h2>
            <p className="text-gray-300 mb-6 text-sm md:text-md text-justify">
              {tool.description}
            </p>
            <div className="pt-10">
              <img
                src={`/images/img/${tool.name}.png`}
                alt={`${tool.name} interface`}
                className="rounded mb-6"
              />
            </div>
          </div>

          <section className="mb-20 mt-24 md-mt-0">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Key Features
            </h2>
            <ul className=" md:grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div className="flex flex-col md:flex-row gap-2 md:gap-6 mb-8">
              <Link href={tool.githubUrl}>
                <div className="p-2 bg-gray-800/50 hover:bg-gray-700/50 text-gray-200 rounded-[5px]">
                  <div className="flex items-center  text-sm ">
                    <Github className="w-4 h-4 mr-2" />
                    View on GitHub
                  </div>
                </div>
              </Link>
              {tool.websiteUrl && (
                <Link href={tool.websiteUrl}>
                  <div className="p-2 bg-blue-800/50 hover:bg-blue-700/50 text-blue-200 rounded-[5px]">
                    <div className="flex items-center  text-sm ">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Visit Website
                    </div>
                  </div>{" "}
                </Link>
              )}
              {tool.documentation && (
                <Link href={tool.documentation}>
                  <div className="p-2 bg-purple-800/50 hover:bg-purple-700/50 text-purple-200 rounded-[5px]">
                    <div className="flex items-center  text-sm ">
                      <Book className="w-4 h-4 mr-2" />
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
  );
};

export default ToolDetailsPage;
