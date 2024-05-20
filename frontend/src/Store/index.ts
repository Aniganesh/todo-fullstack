import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserSlice, createUserSlice } from "./user";
import { TodosSlice, createTodosSlice } from "./todos";

export type GlobalStore = TodosSlice & UserSlice;

export const useStore = create<GlobalStore, [["zustand/persist", GlobalStore]]>(
  persist(
    (...args) => ({
      ...createUserSlice(...args),
      ...createTodosSlice(...args),
    }),
    {
      name: "todo-app",
    }
  )
);
