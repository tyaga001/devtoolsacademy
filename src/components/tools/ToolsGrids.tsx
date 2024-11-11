'use client';
import { Tool } from "@/app/tools/data";
import { ToolCard } from "./ToolCard";
import { ToolCardSkeleton } from "./ToolCardSkelton";
import { useSearchParams } from "next/navigation";

interface ToolsGridProps {
  tools: Tool[];
}

export default function ToolsGrid({ tools }: ToolsGridProps) {
  const searchParams = useSearchParams();
  const isLoading = searchParams.toString() !== '' && tools.length === 0;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="animate-fade-in" style={{
            animationDelay: `${index * 100}ms`,
            opacity: 0,
          }}>
            <ToolCardSkeleton />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool, index) => (
        <ToolCard key={tool.id} tool={tool} index={index} />
      ))}
    </div>
  );
}