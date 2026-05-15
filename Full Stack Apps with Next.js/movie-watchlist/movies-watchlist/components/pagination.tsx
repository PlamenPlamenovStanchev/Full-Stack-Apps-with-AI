import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

function pageHref(page: number) {
  return page === 1 ? "/movies" : `/movies?page=${page}`;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav className="flex flex-col gap-3 border-t border-stone-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm font-medium text-zinc-500">
        Page {currentPage} of {totalPages}
      </p>
      <div className="flex gap-2">
        {hasPrevious ? (
          <Link className="button-secondary" href={pageHref(currentPage - 1)} prefetch>
            Previous
          </Link>
        ) : (
          <span className="button-disabled">Previous</span>
        )}
        {hasNext ? (
          <Link className="button-secondary" href={pageHref(currentPage + 1)} prefetch>
            Next
          </Link>
        ) : (
          <span className="button-disabled">Next</span>
        )}
      </div>
    </nav>
  );
}
