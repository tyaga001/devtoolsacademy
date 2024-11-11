import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Star, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import type { Tool } from "@/app/tools/data";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CATEGORY_COLORS, DEFAULT_COLOR } from '@/app/tools/data';
import GitHubStarsTrend from "./GitHubStarsTrend";
import { useState } from "react";

interface ToolCardProps {
  tool: Tool;
  index: number;
}

export function ToolCard({ tool, index }: ToolCardProps) {
  const [showTrend, setShowTrend] = useState(false);

  const formattedDate = new Date(tool.lastUpdate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card
        data-tool-index={index}
        className={cn(
          "flex flex-col h-full overflow-hidden group border-l-4 transition-all duration-200 border-l-primary/50 hover:border-l-primary",
        )}
      >
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
            <div className="flex items-center gap-2">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-1 bg-yellow-100/80 dark:bg-yellow-900/80 rounded-full px-2 py-1 cursor-pointer"
                onClick={() => setShowTrend(!showTrend)}
              >
                <Star className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
                  {Intl.NumberFormat('en-US', { notation: 'compact' }).format(tool.githubStars)}
                </span>
                {showTrend ? (
                  <ChevronUp className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                )}
              </motion.div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {tool.category.map((cat) => (
              <Badge
                key={cat}
                variant="secondary"
                className={cn(
                  "rounded-full text-xs font-medium transition-transform hover:scale-105",
                  CATEGORY_COLORS[cat as keyof typeof CATEGORY_COLORS] || DEFAULT_COLOR
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

          {/* GitHub Stars Trend */}
          {showTrend && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <GitHubStarsTrend tool={tool} compact />
            </motion.div>
          )}

          <div className="flex flex-wrap gap-2 mt-4">
            {tool.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-primary/5 text-primary dark:bg-primary/10 rounded-full px-2 py-1 transition-colors hover:bg-primary/10"
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
              <motion.div whileHover={{ scale: 1.1 }}>
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
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }}>
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
              </motion.div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}