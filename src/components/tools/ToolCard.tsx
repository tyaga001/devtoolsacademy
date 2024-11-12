import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tool } from "@/lib/types";
import ToolLogo from "./ToolLogo";
import { Quote } from "lucide-react";

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <Card className="relative rounded-xl bg-gradient-to-br from-purple-900 to-[#070808] shadow-none border-none">
      <Quote className="absolute right-4 top-4 h-8 w-8 text-purple-300/20" />
      <CardHeader>
        <div className="flex gap-2 items-center">
          <ToolLogo name={tool.name} />
          <CardTitle>{tool.name}</CardTitle>
        </div>
        <CardDescription>{tool.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-6">
          {tool.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-purple-800/50 hover:bg-purple-700/50 text-purple-100 border-none"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex justify-between text-sm">
          {" "}
          <div className="flex items-center space-x-1">
            <span>⭐</span>
            <span>Stars</span>{" "}
          </div>
          <span>{tool.githubStars.toLocaleString()}</span>{" "}
        </div>{" "}
        <div className="flex justify-between text-sm mt-2">
          {" "}
          <div className="flex items-center space-x-1">
            <span>⏲️</span>
            <span>Last Updated</span>{" "}
          </div>
          <span>{new Date(tool.lastUpdate).toLocaleDateString()}</span>{" "}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <a
          href={tool.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          GitHub
        </a>
        <a
          href={tool.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          Website
        </a>
      </CardFooter>
    </Card>
  );
}
