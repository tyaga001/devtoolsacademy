import { Suspense } from "react";
import { getTools, getToolsMetadata } from './actions';
import Pagination from "@/components/tools/Pagination";
import ActiveFilters from "@/components/tools/ActiveFilters";
import Loading from "./loading";
import { ToolsHeader } from "@/components/tools/ToolsHeader";
import ToolsContainer from "@/components/tools/ToolsContainer";

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
  // Fetch all data needed for command menu
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

  // Current page filters
  const page = Number(searchParams.page) || 1;
  const limit = 9;
  const query = searchParams.query || "";
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

  // Get filtered tools for current page
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
        {/* Header with both search and command */}
        <ToolsHeader
          defaultSearchValue={query}
          availableCategories={categories}
          availableLicenses={licenses}
          selectedCategories={selectedCategories}
          selectedLicenses={selectedLicenses}
          selectedSort={sort}
          tools={allTools}
        />

        {/* Active Filters Display */}
        {(selectedCategories.length > 0 || selectedLicenses.length > 0) && (
          <ActiveFilters
            categories={selectedCategories}
            licenses={selectedLicenses}
          />
        )}

        {/* Tools Grid */}
        <Suspense
          key={`${page}-${query}-${selectedCategories.join()}-${selectedLicenses.join()}-${sort}`}
          fallback={<Loading />}
        >
          <ToolsContainer tools={filteredTools} />
        </Suspense>

        {/* Pagination */}
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