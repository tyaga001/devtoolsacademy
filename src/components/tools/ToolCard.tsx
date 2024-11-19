import React from 'react'
import { ToolCardInterface } from '@/lib/types'
import { Star, GitFork, Link, BookOpen, Clock } from 'lucide-react'
import { Card, CardHeader, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'

interface ToolCardProps {
  tool: ToolCardInterface
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  return (
    <Card className="w-full h-full max-w-md bg-gradient-to-br from-zinc-800 to-zinc-950 border-zinc-800 hover:border-zinc-700 transition-all">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        {tool.logo ? (
          <img
            src={tool.logo}
            alt={`${tool.name} logo`}
            className="w-10 h-10 rounded-lg object-cover bg-zinc-800"
          />
        ) : (
          <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-300">
            {tool.name.charAt(0)}
          </div>
        )}
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-zinc-100">{tool.name}</h2>
          <p className="text-sm text-zinc-400">{tool.description.slice(0, 50)}..</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center text-zinc-400 text-sm">
            <Star className="w-4 h-4 mr-1.5 text-zinc-500" />
            <span>{tool.stars.toLocaleString()}</span>
          </div>
          <div className="flex items-center text-zinc-400 text-sm">
            <GitFork className="w-4 h-4 mr-1.5 text-zinc-500" />
            <span>{tool.forks.toLocaleString()}</span>
          </div>
          <div className="flex items-center text-zinc-400 text-sm">
            <Clock className="w-4 h-4 mr-1.5 text-zinc-500" />
            <span>
              {typeof tool.lastUpdated === 'string'
                ? new Date(tool.lastUpdated).toUTCString()
                : tool.lastUpdated.toUTCString()}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {tool.categories.map((category) => (
            <Badge
              key={category}
              variant="secondary"
              className="bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            >
              {category}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-4 pt-2">
          {tool.githubUrl && (
            <a
              href={tool.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              <GitFork className="w-4 h-4 mr-1.5" />
              GitHub
            </a>
          )}
          {tool.websiteUrl && (
            <a
              href={tool.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              <Link className="w-4 h-4 mr-1.5" />
              Website
            </a>
          )}
          {tool.documentation && (
            <a
              href={tool.documentation}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              <BookOpen className="w-4 h-4 mr-1.5" />
              Docs
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default ToolCard
