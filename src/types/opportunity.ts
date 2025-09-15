import type { Lead } from "./leads";

export type OpportunityStage =
  | "Prospecting"
  | "Qualification"
  | "Proposal"
  | "Negotiation"
  | "Closed Won"
  | "Closed Lost";

export interface Opportunity {
  id: string;
  name: string;
  stage: OpportunityStage;
  amount?: number;
  accountName: string;
}

export type OpportunitiesCardsProps = {
  opportunities: Opportunity[];
};

export type OpportunityFormProps = {
  onSubmit: (opportunity: Opportunity) => void;
  goBack?: () => void;
  lead?: Lead;
};
