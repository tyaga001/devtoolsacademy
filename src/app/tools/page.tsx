/**
 * Developer Tools Search & Category Page
 *
 * This page implements a searchable, filterable catalog of developer tools with the following features:
 * - Real-time search with debouncing
 * - Category and license filtering
 * - Sorting by relevance, stars, or last update
 * - Responsive grid/list view
 * - Pagination
 *
 * Key Components:
 * - ToolsHeader: Contains search, filters, and command menu
 * - ToolsContainer: Manages the grid/list view of tools
 * - Pagination: Handles page navigation
 * - ActiveFilters: Shows and manages active filters
 */

import { Suspense } from "react";
import { getTools, getToolsMetadata } from './actions';
import Pagination from "@/components/tools/Pagination";
import ActiveFilters from "@/components/tools/ActiveFilters";
import Loading from "./loading";
import { ToolsHeader } from "@/components/tools/ToolsHeader";
import ToolsContainer from "@/components/tools/ToolsContainer";

// Type definitions for search parameters
interface SearchParams {
  query?: string;
  page?: string;
  categories?: string | string[];
  licenses?: string | string[];
  sort?: string;
}

/**
 * Main page component for the developer tools catalog
 * Handles data fetching, filtering, and layout of the tools page
 */
export default async function ToolsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  // SECTION: Initial Data Fetching
  // Fetch all tools and metadata for command menu and filters
  const [
    { tools: allTools },
    { categories, licenses }
  ] = await Promise.all([
    getTools({
      query: '',
      page: 1,
      limit: 100  // Get all tools for command menu
    }),
    getToolsMetadata()
  ]);

  // SECTION: Search Parameters Processing
  // Extract and normalize search parameters
  const page = Number(searchParams.page) || 1;
  const limit = 9; // Tools per page
  const query = searchParams.query || "";

  // Convert category and license parameters to arrays
  const selectedCategories = Array.isArray(searchParams.categories)
    ? searchParams.categories
    : searchParams.categories
      ? [searchParams.categories]
      : [];

  const selectedLicenses = Array.isArray(searchParams.licenses)
    ? searchParams.licenses
    : searchParams.licenses
      ? [searchParams.licenses]
      : [];

  const sort = searchParams.sort || "relevance";

  // SECTION: Filtered Data Fetching
  // Get filtered tools based on current search parameters
  const { tools: filteredTools, total } = await getTools({
    query,
    page,
    limit,
    categories: selectedCategories,
    licenses: selectedLicenses,
    sort
  });

  return (
    <div className="bg-background min-h-screen">
      <main className="container mx-auto px-4 py-8">
        {/* Search Header Section */}
        <ToolsHeader
          defaultSearchValue={query}
          availableCategories={categories}
          availableLicenses={licenses}
          selectedCategories={selectedCategories}
          selectedLicenses={selectedLicenses}
          selectedSort={sort}
          tools={allTools}
        />

        {/* Active Filters Section - Only shown when filters are applied */}
        {(selectedCategories.length > 0 || selectedLicenses.length > 0) && (
          <ActiveFilters
            categories={selectedCategories}
            licenses={selectedLicenses}
          />
        )}

        {/* Tools Grid Section with Suspense for loading state */}
        <Suspense
          key={`${page}-${query}-${selectedCategories.join()}-${selectedLicenses.join()}-${sort}`}
          fallback={<Loading />}
        >
          <ToolsContainer tools={filteredTools} />
        </Suspense>

        {/* Pagination Section - Only shown when there are multiple pages */}
        {total > limit && (
          <div className="mt-8 flex justify-center">
            <Pagination
              currentPage={page}
              totalPages={Math.ceil(total / limit)}
              query={query}
              categories={selectedCategories}
              licenses={selectedLicenses}
              sort={sort}
            />
          </div>
        )}
      </main>
    </div>
  );
}