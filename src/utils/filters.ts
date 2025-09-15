import type { Lead } from "../types/leads";

export const searchLeads = (leads: Lead[], term: string): Lead[] => {
  if (!term.trim()) return leads;

  const query = term.toLowerCase();

  return leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(query) ||
      lead.company.toLowerCase().includes(query)
  );
};

export const filterLeadsByStatus = (
  leads: Lead[],
  statusType: string
): Lead[] =>
  statusType ? leads.filter((lead) => lead.status === statusType) : leads;

export const sortLeadsByScore = (leads: Lead[], sortType: string): Lead[] => {
  if (!sortType) return leads;

  return [...leads].sort((a, b) =>
    sortType === "Ascending" ? a.score - b.score : b.score - a.score
  );
};

export const processLeads = (
  leads: Lead[],
  term: string,
  statusType: string,
  sortType: string
): Lead[] =>
  sortLeadsByScore(
    filterLeadsByStatus(searchLeads(leads, term), statusType),
    sortType
  );
