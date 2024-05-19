import Fetch from "@/FetchWrapper";
import { TodosFilter } from "./types";
import { Todo } from "@/types";

export const getTodos = async (filter?: Partial<TodosFilter>) => {
  return Fetch.get("/todos", filter);
};

export const createTodo = async (data: Omit<Todo, "id">) => {
  return Fetch.post({ url: "/todos", data });
};
