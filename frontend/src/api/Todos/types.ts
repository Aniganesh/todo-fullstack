import { BaseEntity } from "@/types";

export interface TodosFilter {
  status: string;
  sort: Partial<
    Record<"createDateTime" | "lastChangedDateTime", "ASC" | "DESC">
  >;
}

export interface Todo extends BaseEntity {
  title: string;
  description: string;
  status: string;
}
