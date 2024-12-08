export enum Filter {
  SIZE_25 = "size_25",
  SIZE_50 = "size_50",
}

export enum Sort {
  NAME_ASC = "name_asc",
  NAME_DESC = "name_desc",
  ADDRESS_ASC = "address_asc",
  ADDRESS_DESC = "address_desc",
  SIZE_ASC = "size_asc",
  SIZE_DESC = "size_desc",
}

export type FilterOption = {
  value: Filter;
  label: string;
};

export type SortOption = {
  value: Sort;
  label: string;
};

export const filterOptions: FilterOption[] = [
  { value: Filter.SIZE_25, label: "Size >= 25" },
  { value: Filter.SIZE_50, label: "Size >= 50" },
];

export const sortOptions: SortOption[] = [
  { value: Sort.NAME_ASC, label: "Name: Ascending" },
  { value: Sort.NAME_DESC, label: "Name: Descending" },
  { value: Sort.ADDRESS_ASC, label: "Address: Ascending" },
  { value: Sort.ADDRESS_DESC, label: "Address: Descending" },
  { value: Sort.SIZE_ASC, label: "Size: Ascending" },
  { value: Sort.SIZE_DESC, label: "Size: Descending" },
];
