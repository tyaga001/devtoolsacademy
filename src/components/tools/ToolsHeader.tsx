import { Suspense } from "react";
import { Search, Command } from "lucide-react";
import SearchInput from "@/components/tools/SearchInput";
import ToolsFilters from "@/components/tools/ToolsFilters";
import { Button } from "@/components/ui/button";
import { CommandMenu } from "@/components/tools/CommandMenu";

interface ToolsHeaderProps {
  defaultSearchValue: string;
  availableCategories: string[];
  availableLicenses: string[];
  selectedCategories: string[];
  selectedLicenses: string[];
  selectedSort: string;
  tools: any[]; // For command menu
}

export function ToolsHeader({
  defaultSearchValue,
  availableCategories,
  availableLicenses,
  selectedCategories,
  selectedLicenses,
  selectedSort,
  tools,
}: ToolsHeaderProps) {
  return (
    <div className="space-y-4 mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Developer Tools</h1>
          <p className="text-muted-foreground">
            Discover and compare developer tools for your next project
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Suspense fallback={<div className="h-10 w-full bg-muted animate-pulse rounded-md" />}>
            <SearchInput defaultValue={defaultSearchValue} />
          </Suspense>
        </div>

        {/* Command Menu Trigger */}
        <CommandMenu
          tools={tools}
          categories={availableCategories}
          licenses={availableLicenses}
          trigger={
            <Button
              variant="outline"
              size="icon"
              className="hidden md:flex"
              title="Command Menu (⌘K)"
            >
              <Command className="h-4 w-4" />
            </Button>
          }
        />

        {/* Filters */}
        <Suspense fallback={<div className="h-10 w-[150px] bg-muted animate-pulse rounded-md" />}>
          <ToolsFilters
            availableCategories={availableCategories}
            availableLicenses={availableLicenses}
            selectedCategories={selectedCategories}
            selectedLicenses={selectedLicenses}
            selectedSort={selectedSort}
          />
        </Suspense>
      </div>
    </div>
  );
}