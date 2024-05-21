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

export type TodoCreate = Omit<Todo, keyof BaseEntity>;
export type TodoUpdate = Partial<TodoCreate> & Pick<Todo, "id">;
