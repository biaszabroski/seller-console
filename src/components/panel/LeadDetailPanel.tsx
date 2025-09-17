import { useState } from "react";
import type { Lead } from "../../types/leads";
import type { LeadDetailPanelProps } from "../../types/panel";

export default function LeadDetailPanel({
  onClose,
  lead,
  onConvert,
  onSave,
}: LeadDetailPanelProps) {
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [email, setEmail] = useState(lead?.email || "");
  const [status, setStatus] = useState(lead?.status || "");

  const handleSave = () => {
    if (lead) {
      const updatedLead: Lead = {
        ...lead,
        email,
        status: status as Lead["status"],
      };
      onSave(updatedLead);
    }
    setIsEditingEmail(false);
    setIsEditingStatus(false);
  };

  const handleCancel = () => {
    setEmail(lead?.email || "");
    setStatus(lead?.status || "");
    setIsEditingEmail(false);
    setIsEditingStatus(false);
  };

  return (
    <div className="fixed z-10 shadow-xl/30 top-0 right-0 h-full p-4 overflow-y-auto bg-white dark:bg-gray-800 md:w-fit w-full">
      <div className="px-4 py-4 border-b border-gray-300 dark:border-gray-700 flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">
          Lead Details
        </h3>
        <button
          onClick={onClose}
          className="rounded-md p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 focus:outline-none cursor-pointer"
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
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="p-6 overflow-y-auto space-y-4">
        {lead ? (
          <>
            <h4 className="text-md font-semibold text-gray-900 dark:text-gray-100 flex whitespace-normal md:whitespace-nowrap">
              {lead.name} •
              <form>
                {isEditingEmail ? (
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full min-w-60 ml-2 px-2 py-1 text-sm border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                ) : (
                  <span
                    className="ml-2 text-gray-800 dark:text-gray-200 cursor-pointer font-semibold flex items-center gap-2"
                    onClick={() => setIsEditingEmail(true)}
                  >
                    {email}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </span>
                )}
              </form>
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {lead.company}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium text-gray-800 dark:text-gray-200">
                Source:
              </span>{" "}
              {lead.source}
            </p>

            <div></div>

            <div>
              {isEditingStatus ? (
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  Status:
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="ml-2 px-2 py-1 text-sm border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Lost">Lost</option>
                  </select>
                </span>
              ) : (
                <span
                  className="text-sm font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2 "
                  onClick={() => setIsEditingStatus(true)}
                >
                  Status: <b />
                  {status}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </span>
              )}
            </div>

            {(isEditingEmail || isEditingStatus) && (
              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleSave}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-emerald-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-sm"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="px-3 py-1 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded hover:bg-gray-400 dark:hover:bg-gray-600 text-sm"
                >
                  Cancel
                </button>
              </div>
            )}

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => onConvert(lead)}
                className="w-full rounded-full sm:w-auto text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300 dark:focus:ring-emerald-800 font-medium text-sm px-5 py-2.5 text-center"
              >
                Convert Lead
              </button>
            </div>
          </>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Lead not selected
          </p>
        )}
      </div>
    </div>
  );
}
