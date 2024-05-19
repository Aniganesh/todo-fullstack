export interface TodosFilter {
  status: string;
  sort: Partial<
    Record<"createDateTime" | "lastChangedDateTime", "ASC" | "DESC">
  >;
}
