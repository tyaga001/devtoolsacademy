import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Check, ChevronDown } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';


const categories = [
  "tools",
  "frontend",
  "backend",
  "api"
];

const tags = [
  "performance",
  "image",
  "lint",
  "productivity"
]
interface ToolsFilterProps {
  onSearch: (query: string) => void;
  initialSearch?: string;
}

const ToolsFilter: React.FC<ToolsFilterProps> = ({ onSearch, initialSearch = '' }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useState(initialSearch);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get('categories')?.split(',').filter(Boolean) || []
  );

  const [selectedTags, setSelectedTags] = useState<string[]>(
    searchParams.get('tags')?.split(',').filter(Boolean) || []
  );

  useEffect(() => {
    setSearchValue(initialSearch);
  }, [initialSearch]);

  const updateURLWithParams = (params: URLSearchParams) => {
    // Always reset to page 1 when filters change
    params.set('page', '1');
    router.push(`/tools?${params.toString()}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  const updateFilters = (type: 'categories' | 'tags', value: string) => {
    const updateState = type === 'categories'
      ? setSelectedCategories
      : setSelectedTags;

    const currentSelection = type === 'categories'
      ? selectedCategories
      : selectedTags;

    const newSelection = currentSelection.includes(value)
      ? currentSelection.filter(item => item !== value)
      : [...currentSelection, value];

    updateState(newSelection);

    const params = new URLSearchParams(searchParams.toString());
    if (newSelection.length > 0) {
      params.set(type, newSelection.join(','));
    } else {
      params.delete(type);
    }

    updateURLWithParams(params);
  };

  const updateSort = (sortValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (params.get("page")) {
      params.set('sort', sortValue);
      updateURLWithParams(params);
    }
  };

  const FilterPopover = ({
    title,
    options,
    selected,
    type
  }: {
    title: string,
    options: string[],
    selected: string[],
    type: 'categories' | 'tags'
  }) => (
    <Popover>
      <PopoverTrigger className="px-4 py-2 border border-white border-opacity-10 rounded-md flex items-center gap-2 hover:bg-white/5">
        {title}
        <ChevronDown className="h-4 w-4" />
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2 bg-black border border-white/10 rounded-md">
        <div className="flex flex-col gap-1">
          {options.map((option) => (
            <button
              key={option}
              className="flex items-center justify-between px-2 py-1 rounded hover:bg-white/5 text-left"
              onClick={() => updateFilters(type, option)}
            >
              <span>{option}</span>
              {selected.includes(option) && (
                <Check className="h-4 w-4" />
              )}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search tools..."
          value={searchValue}
          onChange={handleSearchChange}
          className="w-full h-10 bg-transparent border border-white/10 rounded-md pl-4 pr-8 focus:outline-none focus:ring-1 focus:ring-white/20"
        />
      </div>

      <div className="flex gap-4 flex-wrap">
        <FilterPopover
          title="Categories"
          options={categories}
          selected={selectedCategories}
          type="categories"
        />

        <FilterPopover
          title="Tags"
          options={tags}
          selected={selectedTags}
          type="tags"
        />

        <Popover>
          <PopoverTrigger className="px-4 py-2 border border-white border-opacity-10 rounded-md flex items-center gap-2 hover:bg-white/5">
            Sort By
            <ChevronDown className="h-4 w-4" />
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2 bg-black border border-white/10 rounded-md">
            <div className="flex flex-col gap-1">
              <button
                className="px-2 py-1 text-left hover:bg-white/5 rounded"
                onClick={() => updateSort('recent')}
              >
                Most Recent
              </button>
              <button
                className="px-2 py-1 text-left hover:bg-white/5 rounded"
                onClick={() => updateSort('popular')}
              >
                Most Popular
              </button>
              <button
                className="px-2 py-1 text-left hover:bg-white/5 rounded"
                onClick={() => updateSort('alphabetical')}
              >
                Alphabetical
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {(selectedCategories.length > 0 || selectedTags.length > 0) && (
        <div className="flex flex-wrap gap-2">
          {selectedCategories.map((category) => (
            <span
              key={category}
              className="px-2 py-1 bg-white/5 rounded-md text-sm flex items-center gap-1"
            >
              {category}
              <button
                onClick={() => updateFilters('categories', category)}
                className="hover:text-red-400"
              >
                ×
              </button>
            </span>
          ))}
          {selectedTags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-white/5 rounded-md text-sm flex items-center gap-1"
            >
              {tag}
              <button
                onClick={() => updateFilters('tags', tag)}
                className="hover:text-red-400"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ToolsFilter;
