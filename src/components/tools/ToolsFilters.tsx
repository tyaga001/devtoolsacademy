'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface ToolsFiltersProps {
  availableCategories: string[];
  availableLicenses: string[];
  selectedCategories: string[];
  selectedLicenses: string[];
  selectedSort: string;
}

export default function ToolsFilters({
  availableCategories,
  availableLicenses,
  selectedCategories,
  selectedLicenses,
  selectedSort,
}: ToolsFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Update URL params and maintain existing search query
  const updateParams = (updates: Record<string, string | string[] | null>) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);

      // Handle each update
      Object.entries(updates).forEach(([key, value]) => {
        params.delete(key); // Remove existing values

        if (value === null) {
          // If null, we just wanted to delete it
          return;
        }

        if (Array.isArray(value)) {
          // Handle arrays (categories, licenses)
          value.forEach(v => params.append(key, v));
        } else {
          // Handle single values
          params.set(key, value);
        }
      });

      // Reset to first page when filters change
      params.delete('page');

      router.push(`${pathname}?${params.toString()}`);
    });
  };

  // Handle category toggle
  const toggleCategory = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];

    updateParams({ categories: newCategories.length ? newCategories : null });
  };

  // Handle license toggle
  const toggleLicense = (license: string) => {
    const newLicenses = selectedLicenses.includes(license)
      ? selectedLicenses.filter(l => l !== license)
      : [...selectedLicenses, license];

    updateParams({ licenses: newLicenses.length ? newLicenses : null });
  };

  // Handle sort change
  const handleSortChange = (value: string) => {
    updateParams({ sort: value });
  };

  // Clear all filters
  const clearFilters = () => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.delete('categories');
      params.delete('licenses');
      params.delete('sort');
      params.delete('page');
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  // Calculate total active filters
  const totalActiveFilters = selectedCategories.length + selectedLicenses.length;

  return (
    <div className="flex items-center gap-2">
      {/* Sort Select */}
      <Select value={selectedSort} onValueChange={handleSortChange}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Sort by relevance" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort by</SelectLabel>
            <SelectItem value="relevance">Relevance</SelectItem>
            <SelectItem value="stars">GitHub Stars</SelectItem>
            <SelectItem value="updated">Last Updated</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Filters Sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="flex gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filters</span>
            {isPending && <span className="sr-only">Updating...</span>}
            {totalActiveFilters > 0 && (
              <Badge variant="secondary" aria-label={`${totalActiveFilters} active filters`}>
                {totalActiveFilters}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>

          <ScrollArea className="h-[calc(100vh-8rem)] mt-4">
            <div className="space-y-6">
              {/* Categories Section */}
              <div>
                <h3 className="font-medium mb-4">Categories</h3>
                <div className="space-y-3">
                  {availableCategories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <Label
                        htmlFor={`category-${category}`}
                        className="text-sm font-normal"
                      >
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Licenses Section */}
              <div>
                <h3 className="font-medium mb-4">Licenses</h3>
                <div className="space-y-3">
                  {availableLicenses.map((license) => (
                    <div key={license} className="flex items-center space-x-2">
                      <Checkbox
                        id={`license-${license}`}
                        checked={selectedLicenses.includes(license)}
                        onCheckedChange={() => toggleLicense(license)}
                      />
                      <Label
                        htmlFor={`license-${license}`}
                        className="text-sm font-normal"
                      >
                        {license}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>

          <SheetFooter className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t">
            {totalActiveFilters > 0 && (
              <Button
                variant="outline"
                onClick={clearFilters}
                className="w-full"
              >
                Clear Filters
              </Button>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Active Filters Display */}
      {totalActiveFilters > 0 && (
        <div className="hidden md:flex gap-2">
          {selectedCategories.map((category) => (
            <Badge
              key={category}
              variant="secondary"
              className="cursor-pointer hover:bg-secondary/80"
              onClick={() => toggleCategory(category)}
              onKeyDown={(e) => e.key === 'Enter' && toggleCategory(category)}
              role="button"
              tabIndex={0}
              aria-label={`Remove ${category} filter`}
            >
              {category} ×
            </Badge>
          ))}
          {selectedLicenses.map((license) => (
            <Badge
              key={license}
              variant="secondary"
              className="cursor-pointer hover:bg-secondary/80"
              onClick={() => toggleLicense(license)}
            >
              {license} ×
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}