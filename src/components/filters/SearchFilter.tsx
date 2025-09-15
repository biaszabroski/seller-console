import type { SearchFilterProps } from "../../types/filters";

export default function SearchFilter({ value, onSearch }: SearchFilterProps) {
  return (
    <div className="w-full max-w-full md:max-w-70 mb-4">
      <div className="relative flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="absolute w-5 h-5 top-2.5 left-2.5 text-gray-500 dark:text-gray-400"
        >
          <path d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" />
        </svg>

        <input
          className="w-full bg-white dark:bg-gray-800 
                     placeholder:text-gray-400 dark:placeholder:text-gray-500 
                     text-gray-900 dark:text-gray-100 
                     text-sm border border-gray-300 dark:border-gray-700 
                     rounded-md pl-10 pr-3 py-2 
                     transition duration-300 ease 
                     focus:outline-none focus:border-teal-700 dark:focus:border-teal-800 
                     hover:border-gray-400 dark:hover:border-gray-600 
                     shadow-sm focus:shadow"
          placeholder="Search by name or company..."
          onChange={(e) => onSearch?.(e.target.value)}
          value={value}
          type="text"
          name="search"
          id="search"
          aria-label="Search"
        />
      </div>
    </div>
  );
}
