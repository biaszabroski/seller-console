import type { OpportunitiesCardsProps } from "../../types/opportunity";

export default function OpportunitiesCards({
  opportunities,
}: OpportunitiesCardsProps) {
  return (
    <div className="w-full flex flex-col rounded-xl bg-gray-100 dark:bg-gray-900 p-4">
      <h3 className="text-xl pb-2 pt-2 text-center font-semibold text-gray-900 dark:text-white">
        Opportunities
      </h3>

      <div className="max-h-[600px] overflow-auto p-4 grid gap-4">
        {opportunities.map((opportunity) => (
          <div
            key={opportunity.id}
            className="relative bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 hover:shadow-lg transition"
          >
            <span className="absolute md:top-4 md:right-4 top-18 right-4 text-xs font-semibold px-2 py-1 rounded-sm bg-teal-600 dark: text-white dark:bg-teal-800">
              {opportunity.stage}
            </span>

            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {opportunity.name} + {opportunity.id}
            </h2>

            <div className="text-sm text-gray-600 dark:text-gray-300">
              <p>
                <span className="font-medium">Amount:</span>{" "}
                {opportunity.amount}
              </p>
              <p>
                <span className="font-medium">Account:</span>{" "}
                {opportunity.accountName}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
