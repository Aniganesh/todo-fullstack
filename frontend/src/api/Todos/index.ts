import { CreateTodo, UpdateTodo } from "dtos";
import Fetch from "@/FetchWrapper";
import { Todo, FilterAndSort } from "./types";
import { DeepPartial } from "react-hook-form";

export const getTodos = async (
  filter?: DeepPartial<FilterAndSort>["filter"],
  sort?: DeepPartial<FilterAndSort>["sort"]
): Promise<Todo[]> => {
  return Fetch.get("/todos", { filter, sort });
};

export const createTodo = async (data: CreateTodo): Promise<Todo> => {
  return Fetch.post({ url: "/todos", data });
};

export const updateTodo = async (data: UpdateTodo): Promise<Todo> => {
  return Fetch.patch({ url: "/todos", data });
};
