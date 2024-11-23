'use client'

import { useState, useEffect } from "react";
import axios from "axios";
import { ToolCardInterface } from "@/lib/types";
import ToolCard from "./ToolCard";
import ToolsPagination from "./ToolsPagination";
import ToolSkeleton from "./ToolSkeleton";

interface ToolPageProps {
  page: number
}

const ToolsPage: React.FC<ToolPageProps> = ({ page }) => {
  const [tools, setTools] = useState<ToolCardInterface[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/tools?page=${page}`);
        setTools(response.data.tools);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        setError("Failed to fetch tools. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTools();
  }, [page]);

  if (isLoading) {
    return (
      <div className="w-full flex flex-col gap-2 px-4 lg:px-48 pb-4 pt-8 lg:pt-20">
        <div className="w-full flex flex-col gap-4">
          <div className="border w-full h-10 border-white border-opacity-10 rounded-[5px] text-left pl-8">Search Tools</div>
          <div className="w-full h-18 flex justify-evenly">
            <div className="px-3 h-full border border-white border-opacity-10 rounded-[5px] ">Categories</div>
            <div className="px-3 h-full border border-white border-opacity-10 rounded-[5px] ">Tags</div>
            <div className="px-3 h-full border border-white border-opacity-10 rounded-[5px] ">Sort By</div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
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
        {error}
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-2 px-4 lg:px-48 pb-4">
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
