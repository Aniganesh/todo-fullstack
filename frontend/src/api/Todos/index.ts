import Fetch from "@/FetchWrapper";
import { Todo, TodoCreate, TodoUpdate, TodosFilter } from "./types";

export const getTodos = async (
  filter?: Partial<TodosFilter>
): Promise<Todo[]> => {
  return Fetch.get("/todos", filter);
};

export const createTodo = async (data: TodoCreate): Promise<Todo> => {
  return Fetch.post({ url: "/todos", data });
};

export const updateTodo = async (data: TodoUpdate): Promise<Todo> => {
  return Fetch.patch({ url: "/todos", data });
};
