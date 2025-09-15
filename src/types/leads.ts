export type LeadStatus = "New" | "Contacted" | "Qualified" | "Lost";

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  source: string;
  score: number;
  status: LeadStatus;
}

export interface LeadsState {
  leads: Lead[];
  selectedLead: Lead | null;
  convertLead: Lead | null;
}
