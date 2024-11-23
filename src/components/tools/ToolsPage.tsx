'use client'

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
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  useEffect(() => {
    const fetchTools = async () => {
      try {
        setIsLoading(true);

        // Build query parameters
        const params = new URLSearchParams();
        params.set('page', page.toString());

        // Add search query if exists
        if (searchQuery) {
          params.set('search', searchQuery);
        }

        // Add categories if selected
        const categories = searchParams.get('categories');
        if (categories) {
          params.set('categories', categories);
        }

        // Add tags if selected
        const tags = searchParams.get('tags');
        if (tags) {
          params.set('tags', tags);
        }

        // Add sort parameter if exists
        const sort = searchParams.get('sort');
        if (sort) {
          params.set('sort', sort);
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

    fetchTools();
  }, [page, searchParams, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const params = new URLSearchParams(searchParams.toString());

    if (query) {
      params.set('search', query);
    } else {
      params.delete('search');
    }

    params.set('page', '1'); // Reset to first page on new search
    router.push(`/tools?${params.toString()}`);
  };

  if (isLoading) {
    return (
      <div className="w-full flex flex-col gap-2 px-4 lg:px-48 pb-4 pt-8 lg:pt-20">
        <ToolsFilter onSearch={handleSearch} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(10)].map((_, index) => (
            <ToolSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex justify-center items-center min-h-[400px] text-red-500">
        No Tool Found
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-2 px-4 lg:px-48 pb-4">
      <ToolsFilter onSearch={handleSearch} initialSearch={searchQuery} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-8 lg:pt-20">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
      <ToolsPagination currentPage={page} totalPages={totalPages} basePath="/tools" />
    </div>
  );
};

export default ToolsPage;
