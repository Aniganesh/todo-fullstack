import { defaultTodoStatuses } from "./../types";
import { createTodo, getTodos, updateTodo } from "@/api/Todos";
import { FilterAndSort, Todo } from "@/api/Todos/types";
import { CreateTodo, UpdateTodo } from "dtos";
import { StateCreator } from "zustand";
import { GlobalStore } from ".";
import { User } from "@/api/Auth/types";
import { DeepPartial } from "react-hook-form";

type GroupedTodos = Record<string, Todo[]>;

export interface TodosSlice {
  filterAndSort?: DeepPartial<FilterAndSort>;
  updateFilterAndSort: (filter: DeepPartial<FilterAndSort>) => void;
  groupedTodos: GroupedTodos;
  setGroupedTodos: (groupedTodos: GroupedTodos) => void;
  addToGroup: (group: string, todos: Todo[]) => void;
  createTodo: (todoData: CreateTodo) => Promise<void>;
  updateTodo: (todoData: UpdateTodo) => Promise<void>;
  getTodosBasedOnFilter: () => Promise<void>;
}

export const createTodosSlice: StateCreator<GlobalStore, [], [], TodosSlice> = (
  set,
  getSliceState,
  state
) => ({
  groupedTodos: {},
  setGroupedTodos: (groupedTodos) => {
    set({ groupedTodos });
  },
  addToGroup: (group, todos) => {
    const { groupedTodos } = getSliceState();
    set({
      groupedTodos: {
        ...groupedTodos,
        [group]: [...(groupedTodos[group] ?? [])].concat(todos),
      },
    });
  },
  createTodo: async (todoData: CreateTodo) => {
    const { addToGroup } = getSliceState();
    const todo = (await createTodo(todoData)) as Todo;
    addToGroup(todo.status, [todo]);
  },
  updateTodo: async (todoData) => {
    const { getTodosBasedOnFilter } = getSliceState();
    await updateTodo(todoData);
    getTodosBasedOnFilter();
  },
  getTodosBasedOnFilter: async () => {
    const { setGroupedTodos, filterAndSort: filter } = getSliceState();
    const { user } = state.getState();
    const todos = await getTodos(filter?.filter, filter?.sort);
    const groupedTodos: GroupedTodos = getDefaultGroup(user);
    todos.forEach((item) => {
      if (!groupedTodos[item.status]?.length) {
        groupedTodos[item.status] = [];
      }
      groupedTodos[item.status].push(item);
    });
    setGroupedTodos(groupedTodos);
  },
  updateFilterAndSort: (filterAndSort) => {
    const { filterAndSort: current } = getSliceState();
    const newFilter = { ...current };
    newFilter.filter = filterAndSort.filter
      ? { ...current?.filter, ...filterAndSort.filter }
      : undefined;
    newFilter.sort = filterAndSort.sort
      ? { ...(current?.sort ?? {}), ...filterAndSort.sort }
      : undefined;
    set({ filterAndSort: newFilter });
  },
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getDefaultGroup = (_user?: User) => {
  return {
    [defaultTodoStatuses.todo]: [],
    [defaultTodoStatuses.inProgress]: [],
    [defaultTodoStatuses.complete]: [],
  };
};
