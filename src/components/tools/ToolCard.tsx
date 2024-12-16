import { ToolCardInterface } from "@/lib/types";
import { Star, GitFork, Clock } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import Link from "next/link";

interface ToolCardProps {
  tool: ToolCardInterface;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  return (
    <Link href={`/tools/${encodeURIComponent(tool.name)}`} className="block">
      <Card className="relative w-full h-full  max-w-sm  border-white border-opacity-10 hover:ring ring-[#1C1C1C] ring-opacity-50 opacity-90 hover:opacity-100 transition-all rounded-xl overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            <img
              src={`/images/logo/${tool.name}.png`}
              alt={`${tool.name} logo`}
              className="w-10 h-10 object-cover border border-white border-opacity-10 rounded"
            />
            <h2 className="text-xl font-bold text-gray-100">{tool.name}</h2>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-gray-400 mb-3 pt-2 line-clamp-2">
            {tool.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {tool?.categories && tool.categories.slice(0, 3).map((category) => (
              <Badge
                key={category}
                variant="secondary"
                className="bg-[#141414] bg-opacity-80 text-xs text-gray-300 hover:bg-[#141414] hover:bg-opacity-100"
              >
                {category}
              </Badge>
            ))}
            {tool.categories && tool.categories.length > 3 && (
              <Badge
                variant="secondary"
                className="bg-[#141414] text-gray-300 opacity-90 hover:bg-[#141414]"
              >
                +{tool.categories.length - 3}
              </Badge>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col justify-between gap-2 items-start text-xs text-gray-400 py-0 pb-8">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-1 text-gray-500" />
              <span>Stars</span>
            </div>
            <div>
              <span>{tool.stars.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center">
              <GitFork className="w-4 h-4 mr-1 text-gray-500" />
              <span>Forks</span>
            </div>
            <div>
              <span>{tool.forks.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1 text-gray-500" />
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
  );
};

export default ToolCard;
