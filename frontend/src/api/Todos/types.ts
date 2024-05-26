import { BaseEntity } from "@/types";
import { TodoFilter } from "dtos";

export interface FilterAndSort extends TodoFilter {
  sort: Partial<
    Record<"createDateTime" | "lastChangedDateTime", "ASC" | "DESC">
  >;
}

export interface Todo extends BaseEntity {
  title: string;
  description: string;
  status: string;
}
