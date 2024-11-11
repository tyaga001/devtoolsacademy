
import type { Tool } from "@/app/tools/data";
import { ToolCard } from "./ToolCard";


// Grid layout for tools
interface ToolsGridProps {
  tools: Tool[];
}

export default function ToolsGrid({ tools }: ToolsGridProps) {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </main>
  );
}