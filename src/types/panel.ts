import type { Lead } from "./leads";

export type LeadDetailPanelProps = {
  lead: Lead | null;
  onSave: (lead: Lead) => void;
  onConvert: (lead: Lead) => void;
  onClose: () => void;
};
