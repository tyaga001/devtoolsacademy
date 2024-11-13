/**
 * Developer Tools Search & Category Page
 */
import { Suspense } from "react";
import { getTools, getToolsMetadata } from './actions';
import Pagination from "@/components/tools/Pagination";
import ActiveFilters from "@/components/tools/ActiveFilters";
import Loading from "./loading";
import { ToolsHeader } from "@/components/tools/ToolsHeader";
import ToolsContainer from "@/components/tools/ToolsContainer";
import { ErrorAlert } from "@/components/tools/ErrorAlert";

interface SearchParams {
  query?: string;
  page?: string;
  categories?: string | string[];
  licenses?: string | string[];
  sort?: string;
}

export default async function ToolsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  try {
    // SECTION: Initial Data Fetching
    let allTools, categories, licenses;
    try {
      const [toolsData, metadata] = await Promise.all([
        getTools({
          query: '',
          page: 1,
          limit: 100
        }),
        getToolsMetadata()
      ]);

      allTools = toolsData.tools;
      categories = metadata.categories;
      licenses = metadata.licenses;
    } catch (error) {
      console.error('Error fetching initial data:', error);
      throw new Error('Failed to load developer tools catalog');
    }

    // SECTION: Search Parameters Processing
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

    // SECTION: Filtered Data Fetching
    let filteredTools, total;
    try {
      const result = await getTools({
        query,
        page,
        limit,
        categories: selectedCategories,
        licenses: selectedLicenses,
        sort
      });
      filteredTools = result.tools;
      total = result.total;
    } catch (error) {
      console.error('Error fetching filtered tools:', error);
      throw new Error('Failed to load filtered tools');
    }

    return (
      <div className="bg-background min-h-screen">
        <main className="container mx-auto px-4 py-8">
          <ToolsHeader
            defaultSearchValue={query}
            availableCategories={categories}
            availableLicenses={licenses}
            selectedCategories={selectedCategories}
            selectedLicenses={selectedLicenses}
            selectedSort={sort}
            tools={allTools}
          />

          {(selectedCategories.length > 0 || selectedLicenses.length > 0) && (
            <ActiveFilters
              categories={selectedCategories}
              licenses={selectedLicenses}
            />
          )}

          <Suspense
            key={`${page}-${query}-${selectedCategories.join()}-${selectedLicenses.join()}-${sort}`}
            fallback={<Loading />}
          >
            <ToolsContainer tools={filteredTools} />
          </Suspense>

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
  } catch (error) {
    return (
      <ErrorAlert message={error instanceof Error ? error.message : 'An unexpected error occurred'}  />
    );
  }
}