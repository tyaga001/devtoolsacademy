'use client';

import { useState } from 'react';
import { Tool } from "@/app/tools/data";
import { ToolCard } from "./ToolCard";
import { ToolListItem } from './ToolListItem';
import ViewToggle from "./ViewToggle";
import { useSearchParams } from 'next/navigation';
import EmptyState from './EmptyState';

interface ToolsContainerProps {
  tools: Tool[];
}

export default function ToolsContainer({ tools }: ToolsContainerProps) {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  if (tools.length === 0) {
    return (
      <EmptyState
        type={query ? 'search' : 'filter'}
        query={query || undefined}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <ViewToggle view={view} onChange={setView} />
      </div>

      {view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool,index) => (
            <ToolCard key={tool.id} index={index} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {tools.map((tool) => (
            <ToolListItem key={tool.id} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
}