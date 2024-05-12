import { create } from "zustand";
import { Todo, User } from "./types";

type GroupedTodos = Record<string, Todo[]>;

interface Store {
  user?: User;
  setUser: (user?: User) => void;
  token?: string;
  setToken: (token: string) => void;
  groupedTodos: GroupedTodos;
  setGroupedTodos: (groupedTodos: GroupedTodos) => void;
  addToGroup: (group: string, todos: Todo[]) => void;
}

export const useStore = create<Store>((set, getStore) => ({
  groupedTodos: {},
  setGroupedTodos: (groupedTodos) => {
    set({ groupedTodos });
  },
  addToGroup: (group, todos) => {
    const { groupedTodos } = getStore();
    set({
      groupedTodos: {
        ...groupedTodos,
        [group]: [...groupedTodos[group]].concat(todos),
      },
    });
  },
  setUser: (user) => {
    set({ user });
  },
  setToken: (token) => {
    set({ token });
  },
}));
