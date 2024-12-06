'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ActiveFiltersProps {
  categories: string[];
  licenses: string[];
}

type FilterType = 'categories' | 'licenses';

export default function ActiveFilters({
  categories,
  licenses,
}: ActiveFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Generic filter removal function
  const removeFilter = (type: FilterType, value: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      const currentValues = params.getAll(type);
      params.delete(type);
      currentValues
        .filter(v => v !== value)
        .forEach(v => params.append(type, v));
      params.delete('page'); // Reset to first page
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  // Clear all filters
  const clearAllFilters = () => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.delete('categories');
      params.delete('licenses');
      params.delete('page');
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  if (categories.length === 0 && licenses.length === 0) {
    return null;
  }

  // Reusable badge component
  const FilterBadge = ({ type, value }: { type: FilterType; value: string }) => (
    <Badge
      key={value}
      variant="secondary"
      className="flex items-center gap-1 pr-1"
    >
      {value}
      <Button
        variant="ghost"
        size="icon"
        className="h-4 w-4 p-0 hover:bg-transparent"
        onClick={() => removeFilter(type, value)}
      >
        <X className="h-3 w-3" />
        <span className="sr-only">Remove {value} filter</span>
      </Button>
    </Badge>
  );

  return (
    <div className="flex flex-wrap items-center gap-2">
      {categories.map((category) => (
        <FilterBadge key={category} type="categories" value={category} />
      ))}

      {licenses.map((license) => (
        <FilterBadge key={license} type="licenses" value={license} />
      ))}

      <Button
        variant="ghost"
        size="sm"
        onClick={clearAllFilters}
        className="text-muted-foreground hover:text-foreground"
      >
        Clear all
      </Button>
    </div>
  );
}