import { FileQuestion } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

/**
 * Empty State Component
 *
 * Displays a message when no tools match the current search/filters
 * Features:
 * - Different messages for search vs filter results
 * - Clear filters/search action
 */

interface EmptyStateProps {
  type: 'search' | 'filter';
  query?: string;
}

export function EmptyState({ type, query }: EmptyStateProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /**
   * Clears either search or filters based on the empty state type
   */
  const clearFilters = () => {
    const params = new URLSearchParams(searchParams);
    if (type === 'search') {
      params.delete('query');
    } else {
      params.delete('categories');
      params.delete('licenses');
    }
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
   <div
     role="status"
     aria-live="polite"
     aria-label={type === 'search' ? 'Search results empty state' : 'Filter results empty state'}
     className="flex flex-col items-center justify-center py-12 px-4"
    >
      <FileQuestion className="h-16 w-16 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold mb-2">
        {type === 'search'
          ? `No results found for "${query}"`
          : 'No matching tools found'}
      </h3>
      <p className="text-muted-foreground text-center mb-6">
        {type === 'search'
          ? 'Try searching with different keywords or browse all tools'
          : 'Try adjusting your filters to find more tools'}
      </p>
      <Button onClick={clearFilters}>
        {type === 'search' ? 'Clear Search' : 'Clear Filters'}
      </Button>
    </div>
  );
}