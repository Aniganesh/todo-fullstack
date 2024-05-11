import { create } from "zustand";
import { Todo } from "./types";

type GroupedTodos = Record<string, Todo[]>;

interface Store {
  groupedTodos: GroupedTodos;
  setGroupedTodos: (groupedTodos: GroupedTodos) => void;
  addToGroup: (group: string, todos: Todo[]) => void;
}

export const useStore = create<Store>((set, getStore) => ({
  groupedTodos: {
    todo: [
      {
        id: Math.random().toString(),
        name: "Item 1",
        description: "Pariatur in quis minim nostrud in.",
        status: "todo",
      },
      {
        id: Math.random().toString(),
        name: "Item 2",
        description: "Pariatur in quis minim nostrud in.",
        status: "todo",
      },
      {
        id: Math.random().toString(),
        name: "Item 3",
        description: "Pariatur in quis minim nostrud in.",
        status: "todo",
      },
      {
        id: Math.random().toString(),
        name: "Item 4",
        description:
          "Pariatur in quis minim nostrud in.Ad minim excepteur laborum tempor sint aute quis consectetur sit ea adipisicing ea mollit.",
        status: "todo",
      },
    ],
    inProgress: [
      {
        id: Math.random().toString(),
        name: "Item 5",
        description:
          "Pariatur in quis minim nostrud in.Ad minim excepteur laborum tempor sint aute .",
        status: "todo",
      },
      {
        id: Math.random().toString(),
        name: "Item 6",
        description: "Pariatur in quis minim.",
        status: "todo",
      },
      {
        id: Math.random().toString(),
        name: "Item 7",
        description:
          "Pariatur in quis minim nostrud in. Ad minim ctetur sit ea adipisicing ea mollit.",
        status: "todo",
      },
      {
        id: Math.random().toString(),
        name: "Item 8",
        description:
          "Pariatur in quis minim nostrud in.Ad minim excepteur laborum tempor sint aute quis consectetur sit ea adipisicing ea mollit. Mollit nisi irure ea officia eu ea cupidatat mollit minim laboris adipisicing elit ut eu.",
        status: "todo",
      },
      {
        id: Math.random().toString(),
        name: "Item 9",
        description:
          "Pariatur in quis minim nostrud in.Ad minim excepteur laborum tempor sint aute quis consectetur sit ea adipisicing ea mollit.",
        status: "todo",
      },
    ],
    completed: [
      {
        id: Math.random().toString(),
        name: "Item 10",
        description:
          "Pariatur in quis minim nostrud in.Ad minim excepteur laborum tempor sint aute quis consectetur sit ea adipisicing ea mollit.",
        status: "todo",
      },
      {
        id: Math.random().toString(),
        name: "Item 11",
        description:
          "Pariatur in quis minim nostrud in.Ad minim excepteur laborum tempor sint aute quis consectetur sit ea adipisicing ea mollit.",
        status: "todo",
      },
      {
        id: Math.random().toString(),
        name: "Item 12",
        description:
          "Pariatur in quis minim nostrud in.Ad minim excepteur laborum tempor sint aute quis consectetur sit ea adipisicing ea mollit.",
        status: "todo",
      },
      {
        id: Math.random().toString(),
        name: "Item 13",
        description:
          "Pariatur in quis minim nostrud in.Ad minim excepteur laborum tempor sint aute quis consectetur sit ea adipisicing ea mollit.",
        status: "todo",
      },
    ],
  },
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
}));
