import { CreateTodo, UpdateTodo } from 'dtos';
import Fetch from "@/FetchWrapper";
import { Todo, TodosFilter } from "./types";

export const getTodos = async (
  filter?: Partial<TodosFilter>
): Promise<Todo[]> => {
  return Fetch.get("/todos", filter);
};

export const createTodo = async (data: CreateTodo): Promise<Todo> => {
  return Fetch.post({ url: "/todos", data });
};

export const updateTodo = async (data: UpdateTodo): Promise<Todo> => {
  return Fetch.patch({ url: "/todos", data });
};
