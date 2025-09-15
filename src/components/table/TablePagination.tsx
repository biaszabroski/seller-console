import type { TablePaginationProps } from "../../types/table";

export default function TablePagination({
  currentPage,
  totalPages,
  pageSize = 10,
  totalItems,
  onPageChange,
}: TablePaginationProps) {
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    // Always show first page
    if (totalPages > 0) pages.push(1);

    // Ellipsis before current range
    if (currentPage > 3) pages.push("...");

    // Pages around current (window of 1 on each side)
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }

    // Ellipsis after current range
    if (currentPage < totalPages - 2) pages.push("...");

    // Always show last page (if > 1)
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav
      className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
      aria-label="Table navigation"
    >
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
        Showing{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {(currentPage - 1) * pageSize + 1}
        </span>{" "}
        to{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {Math.min(currentPage * pageSize, totalItems)}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {totalItems}
        </span>
      </span>

      <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
        <li>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-gray-200 border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer disabled:cursor-not-allowed"
          >
            Previous
          </button>
        </li>

        {pageNumbers.map((page, idx) => (
          <li key={idx}>
            {page === "..." ? (
              <span className="flex items-center justify-center px-3 h-8 text-gray-400">
                ...
              </span>
            ) : (
              <button
                onClick={() => handlePageChange(page as number)}
                aria-current={currentPage === page ? "page" : undefined}
                className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 cursor-pointer ${
                  currentPage === page
                    ? "text-emerald-600 bg-gray-100 hover:bg-blue-100 hover:text-emerald-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    : "text-gray-500 bg-gray-200 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                }`}
              >
                {page}
              </button>
            )}
          </li>
        ))}

        <li>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-gray-200 border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer disabled:cursor-not-allowed"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
