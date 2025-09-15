import type { StatusFilterProps } from "../../types/filters";

export default function StatusFilter({
  statusType,
  setStatus,
}: StatusFilterProps) {
  return (
    <div className="w-full max-w-full md:max-w-70 mb-4">
      <div className="relative flex items-center">
        <select
          id="status-filter"
          name="status-filter"
          value={statusType}
          className="w-full appearance-none 
                     bg-white dark:bg-gray-800 
                     text-gray-900 dark:text-gray-100 
                     placeholder:text-gray-400 dark:placeholder:text-gray-400 
                     text-sm border border-gray-300 dark:border-gray-700 
                     rounded-md pl-4 py-2 
                     transition duration-300 ease 
                     focus:outline-none focus:border-teal-700 dark:focus:border-teal-800 
                     hover:border-gray-400 dark:hover:border-gray-600 shadow-sm focus:shadow"
          onChange={(e) => setStatus?.(e.target.value)}
        >
          <option value="">All</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Lost">Lost</option>
        </select>
        <span className="absolute right-3 pointer-events-none text-gray-400 dark:text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}
