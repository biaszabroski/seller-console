import { useEffect, useState } from "react";
import LeadsTable from "../components/table/LeadsTable";
import leadsData from "../data/leads.json";
import type { Lead, LeadsState } from "../types/leads";
import SearchFilter from "../components/filters/SearchFilter";
import StatusFilter from "../components/filters/StatusFilter";
import type { Opportunity } from "../types/opportunity";
import LeadDetailPanel from "../components/panel/LeadDetailPanel";
import { processLeads } from "../utils/filters";
import OpportunitiesCards from "../components/cards/OpportunitiesCards";
import useDebounce from "../hooks/useDebounce";
import useFetch from "../hooks/useFetch";
import Loading from "../components/validators/Loading";
import SortFilter from "../components/filters/SortFilter";
import ThemeToggle from "../components/theme/ThemeToggle";
import OpportunityForm from "../components/form/OpportunityForm";
import useConsoleHandlers from "../hooks/useConsoleHandlers";
import ErrorMessage from "../components/validators/ErrorMessage";

export default function Console() {
  const [theme, setTheme] = useState("dark");
  const [filters, setFilters] = useState({ query: "", status: "", sort: "" });
  const [leads, setLeads] = useState<LeadsState>({
    leads: [],
    selectedLead: null,
    convertLead: null,
  });
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);

  const searchedQuery = useDebounce(filters.query, 500);

  const {
    convertLead,
    submitOpportunity,
    closeOpportunityForm,
    updateLead,
    closeDetailPanel,
  } = useConsoleHandlers(setLeads, setOpportunities);

  const { data, loading, error, fetchData } = useFetch(async () => {
    return leadsData.map((lead) => ({
      ...lead,
      status: lead.status as Lead["status"],
    }));
  });

  /* const { data, loading, error, fetchData } = useFetch(async () => {
  throw new Error("Simulated fetch error");
}); Uncomment this code and comment the code above to test the error message*/

  const filteredLeads = processLeads(
    leads.leads,
    searchedQuery,
    filters.status,
    filters.sort
  );

  useEffect(() => {
    fetchData({ delay: 1200 });
  }, []);

  useEffect(() => {
    if (data) {
      setLeads({ leads: data, selectedLead: null, convertLead: null });
    }
  }, [data]);

  return (
    <div className={`${theme} flex flex-col h-screen w-full`}>
      <header className="bg-white0 dark:bg-gray-800 p-4 text-gray-900 dark:text-gray-100 text-lg font-bold flex items-center justify-between">
        Mini Console
        <ThemeToggle setTheme={setTheme} />
      </header>
      <main className="flex-1 overflow-y-auto p-4 bg-gray-100 dark:bg-gray-900">
        <div className="md:flex grid gap-4 items-center">
          <SearchFilter
            onSearch={(e) => setFilters((prev) => ({ ...prev, query: e }))}
            value={filters.query}
          />
          <StatusFilter
            statusType={filters.status}
            setStatus={(e) => setFilters((prev) => ({ ...prev, status: e }))}
          />
          <SortFilter
            sortType={filters.sort}
            setSort={(e) => setFilters((prev) => ({ ...prev, sort: e }))}
          />
        </div>

        <div
          className={`w-full ${
            opportunities.length > 0 ? "md:grid md:grid-cols-2" : ""
          } gap-8`}
        >
          <LeadsTable
            leads={filteredLeads}
            onSelectLead={(e) => {
              if (!leads.selectedLead) {
                setLeads((prev) => ({ ...prev, selectedLead: e }));
              }
            }}
            isDetailsOpen={leads.selectedLead ? true : false}
          >
            {leads.selectedLead && (
              <LeadDetailPanel
                lead={leads.selectedLead}
                onConvert={convertLead}
                onSave={updateLead}
                onClose={closeDetailPanel}
              />
            )}
            {leads.convertLead && (
              <OpportunityForm
                onSubmit={submitOpportunity}
                goBack={closeOpportunityForm}
                lead={leads.convertLead}
              />
            )}
          </LeadsTable>
          {error && (
            <ErrorMessage
              message={error}
              onRetry={() => {
                console.log("Retry clicked!");
                fetchData({ delay: 500 });
              }}
            />
          )}
          {loading && <Loading />}
          {opportunities.length > 0 && (
            <OpportunitiesCards opportunities={opportunities} />
          )}
        </div>
      </main>
    </div>
  );
}
