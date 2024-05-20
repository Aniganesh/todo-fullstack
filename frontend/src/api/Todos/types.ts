import { BaseEntity } from "@/types";

export interface TodosFilter {
  status: string;
  sort: Partial<
    Record<"createDateTime" | "lastChangedDateTime", "ASC" | "DESC">
  >;
}

export interface Todo extends BaseEntity {
  id: string;
  title: string;
  description: string;
  status: string;
}

export type TodoCreate = Omit<Todo, "id" | keyof BaseEntity>;
export type TodoUpdate = Partial<TodoCreate> & Pick<Todo, "id">;
