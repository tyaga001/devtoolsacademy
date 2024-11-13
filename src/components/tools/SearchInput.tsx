'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import { useDebounce } from "use-debounce";

export default function SearchInput({ defaultValue = "" }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Handle search input change
  const handleSearch = (term: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      if (term) {
        params.set("query", term);
      } else {
        params.delete("query");
      }
      // Reset to first page when searching
      params.delete("page");
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  // Use debounce to avoid too many URL updates
  const [debouncedCallback] = useDebounce(handleSearch, 300);

  return (
    <Input
      type="text"
      placeholder="Search developer tools..."
      className="pl-10 w-full"
      defaultValue={defaultValue}
      onChange={(e) => debouncedCallback(e.target.value)}
      aria-label="Search developer tools"
      role="searchbox"
    />
  );
}