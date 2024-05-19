import { create } from "zustand";
import { Todo, User } from "./types";
import { login, me, signup } from "./api/Auth";
import { LoginData, SignupData } from "./api/Auth/types";

type GroupedTodos = Record<string, Todo[]>;

interface Store {
  user?: User;
  setUser: (user?: User) => void;
  token?: string;
  setToken: (token: string) => void;
  groupedTodos: GroupedTodos;
  setGroupedTodos: (groupedTodos: GroupedTodos) => void;
  addToGroup: (group: string, todos: Todo[]) => void;
  login: (loginData: LoginData) => Promise<void>;
  fetchMe: () => Promise<void>;
  signup: (signupData: SignupData) => Promise<void>;
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
  fetchMe: async () => {
    const { setUser } = getStore();
    const user = (await me()) as User;
    setUser(user);
  },
  login: async (loginData: LoginData) => {
    const { setToken, fetchMe } = getStore();
    const token = ((await login(loginData)) as { access_token: string })
      .access_token;
    setToken(token);
    await fetchMe();
  },
  signup: async (signupData: SignupData) => {
    const { setToken, fetchMe } = getStore();
    const token = ((await signup(signupData)) as { access_token: string })
      .access_token;
    setToken(token);
    await fetchMe();
  },
}));
