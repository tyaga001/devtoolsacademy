"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { ToolCardInterface } from "@/lib/types";
import ToolCard from "./ToolCard";
import ToolsPagination from "./ToolsPagination";
import ToolSkeleton from "./ToolSkeleton";
import { getTools } from "./AlgoliaSearch";

interface ToolPageProps {
  page: number;
}

const ToolsPage: React.FC<ToolPageProps> = ({ page }) => {
  const searchParams = useSearchParams();

  const [tools, setTools] = useState<ToolCardInterface[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTools = async () => {
      setIsLoading(true);
      setError(null);

      const query = searchParams.get("query");
      const categories = searchParams.get("categories");
      const tags = searchParams.get("tags");
      const sort = searchParams.get("sort");

      try {
        if (query) {
          // Algolia search
          const data = await getTools(query);
          setTools(data);
          setTotalPages(1); // Algolia doesn't provide pagination info
          if (data.length === 0) {
            setError("No tools found matching your search criteria.");
          }
        } else {
          // Backend filtering
          const params = new URLSearchParams();
          params.set("page", page.toString());
          if (categories) params.set("categories", categories);
          if (tags) params.set("tags", tags);
          if (sort) params.set("sort", sort);

          const response = await axios.get(`/api/tools?${params.toString()}`);
          setTools(response.data.tools);
          setTotalPages(response.data.totalPages);
          if (response.data.tools.length === 0) {
            setError("No tools found matching your filter criteria.");
          }
        }
      } catch (err) {
        console.error("Error fetching tools:", err);
        setError("Failed to fetch tools. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTools();
  }, [page, searchParams]);

  if (isLoading) {
    return (
      <div className="w-full flex flex-col gap-2 px-4 lg:px-48 pb-4 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-8 lg:pt-6">
          {[...Array(10)].map((_, index) => (
            <ToolSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-2 px-4 lg:px-48 pb-4 pt-12">
      {error ? (
        <div className="w-full flex justify-center items-center min-h-[400px] text-red-500">
          {error}
        </div>
      ) : (
        <div>
          {tools.length === 0 ? (
            <div className="w-full flex justify-center items-center min-h-[400px] text-gray-500">
              No tools found. Try adjusting your search or filter criteria.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-8 lg:pt-6">
                {tools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
              <ToolsPagination
                currentPage={page}
                totalPages={totalPages}
                basePath="/tools"
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ToolsPage;


