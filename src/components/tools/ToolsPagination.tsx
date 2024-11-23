import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useSearchParams } from "next/navigation";

interface ToolsPaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function ToolsPagination({ currentPage, totalPages, basePath }: ToolsPaginationProps) {
  const searchParams = useSearchParams();
  const createPageUrl = (pageNumber: number) => {
    // Create a new URLSearchParams instance with all current parameters
    const params = new URLSearchParams(searchParams.toString());

    // Update the page parameter
    params.set('page', pageNumber.toString());

    // Combine the base path with all query parameters
    return `${basePath}?${params.toString()}`;
  };
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={currentPage > 1 ? createPageUrl(currentPage - 1) : '#'}
            aria-disabled={currentPage === 1}
          />
        </PaginationItem>

        {[...Array(totalPages)].map((_, i) => {
          if (i === 0 || i === totalPages - 1 || (i >= currentPage - 2 && i <= currentPage + 2)) {
            return (
              <PaginationItem key={i}>
                <PaginationLink href={createPageUrl(i + 1)} isActive={currentPage === i + 1}>
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            );
          } else if (i === currentPage - 3 || i === currentPage + 3) {
            return <PaginationEllipsis key={i} />;
          }
          return null;
        })}

        <PaginationItem>
          <PaginationNext
            href={currentPage < totalPages ? createPageUrl(Number(currentPage) + 1) : '#'}
            aria-disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
