import { FileQuestion } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

interface EmptyStateProps {
  type: 'search' | 'filter';
  query?: string;
}

export default function EmptyState({ type, query }: EmptyStateProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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
    <div className="flex flex-col items-center justify-center py-12 px-4">
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