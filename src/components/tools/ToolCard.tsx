import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Star } from "lucide-react"
import Link from "next/link"
import type { Tool } from "@/app/tools/data"
import { cn } from "@/lib/utils"

interface ToolCardProps {
  tool: Tool
}

const categoryColors: Record<string, string> = {
  'Frontend': 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-700 dark:text-blue-300',
  'Backend': 'bg-gradient-to-r from-green-500/20 to-teal-500/20 text-green-700 dark:text-green-300',
  'Full Stack': 'bg-gradient-to-r from-red-500/20 to-yellow-500/20 text-red-700 dark:text-red-300',
  'DevOps': 'bg-gradient-to-r from-orange-500/20 to-pink-500/20 text-orange-700 dark:text-orange-300',
  'Design': 'bg-gradient-to-r from-indigo-500/20 to-blue-500/20 text-indigo-700 dark:text-indigo-300',
  'Testing': 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-700 dark:text-purple-300',
  'API': 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-700 dark:text-cyan-300',
  'IDE': 'bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-700 dark:text-emerald-300',
  'Code Editor': 'bg-gradient-to-r from-violet-500/20 to-purple-500/20 text-violet-700 dark:text-violet-300',
  'Package Manager': 'bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-700 dark:text-amber-300',
  'Version Control': 'bg-gradient-to-r from-rose-500/20 to-pink-500/20 text-rose-700 dark:text-rose-300',
  'Build Tools': 'bg-gradient-to-r from-lime-500/20 to-green-500/20 text-lime-700 dark:text-lime-300',
  'Browser Tools': 'bg-gradient-to-r from-sky-500/20 to-blue-500/20 text-sky-700 dark:text-sky-300',
  'Debugging': 'bg-gradient-to-r from-fuchsia-500/20 to-pink-500/20 text-fuchsia-700 dark:text-fuchsia-300',
  'State Management': 'bg-gradient-to-r from-teal-500/20 to-emerald-500/20 text-teal-700 dark:text-teal-300',
};

const defaultColor = 'bg-gradient-to-r from-gray-500/20 to-gray-700/20 text-gray-700 dark:text-gray-300';

export function ToolCard({ tool }: ToolCardProps) {
  // Format date on the server side to avoid hydration mismatch
  const formattedDate = new Date(tool.lastUpdate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Card className="flex flex-col h-full overflow-hidden group border-l-4 border-l-primary/50">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">
            <Link
              href={`/tools/${tool.id}`}
              className="hover:text-primary transition-colors duration-200"
            >
              {tool.name}
            </Link>
          </h3>
          <div className="flex items-center gap-1 bg-yellow-100/80 dark:bg-yellow-900/80 rounded-full px-2 py-1">
            <Star className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
              {Intl.NumberFormat('en-US', { notation: 'compact' }).format(tool.githubStars)}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {tool.category.map((cat) => (
            <Badge
              key={cat}
              variant="secondary"
              className={cn(
                "rounded-full text-xs font-medium px-2 py-1",
                categoryColors[cat] || defaultColor
              )}
            >
              {cat}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent className="flex-grow py-2">
        <div className="text-sm text-muted-foreground line-clamp-3">
          {tool.description}
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {tool.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-primary/5 text-primary dark:bg-primary/10 rounded-full px-2 py-1"
            >
              #{tag}
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter className="border-t pt-4 mt-auto">
        <div className="flex justify-between items-center w-full">
          <span className="text-xs text-muted-foreground">
            Updated: {formattedDate}
          </span>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hover:bg-primary/10 transition-colors duration-200"
            >
              <Link
                href={tool.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-4 h-4" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hover:bg-primary/10 transition-colors duration-200"
            >
              <Link
                href={tool.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="sr-only">Website</span>
              </Link>
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}