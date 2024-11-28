import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, ChevronDown, Search } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const categories = ["tools", "frontend", "backend", "api"];
const tags = ["editing", "tool", "links", "api"];

interface ToolsFilterProps {
  onSearch: (query: string) => void;
  initialSearch?: string;
}

const ToolsFilter: React.FC<ToolsFilterProps> = ({
  onSearch,
  initialSearch = "",
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useState(initialSearch);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("categories")?.split(",").filter(Boolean) || []
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(
    searchParams.get("tags")?.split(",").filter(Boolean) || []
  );

  useEffect(() => {
    setSearchValue(initialSearch);
  }, [initialSearch]);

  const updateURLWithParams = (params: URLSearchParams) => {
    params.set("page", "1");
    router.push(`/tools?${params.toString()}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
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
    if (params.get("page")) {
      params.set("sort", sortValue);
      updateURLWithParams(params);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 p-6">
      <div className="flex gap-4 items-center">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search tools..."
            value={searchValue}
            onChange={handleSearchChange}
            className="w-full h-12 bg-gray-800 border border-white/20 rounded-full pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>
        <div className="flex">
          <Popover>
            <PopoverTrigger className="px-4 py-2 h-12 border border-white/20 rounded-l-full flex items-center gap-2 hover:bg-white/10 transition-colors duration-200">
              Filters
              <ChevronDown className="h-4 w-4" />
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-4 bg-gray-900 border border-white/20 rounded shadow-lg">
              <div className="flex gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Categories</h3>
                  <div className="flex flex-col gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        className="flex items-center justify-between px-3 py-2 rounded hover:bg-white/10 text-left transition-colors duration-200"
                        onClick={() => updateFilters("categories", category)}
                      >
                        <span className="capitalize">{category}</span>
                        {selectedCategories.includes(category) && (
                          <Check className="h-4 w-4 text-green-400" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Tags</h3>
                  <div className="flex flex-col gap-2">
                    {tags.map((tag) => (
                      <button
                        key={tag}
                        className="flex items-center justify-between px-3 py-2 rounded hover:bg-white/10 text-left transition-colors duration-200"
                        onClick={() => updateFilters("tags", tag)}
                      >
                        <span className="capitalize">{tag}</span>
                        {selectedTags.includes(tag) && (
                          <Check className="h-4 w-4 text-green-400" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger className="px-4 py-2 h-12 border border-white/20 rounded-r-full flex items-center gap-2 hover:bg-white/10 transition-colors duration-200">
              Sort By
              <ChevronDown className="h-4 w-4" />
            </PopoverTrigger>
            <PopoverContent className="w-48 p-2 bg-gray-900 border border-white/20 rounded shadow-lg">
              <div className="flex flex-col gap-1">
                {["recent", "popular", "alphabetical"].map((option) => (
                  <button
                    key={option}
                    className="px-3 py-2 text-left hover:bg-white/10 rounded transition-colors duration-200 capitalize"
                    onClick={() => updateSort(option)}
                  >
                    Most {option}
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
            {[...selectedTags].map((item) => (
              <span
                key={item}
                className="px-3 py-1 bg-white/10 rounded-full text-sm flex items-center gap-2 transition-colors duration-200 hover:bg-white/20"
              >
                {item}
                <button
                  onClick={() =>
                    updateFilters(
                      categories.includes(item) ? "categories" : "tags",
                      item
                    )
                  }
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
            {[...selectedCategories].map((item) => (
              <span
                key={item}
                className="px-3 py-1 bg-white/10 rounded-full text-sm flex items-center gap-2 transition-colors duration-200 hover:bg-white/20"
              >
                {item}
                <button
                  onClick={() =>
                    updateFilters(
                      categories.includes(item) ? "categories" : "tags",
                      item
                    )
                  }
                  className="hover:text-red-400 transition-colors duration-200"
                  aria-label={`Remove ${item} filter`}
                >
                  x{" "}
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
