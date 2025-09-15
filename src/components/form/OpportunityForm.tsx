import { useState } from "react";
import type {
  Opportunity,
  OpportunityFormProps,
} from "../../types/opportunity";

export default function OpportunityForm({
  onSubmit,
  goBack,
  lead,
}: OpportunityFormProps) {
  const [formState, setFormState] = useState({
    name: "",
    stage: "" as Opportunity["stage"],
    amount: 0,
    accountName: lead ? `${lead.name} - ${lead.company}` : "",
  });

  return (
    <div className="fixed z-20 shadow-xl/30 top-0 right-0 h-full p-4 overflow-y-auto bg-white dark:bg-gray-800 md:w-[40%] w-full">
      <button
        onClick={goBack}
        className="rounded-md p-2 text-gray-800 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none cursor-pointer mb-4"
        aria-label="Close"
      >
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
            d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
          />
        </svg>
      </button>

      <form
        className="max-w-full mx-auto p-4"
        onSubmit={(e) => {
          e.preventDefault();
          const opportunity: Opportunity = {
            id: crypto.randomUUID(),
            name: formState.name,
            stage: formState.stage,
            amount: formState.amount,
            accountName: formState.accountName,
          };
          onSubmit(opportunity);
        }}
      >
        <h3 className="text-lg text-gray-700 dark:text-gray-200 font-bold mb-6">
          Create an Opportunity
        </h3>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <label className="text-sm text-gray-700 dark:text-gray-200 flex flex-col gap-1">
            Name
            <input
              id="opportunity-name"
              type="text"
              className="w-full mt-1 bg-white dark:bg-gray-800 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-gray-100 text-sm border border-gray-300 dark:border-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 shadow-sm"
              required
              value={formState.name}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </label>

          <label className="text-sm text-gray-700 dark:text-gray-200 flex flex-col gap-1 relative">
            Stage
            <select
              id="stage"
              className="w-full mt-1 appearance-none bg-white dark:bg-gray-800 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-gray-100 text-sm border border-gray-300 dark:border-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 shadow-sm"
              value={formState.stage}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  stage: e.target.value as Opportunity["stage"],
                }))
              }
              required
            >
              <option value="" disabled>
                Select stage
              </option>
              <option value="Prospecting">Prospecting</option>
              <option value="Qualification">Qualification</option>
              <option value="Proposal">Proposal</option>
              <option value="Negotiation">Negotiation</option>
              <option value="Closed Won">Closed Won</option>
              <option value="Closed Lost">Closed Lost</option>
            </select>
            <span className="absolute right-3 top-1/2 pointer-events-none text-gray-400 dark:text-gray-300">
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
          </label>

          <label className="text-sm text-gray-700 dark:text-gray-200 flex flex-col gap-1">
            Amount
            <input
              id="amount"
              type="text"
              className="w-full mt-1 bg-white dark:bg-gray-800 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-gray-100 text-sm border border-gray-300 dark:border-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 shadow-sm"
              required
              value={formState.amount}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  amount: Number(e.target.value),
                }))
              }
            />
          </label>

          <label className="text-sm text-gray-700 dark:text-gray-200 flex flex-col gap-1">
            Account Name
            <input
              id="account-name"
              type="text"
              className="w-full mt-1 bg-white dark:bg-gray-800 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-gray-100 text-sm border border-gray-300 dark:border-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 shadow-sm"
              required
              value={formState.accountName}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  accountName: e.target.value,
                }))
              }
            />
          </label>
        </div>

        <button
          type="submit"
          className="w-full rounded-full sm:w-auto text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300 dark:focus:ring-emerald-800 font-medium text-sm px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
