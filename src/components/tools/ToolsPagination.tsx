import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface ToolsPaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function ToolsPagination({ currentPage, totalPages, basePath }: ToolsPaginationProps) {
  const createPageUrl = (pageNumber: number) => {
    const url = new URL(basePath, 'http://example.com');
    url.searchParams.set('page', pageNumber.toString());
    return `${url.pathname}${url.search}`;
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
