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

export default function ActiveFilters({
  categories,
  licenses,
}: ActiveFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Remove a category
  const removeCategory = (category: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      const currentCategories = params.getAll('categories');
      params.delete('categories');
      currentCategories
        .filter(c => c !== category)
        .forEach(c => params.append('categories', c));
      params.delete('page'); // Reset to first page
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  // Remove a license
  const removeLicense = (license: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      const currentLicenses = params.getAll('licenses');
      params.delete('licenses');
      currentLicenses
        .filter(l => l !== license)
        .forEach(l => params.append('licenses', l));
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

  return (
    <div className="flex flex-wrap items-center gap-2">
      {categories.map((category) => (
        <Badge
          key={category}
          variant="secondary"
          className="flex items-center gap-1 pr-1"
        >
          {category}
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={() => removeCategory(category)}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      ))}

      {licenses.map((license) => (
        <Badge
          key={license}
          variant="secondary"
          className="flex items-center gap-1 pr-1"
        >
          {license}
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={() => removeLicense(license)}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
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