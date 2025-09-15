import { useState } from "react";
import { paginate } from "../../utils/paginate";
import type { LeadsTableProps } from "../../types/table";
import TablePagination from "./TablePagination";

export default function LeadsTable({
  leads,
  pageSize = 10,
  isDetailsOpen,
  onSelectLead,
  children,
}: LeadsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const { paginatedData: paginatedLeads, totalPages } = paginate(
    leads,
    currentPage,
    pageSize
  );

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table
          className={`w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ${
            isDetailsOpen ? "opacity-50" : ""
          }`}
        >
          <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            Leads
            <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
              Browse a list of potential clients and turn their interest into
              opportunities.
            </p>
          </caption>
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 bg-white dark:bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Company
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Source
              </th>
              <th scope="col" className="px-6 py-3">
                Score
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedLeads.map((lead) => (
              <tr
                key={lead.id}
                className={`border-b border-gray-300 dark:border-gray-700 ${
                  isDetailsOpen
                    ? "hover:cursor-default"
                    : "hover:cursor-pointer"
                }  hover:bg-gray-100 dark:hover:bg-gray-600`}
                onClick={onSelectLead ? () => onSelectLead(lead) : undefined}
                tabIndex={0}
                role="button"
              >
                <td
                  scope="row"
                  className="px-6 py-4 font-mediumwhitespace-nowrap"
                >
                  {lead.name}
                </td>
                <td className="px-6 py-4">{lead.company}</td>
                <td className="px-6 py-4">{lead.email}</td>
                <td className="px-6 py-4">{lead.source}</td>
                <td className="px-6 py-4">{lead.score}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                      lead.status === "New"
                        ? "bg-blue-200 text-blue-800"
                        : lead.status === "Contacted"
                        ? "bg-yellow-100 text-yellow-800"
                        : lead.status === "Qualified"
                        ? "bg-green-100 text-green-800"
                        : lead.status === "Lost"
                        ? "bg-red-200 text-red-800"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {lead.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>{children}</div>
      </div>
      <TablePagination
        onPageChange={handlePageChange}
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        totalItems={leads.length}
      />
    </div>
  );
}
