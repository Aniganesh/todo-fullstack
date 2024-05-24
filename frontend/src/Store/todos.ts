import { defaultTodoStatuses } from "./../types";
import { createTodo, getTodos, updateTodo } from "@/api/Todos";
import { Todo } from "@/api/Todos/types";
import { CreateTodo, UpdateTodo } from "dtos";
import { StateCreator } from "zustand";
import { GlobalStore } from ".";
import { User } from "@/api/Auth/types";

type GroupedTodos = Record<string, Todo[]>;

export interface TodosSlice {
  groupedTodos: GroupedTodos;
  setGroupedTodos: (groupedTodos: GroupedTodos) => void;
  addToGroup: (group: string, todos: Todo[]) => void;
  createTodo: (todoData: CreateTodo) => Promise<void>;
  updateTodo: (todoData: UpdateTodo) => Promise<void>;
  getAllTodos: () => Promise<void>;
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
    const { groupedTodos, setGroupedTodos, addToGroup } = getSliceState();
    const todo = (await updateTodo(todoData)) as Todo;
    Object.entries(groupedTodos).forEach(([group, list]) => {
      const index = list.findIndex((t) => todo.id === t.id);
      if (index > -1) {
        list.splice(index, 1);
      }
      groupedTodos[group] = list;
    });

    setGroupedTodos({ ...groupedTodos });
    addToGroup(todo.status, [todo]);
  },
  getAllTodos: async () => {
    const { setGroupedTodos } = getSliceState();
    const { user } = state.getState();
    const todos = await getTodos();
    const groupedTodos: GroupedTodos = getDefaultGroup(user);
    todos.forEach((item) => {
      if (!groupedTodos[item.status]?.length) {
        groupedTodos[item.status] = [];
      }
      groupedTodos[item.status].push(item);
    });
    setGroupedTodos(groupedTodos);
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
