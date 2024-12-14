"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, ChevronDown, Filter, Folder, SortAsc, Tag } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import SearchBar from "./SearchBar";

const categories = [
  "tools",
  "frontend",
  "backend",
  "api",
  "devops",
  "cloud",
  "e-commerce",
  "chat",
];
const tags = [
  "postgreSQL",
  "cloud-native",
  "NoSQL",
  "api",
  "GraphQL",
  "CMS",
  "database",
  "devops",
];

const ToolsFilter: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("categories")?.split(",").filter(Boolean) || []
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(
    searchParams.get("tags")?.split(",").filter(Boolean) || []
  );
  const [selectedSort, setSelectedSort] = useState("");

  useEffect(() => {
    setSelectedCategories(
      searchParams.get("categories")?.split(",").filter(Boolean) || []
    );
    setSelectedTags(searchParams.get("tags")?.split(",").filter(Boolean) || []);
    setSelectedSort(searchParams.get("sort") || "");
  }, [searchParams]);

  const updateURLWithParams = (params: URLSearchParams) => {
    params.set("page", "1");
    params.delete("query"); // Remove query parameter
    router.push(`/tools?${params.toString()}`);
  };

  const updateFilters = (type: "categories" | "tags", value: string) => {
    const updateState =
      type === "categories" ? setSelectedCategories : setSelectedTags;
    const currentSelection =
      type === "categories" ? selectedCategories : selectedTags;

    const newSelection = currentSelection.includes(value)
      ? currentSelection.filter((item) => item !== value)
      : [...currentSelection, value];

    updateState(newSelection);

    const params = new URLSearchParams(searchParams.toString());
    if (newSelection.length > 0) {
      params.set(type, newSelection.join(","));
    } else {
      params.delete(type);
    }
    updateURLWithParams(params);
  };

  const updateSort = (sortValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", sortValue);
    updateURLWithParams(params);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedTags([]);
    setSelectedSort("");

    const params = new URLSearchParams(window.location.search);
    params.delete("categories");
    params.delete("tags");
    params.delete("sort");

    updateURLWithParams(params);
  };

  return (
    <div className="w-full flex flex-col gap-6 pt-12 md:px-6">
      <div className="flex flex-col-reverse md:flex-row w-full gap-4">
        <div className="flex-1">
          <SearchBar />
        </div>
        <div className="flex items-center justify-end">
          <Popover>
            <PopoverTrigger className="w-full md:w-fit px-2 py-1 md:px-4 md:py-2 h-12 border border-white/20 rounded-l-full flex justify-around items-center gap-2 hover:bg-white/10 transition-colors duration-200">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </div>
              <ChevronDown className="h-4 w-4" />
            </PopoverTrigger>
            <PopoverContent className="w-[300px] ml-2 md:ml-0 md:w-[400px] p-4 bg-[#141414] border border-white/20 rounded shadow-lg">
              <div className="rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-300">
                    Filters
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearFilters}
                    className="text-xs md:text-sm rounded-full text-gray-400 hover:text-gray-300"
                  >
                    Clear All
                  </Button>
                </div>

                <div className="flex gap-6">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2 flex items-center text-gray-100 text-sm md:text-lg">
                      <Folder className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                      Categories
                    </h3>
                    <div className="rounded-[10px]">
                      <div className="p-2">
                        {categories.map((category) => (
                          <div
                            key={category}
                            className={`flex items-center justify-between px-3 py-2 rounded w-full text-left transition-colors duration-200 cursor-pointer hover:bg-gray-100 hover:bg-opacity-10`}
                            onClick={() =>
                              updateFilters("categories", category)
                            }
                          >
                            <span className="capitalize text-xs md:text-sm">
                              {category}
                            </span>
                            {selectedCategories.includes(category) && (
                              <Check className="h-3 w-3 md:h-4 md:w-4" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold mb-2 flex items-center text-gray-100 text-sm md:text-lg">
                      <Tag className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                      Tags
                    </h3>
                    <div className="rounded-[10px]">
                      <div className="p-2">
                        {tags.map((tag) => (
                          <div
                            key={tag}
                            className={`flex items-center justify-between px-3 py-2 rounded w-full text-left transition-colors duration-200 cursor-pointer hover:bg-white hover:bg-opacity-10`}
                            onClick={() => updateFilters("tags", tag)}
                          >
                            <span className="capitalize text-xs md:text-sm">
                              {tag}
                            </span>
                            {selectedTags.includes(tag) && (
                              <Check className="h-3 w-3 md:h-4 md:w-4" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger className="w-full md:w-fit px-2 py-1 md:px-4 md:py-2 h-12 border border-white/20 rounded-r-full flex justify-around items-center gap-2 hover:bg-white/10 transition-colors duration-200">
              <div className="flex items-center gap-2">
                <SortAsc className="h-4 w-4" />
                Sort By
              </div>
              <ChevronDown className="h-4 w-4" />
            </PopoverTrigger>
            <PopoverContent className="w-36 md:w-48 p-2 bg-[#141414] border border-white/20 rounded shadow-lg">
              <div className="flex flex-col gap-1">
                {["recent", "popular", "alphabetical"].map((option) => (
                  <button
                    key={option}
                    className="px-3 py-2 text-left hover:bg-gray-100 hover:bg-opacity-10 rounded transition-colors duration-200 capitalize flex items-center justify-between text-xs md:text-sm"
                    onClick={() => {
                      updateSort(option);
                      setSelectedSort(option);
                    }}
                  >
                    {option}
                    {selectedSort === option && (
                      <Check className="h-3 w-3 md:h-4 md:w-4" />
                    )}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {selectedTags.length > 0 && (
        <div className="flex flex-col gap-1">
          <div>
            <p className="p-0 m-0">Tags Selected:</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((item) => (
              <span
                key={item}
                className="px-3 py-1 bg-white/10 rounded-full text-sm flex items-center gap-2 transition-colors duration-200 hover:bg-white/20"
              >
                {item}
                <button
                  onClick={() => updateFilters("tags", item)}
                  className="hover:text-red-400 transition-colors duration-200"
                  aria-label={`Remove ${item} filter`}
                >
                  x
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
      {selectedCategories.length > 0 && (
        <div className="flex flex-col gap-1">
          <div>
            <p className="p-0 m-0">Categories Selected:</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((item) => (
              <span
                key={item}
                className="px-3 py-1 bg-white/10 rounded-full text-sm flex items-center gap-2 transition-colors duration-200 hover:bg-white/20"
              >
                {item}
                <button
                  onClick={() => updateFilters("categories", item)}
                  className="hover:text-red-400 transition-colors duration-200"
                  aria-label={`Remove ${item} filter`}
                >
                  x
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolsFilter;
