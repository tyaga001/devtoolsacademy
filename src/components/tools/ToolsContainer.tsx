/**
 * Tools Container Component
 *
 * A client-side component that manages the display of developer tools in either grid or list view.
 * Features:
 * - Toggle between grid and list views
 * - Empty state handling
 * - Responsive layout
 * - Animated tool cards
 */

'use client';

import { useState } from 'react';
import { Tool } from "@/app/tools/data";
import { ToolCard } from "./ToolCard";
import { ToolListItem } from './ToolListItem';
import ViewToggle from "./ViewToggle";
import { useSearchParams } from 'next/navigation';
import {EmptyState} from './EmptyState';

interface ToolsContainerProps {
  tools: Tool[];
}

export default function ToolsContainer({ tools }: ToolsContainerProps) {
  // State for view mode (grid/list)
  const [view, setView] = useState<'grid' | 'list'>('grid');

  // Get search parameters for empty state messaging
  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  // Show empty state if no tools match the current filters/search
  if (tools.length === 0) {
    return (
      <EmptyState
        type={query ? 'search' : 'filter'}
        query={query || undefined}
      />
    );
  }

  return (
    <div
      className="space-y-6"
      role="region"
      aria-label="Tools catalog"
    >
      {/* View Toggle Control */}
      <div className="flex justify-end">
        <ViewToggle view={view} onChange={setView} />
      </div>

      {/* Conditional Rendering based on View Type */}
      {view === 'grid' ? (
        // Grid View - 3 columns on large screens
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          role="grid"
          aria-label="Tools grid view"
        >
          {tools.map((tool, index) => (
            <ToolCard key={tool.id} index={index} tool={tool} />
          ))}
        </div>
      ) : (
        // List View - Vertical stack
        <div className="space-y-4">
          {tools.map((tool) => (
            <ToolListItem key={tool.id} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
}