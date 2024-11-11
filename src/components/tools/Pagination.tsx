'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

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
    const params = new URLSearchParams();
    params.set("page", page.toString());
    if (query) params.set("query", query);
    if (sort) params.set("sort", sort);
    categories?.forEach(cat => params.append("categories", cat));
    licenses?.forEach(license => params.append("licenses", license));
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

  return (
    <div className="flex items-center gap-2">
      {/* First page */}
      <Button
        variant="outline"
        size="icon"
        asChild
        disabled={currentPage === 1}
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