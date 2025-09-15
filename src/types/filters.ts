export type SearchFilterProps = {
  value: string;
  onSearch: (query: string) => void;
};

export type SortFilterProps = {
  sortType: string;
  setSort: (query: string) => void;
};

export type StatusFilterProps = {
  statusType: string;
  setStatus: (query: string) => void;
};
