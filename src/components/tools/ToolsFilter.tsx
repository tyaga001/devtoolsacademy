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

const categories = ["tools", "frontend", "backend", "api"];
const tags = ["editing", "tool", "links", "api"];

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

    const params = new URLSearchParams(window.location.search);
    params.delete("categories");
    params.delete("tags");

    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );
  };

  return (
    <div className="w-full flex flex-col gap-6 pt-12">
      <div className="flex w-full gap-4">
        <div className="flex-1">
          <SearchBar />
        </div>
        <div className="flex items-center justify-end">
          <Popover>
            <PopoverTrigger className="px-4 py-2 h-12 border border-white/20 rounded-l-full flex items-center gap-2 hover:bg-white/10 transition-colors duration-200">
              <Filter className="h-4 w-4" />
              Filters
              <ChevronDown className="h-4 w-4" />
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-4 bg-gray-900 border border-white/20 rounded shadow-lg">
              <div className="rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-300">Filters</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearFilters}
                    className="text-sm rounded-full text-gray-500 hover:text-gray-400"
                  >
                    Clear All
                  </Button>
                </div>

                <div className="flex gap-6">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2 flex items-center text-gray-100">
                      <Folder className="mr-2 h-5 w-5" />
                      Categories
                    </h3>
                    <div className="rounded-[10px]">
                      <div className="p-2">
                        {categories.map((category) => (
                          <div
                            key={category}
                            className={`flex items-center justify-between px-3 py-2 rounded w-full text-left transition-colors duration-200 cursor-pointer hover:bg-gray-700`}
                            onClick={() =>
                              updateFilters("categories", category)
                            }
                          >
                            <span className="capitalize text-sm">
                              {category}
                            </span>
                            {selectedCategories.includes(category) && (
                              <Check className="h-4 w-4 text-blue-600" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold mb-2 flex items-center text-gray-100">
                      <Tag className="mr-2 h-5 w-5" />
                      Tags
                    </h3>
                    <div className="rounded-[10px]">
                      <div className="p-2">
                        {tags.map((tag) => (
                          <div
                            key={tag}
                            className={`flex items-center justify-between px-3 py-2 rounded w-full text-left transition-colors duration-200 cursor-pointer hover:bg-gray-700`}
                            onClick={() => updateFilters("tags", tag)}
                          >
                            <span className="capitalize text-sm">{tag}</span>
                            {selectedTags.includes(tag) && (
                              <Check className="h-4 w-4 text-blue-600" />
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
            <PopoverTrigger className="px-4 py-2 h-12 border border-white/20 rounded-r-full flex items-center gap-2 hover:bg-white/10 transition-colors duration-200">
              <SortAsc className="h-4 w-4" />
              Sort By
              <ChevronDown className="h-4 w-4" />
            </PopoverTrigger>
            <PopoverContent className="w-48 p-2 bg-gray-900 border border-white/20 rounded shadow-lg">
              <div className="flex flex-col gap-1">
                {["recent", "popular", "alphabetical"].map((option) => (
                  <button
                    key={option}
                    className="px-3 py-2 text-left hover:bg-white/10 rounded transition-colors duration-200 capitalize flex items-center justify-between"
                    onClick={() => {
                      updateSort(option);
                      setSelectedSort(option);
                    }}
                  >
                    {option}
                    {selectedSort === option && <Check className="h-4 w-4" />}
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
