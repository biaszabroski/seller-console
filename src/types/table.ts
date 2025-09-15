import type { Lead } from "./leads";

export type LeadsTableProps = {
  leads: Lead[];
  pageSize?: number;
  isDetailsOpen: boolean;
  onSelectLead: (lead: Lead | null) => void;
  children?: React.ReactNode;
};

export type TablePaginationProps = {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
};
