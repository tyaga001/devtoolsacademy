import * as React from "react"
import { ToolCardInterface } from "@/lib/types"
import { Star, GitFork, Clock } from "lucide-react"
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card"
import { Badge } from "../ui/badge"
import Link from "next/link"

interface ToolCardProps {
  tool: ToolCardInterface
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  return (
    <Link href={`/tools/${encodeURIComponent(tool.name)}`} className="block">
      <Card className="relative size-full max-w-sm overflow-hidden  rounded-xl border-white/10 opacity-90 ring-[#1C1C1C]/50 transition-all hover:opacity-100 hover:ring">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            <img
              src={`/images/logo/${tool.name}.png`}
              alt={`${tool.name} logo`}
              className="size-10 rounded border border-white/10 object-cover"
            />
            <h2 className="text-xl font-bold text-neutral-100">{tool.name}</h2>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-3 line-clamp-2 pt-2 text-xs text-neutral-400">
            {tool.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {tool?.categories &&
              tool.categories.slice(0, 3).map((category) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className="bg-[#141414] text-xs text-neutral-300 hover:bg-[#141414] hover:bg-[#141414]/10"
                >
                  {category}
                </Badge>
              ))}
            {tool.categories && tool.categories.length > 3 && (
              <Badge
                variant="secondary"
                className="bg-[#141414] text-neutral-300 opacity-90 hover:bg-[#141414]"
              >
                +{tool.categories.length - 3}
              </Badge>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start justify-between gap-2 py-0 pb-8 text-xs text-neutral-400">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center">
              <Star className="mr-1 size-4 text-neutral-500" />
              <span>Stars</span>
            </div>
            <div>
              <span>{tool.stars.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center">
              <GitFork className="mr-1 size-4 text-neutral-500" />
              <span>Forks</span>
            </div>
            <div>
              <span>{tool.forks.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center">
              <Clock className="mr-1 size-4 text-neutral-500" />
              <span>Last Commit</span>
            </div>
            <div>
              {tool.lastUpdated && (
                <span>{new Date(tool.lastUpdated).toLocaleDateString()}</span>
              )}
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}

export default ToolCard
