'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  query?: string;
  categories?: string[];
  licenses?: string[];
  sort?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  query,
  categories,
  licenses,
  sort,
}: PaginationProps) {
  // Build URL params
 const buildUrl = (page: number) => {
  // Validate page number
  const validPage = Math.max(1, Math.min(page, totalPages));
  const params = new URLSearchParams();
  params.set("page", validPage.toString());

  if (query?.trim()) params.set("query", encodeURIComponent(query.trim()));
  if (sort) params.set("sort", sort);

  // More efficient handling of arrays
  if (categories?.length) params.set("categories", categories.join(","));
  if (licenses?.length) params.set("licenses", licenses.join(","));

  return `?${params.toString()}`;
};

  // Calculate page numbers to show
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const router = useRouter();

  // Add keyboard navigation
   useEffect(() => {
  const handleKeyPress = (e: KeyboardEvent) => {
    // Skip if input/textarea is focused
    if (['input', 'textarea'].includes((e.target as HTMLElement).tagName.toLowerCase())) return;

    if (e.key === 'ArrowLeft' && currentPage > 1) {
      e.preventDefault();
      router.push(buildUrl(currentPage - 1), { scroll: false });
    } else if (e.key === 'ArrowRight' && currentPage < totalPages) {
      e.preventDefault();
      router.push(buildUrl(currentPage + 1), { scroll: false });
    }
  };

  window.addEventListener('keydown', handleKeyPress);
  return () => window.removeEventListener('keydown', handleKeyPress);
}, [currentPage, totalPages, router, buildUrl]);


  return (
    <div className="flex items-center gap-2">
      {/* First page */}
      <Button
        variant="outline"
        size="icon"
        asChild
        disabled={currentPage === 1}
        aria-label="Go to first page"
      >
        <Link href={buildUrl(1)}>
          <ChevronsLeft className="h-4 w-4" />
        </Link>
      </Button>

      {/* Previous page */}
      <Button
        variant="outline"
        size="icon"
        asChild
        disabled={currentPage === 1}
      >
        <Link href={buildUrl(currentPage - 1)}>
          <ChevronLeft className="h-4 w-4" />
        </Link>
      </Button>

      {/* Page numbers */}
      {getPageNumbers().map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? "default" : "outline"}
          size="icon"
          asChild
        >
          <Link href={buildUrl(page)}>
            {page}
          </Link>
        </Button>
      ))}

      {/* Next page */}
      <Button
        variant="outline"
        size="icon"
        asChild
        disabled={currentPage === totalPages}
      >
        <Link href={buildUrl(currentPage + 1)}>
          <ChevronRight className="h-4 w-4" />
        </Link>
      </Button>

      {/* Last page */}
      <Button
        variant="outline"
        size="icon"
        asChild
        disabled={currentPage === totalPages}
      >
        <Link href={buildUrl(totalPages)}>
          <ChevronsRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}