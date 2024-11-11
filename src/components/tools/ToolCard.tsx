import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tool } from '@/lib/types'
import ToolLogo from './ToolLogo'

interface ToolCardProps {
  tool: Tool
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <Card className='rounded-xl bg-gray-950 shadow-sm shadow-gray-300 border-none'>
      <CardHeader>
        <ToolLogo name={tool.name} />
        <CardTitle>{tool.name}</CardTitle>
        <CardDescription>{tool.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-2">
          {tool.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          GitHub Stars: {tool.githubStars.toLocaleString()}
        </p>
        <p className="text-sm text-muted-foreground">
          Last Updated: {new Date(tool.lastUpdate).toLocaleDateString()}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <a
          href={tool.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:underline"
        >
          GitHub
        </a>
        <a
          href={tool.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:underline"
        >
          Website
        </a>
      </CardFooter>
    </Card>
  )
}
