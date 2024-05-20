import { defaultTodoStatuses } from "./../types";
import { createTodo, getTodos, updateTodo } from "@/api/Todos";
import { Todo, TodoCreate, TodoUpdate } from "@/api/Todos/types";
import { StateCreator } from "zustand";
import { GlobalStore } from ".";
import { User } from "@/api/Auth/types";

type GroupedTodos = Record<string, Todo[]>;

export interface TodosSlice {
  groupedTodos: GroupedTodos;
  setGroupedTodos: (groupedTodos: GroupedTodos) => void;
  addToGroup: (group: string, todos: Todo[]) => void;
  createTodo: (todoData: TodoCreate) => Promise<void>;
  updateTodo: (todoData: TodoUpdate) => Promise<void>;
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
  createTodo: async (todoData: TodoCreate) => {
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

const getDefaultGroup = (user?: User) => {
  return {
    [defaultTodoStatuses.todo]: [],
    [defaultTodoStatuses.inProgress]: [],
    [defaultTodoStatuses.complete]: [],
  };
};
