"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ToolCardInterface } from "@/lib/types";
import axios from "axios";
import ToolCard from "../ToolCard";
import ToolSkeleton from "../ToolSkeleton";

interface SimilarToolsProps {
  slug: string;
  tags: string[];
  categories: string[];
}

const SimilarTools: React.FC<SimilarToolsProps> = ({
  slug,
  tags,
  categories,
}) => {
  const [similarTagTools, setSimilarTagTools] = useState<ToolCardInterface[]>(
    []
  );
  const [similarCategoriesTools, setSimilarCategoriesTools] = useState<
    ToolCardInterface[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const memoizedTags = useMemo(() => tags, [tags]);
  const memoizedCategories = useMemo(() => categories, [categories]);

  useEffect(() => {
    const fetchSimilarTools = async () => {
      try {
        const response = await axios.post("/api/tools/similar", {
          slug,
          tags,
          categories,
        });

        const data = response.data;
        setSimilarTagTools(data.similarTagTools || []);
        setSimilarCategoriesTools(data.similarCategoriesTools || []);
      } catch (error) {
        console.error("Error fetching similar tools:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSimilarTools();
  }, [slug, memoizedTags, memoizedCategories]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 mt-8">
        <div className=" bg-[#141414] animate-pulse w-48 h-6 rounded-xl pt-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {[...Array(3)].map((_, index) => (
            <ToolSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="similar-tools pt-6">
      <h3 className="text-2xl md:text-3xl font-bold">Similar Tools</h3>
      <div className="flex flex-col gap-4 mt-8">
        {similarTagTools && similarTagTools.length > 0 && (
          <div>
            <h3 className="text-xl font-medium text-gray-400">Based on Tags</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 pt-4">
              {similarTagTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        )}
        {similarCategoriesTools && similarCategoriesTools.length > 0 && (
          <div className="mt-8 md:mt-0">
            <h3 className="text-xl font-medium text-gray-400">
              Based on Categories
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 pt-4">
              {similarCategoriesTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimilarTools;
