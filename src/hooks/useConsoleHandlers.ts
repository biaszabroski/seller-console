import { useCallback } from "react";
import type { Lead } from "../types/leads";
import type { Opportunity } from "../types/opportunity";
import type { LeadsState } from "../types/leads";

export default function useConsoleHandlers(
  setLeads: React.Dispatch<React.SetStateAction<LeadsState>>,
  setOpportunities: React.Dispatch<React.SetStateAction<Opportunity[]>>
) {
  const convertLead = useCallback(
    (lead: Lead) => {
      setLeads((prev) => ({ ...prev, convertLead: lead }));
    },
    [setLeads]
  );

  const submitOpportunity = useCallback(
    (opportunity: Opportunity) => {
      setOpportunities((prev) => [...prev, opportunity]);
      setLeads((prev) => ({ ...prev, convertLead: null, selectedLead: null }));
    },
    [setLeads, setOpportunities]
  );

  const closeOpportunityForm = useCallback(() => {
    setLeads((prev) => ({ ...prev, convertLead: null }));
  }, [setLeads]);

  const updateLead = useCallback(
    (updatedLead: Lead) => {
      setLeads((prev) => ({
        ...prev,
        leads: prev.leads.map((l) =>
          l.id === updatedLead.id ? updatedLead : l
        ),
        selectedLead: updatedLead,
      }));
    },
    [setLeads]
  );

  const closeDetailPanel = useCallback(() => {
    setLeads((prev) => ({ ...prev, selectedLead: null }));
  }, [setLeads]);

  return {
    convertLead,
    submitOpportunity,
    closeOpportunityForm,
    updateLead,
    closeDetailPanel,
  };
}
