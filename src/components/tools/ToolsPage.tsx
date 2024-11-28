"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { ToolCardInterface } from "@/lib/types";
import ToolCard from "./ToolCard";
import ToolsPagination from "./ToolsPagination";
import ToolSkeleton from "./ToolSkeleton";
import ToolsFilter from "./ToolsFilter";

interface ToolPageProps {
  page: number;
}

const ToolsPage: React.FC<ToolPageProps> = ({ page }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [tools, setTools] = useState<ToolCardInterface[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );

  useEffect(() => {
    const fetchTools = async () => {
      try {
        setIsLoading(true);

        const params = new URLSearchParams();
        params.set("page", page.toString());

        if (searchQuery) {
          params.set("search", searchQuery);
        }

        const categories = searchParams.get("categories");
        if (categories) {
          params.set("categories", categories);
        }

        const tags = searchParams.get("tags");
        if (tags) {
          params.set("tags", tags);
        }

        const sort = searchParams.get("sort");
        if (sort) {
          params.set("sort", sort);
        }

        const response = await axios.get(`/api/tools?${params.toString()}`);
        setTools(response.data.tools);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        setError("Failed to fetch tools. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    20;
    fetchTools();
  }, [page, searchParams, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const params = new URLSearchParams(searchParams.toString());

    if (query) {
      params.set("search", query);
    } else {
      params.delete("search");
    }

    params.set("page", "1");
    router.push(`/tools?${params.toString()}`);
  };

  if (isLoading) {
    return (
      <div className="w-full flex flex-col gap-2 px-4 lg:px-48 pb-4 pt-12">
        <ToolsFilter onSearch={handleSearch} />
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
      <ToolsFilter onSearch={handleSearch} initialSearch={searchQuery} />
      {error ? (
        <div className="w-full flex justify-center items-center min-h-[400px] text-red-500">
          No Tool Found
        </div>
      ) : (
        <div>
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

        </div>
      )}
    </div>
  );
};

export default ToolsPage;
