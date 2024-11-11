import { Suspense } from "react";
import { Search } from "lucide-react";
import ToolsGrid from "@/components/tools/ToolsGrid";
import SearchInput from "@/app/tools/SearchInput";
import ToolsFilters from "@/components/tools/ToolsFilters";
import { getTools, getToolsMetadata } from './actions'
import Pagination from "@/components/tools/Pagination";
import ActiveFilters from "@/components/tools/ActiveFilters";
import Loading from "./loading";

// Server Component
export default async function ToolsPage({
  searchParams,
}: {
  searchParams: {
    query?: string;
    page?: string;
    categories?: string | string[];
    licenses?: string | string[];
    sort?: string;
  };
}) {
  const page = Number(searchParams.page) || 1;
  const limit = 9; // Items per page
  const query = searchParams.query || "";

  // Convert potential string parameters to arrays
  const categories = Array.isArray(searchParams.categories)
    ? searchParams.categories
    : searchParams.categories
      ? [searchParams.categories]
      : [];

  const licenses = Array.isArray(searchParams.licenses)
    ? searchParams.licenses
    : searchParams.licenses
      ? [searchParams.licenses]
      : [];

  const sort = searchParams.sort || "relevance";

  // Fetch tools and metadata in parallel
  const [
    { tools, total },
    { categories: availableCategories, licenses: availableLicenses }
  ] = await Promise.all([
    getTools({ query, page, limit, categories, licenses, sort }),
    getToolsMetadata()
  ]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="bg-background min-h-screen">
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Developer Tools</h1>
              <p className="text-muted-foreground">
                Discover and compare developer tools for your next project
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Suspense fallback={<div className="h-10 w-full bg-muted animate-pulse rounded-md" />}>
                <SearchInput defaultValue={query} />
              </Suspense>
            </div>

            <Suspense fallback={<div className="h-10 w-[150px] bg-muted animate-pulse rounded-md" />}>
              <ToolsFilters
                availableCategories={availableCategories}
                availableLicenses={availableLicenses}
                selectedCategories={categories}
                selectedLicenses={licenses}
                selectedSort={sort}
              />
            </Suspense>
          </div>

          {/* Active Filters Display */}
          {(categories.length > 0 || licenses.length > 0) && (
            <ActiveFilters
              categories={categories}
              licenses={licenses}
            />
          )}
        </div>

        {/* Tools Grid with Suspense */}
        <Suspense
          key={`${page}-${query}-${categories.join()}-${licenses.join()}-${sort}`}
          fallback={<Loading />}
        >
          <ToolsGrid tools={tools} />
        </Suspense>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              query={query}
              categories={categories}
              licenses={licenses}
              sort={sort}
            />
          </div>
        )}
      </main>
    </div>
  );
}