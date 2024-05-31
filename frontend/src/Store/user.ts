import Fetch from "@/FetchWrapper";
import { me, login, signup, updateUser } from "@/api/Auth";
import { LoginData, User } from "@/api/Auth/types";
import { StateCreator } from "zustand";
import { GlobalStore } from ".";
import { CreateUser, UpdateUser } from "dtos";

export interface UserSlice {
  user?: User;
  setUser: (user?: User) => void;
  token?: string;
  setToken: (token?: string) => void;
  resetAuthData: () => void;
  login: (loginData: LoginData) => Promise<void>;
  fetchMe: () => Promise<User | undefined>;
  signup: (signupData: CreateUser) => Promise<void>;
  updateUser: (userData: Partial<UpdateUser>) => Promise<void>;
}

export const createUserSlice: StateCreator<GlobalStore, [], [], UserSlice> = (
  set,
  getStore
) => ({
  setUser: (user) => {
    set({ user });
  },
  setToken: (token) => {
    Fetch.setCommonHeaders({
      Authorization: token ? `Bearer ${token}` : undefined,
    });
    set({ token });
  },
  fetchMe: async () => {
    const { setUser } = getStore();
    try {
      const user = await me();

      if (user) {
        setUser(user);
      }
      return user;
    } catch (err) {
      return;
    }
  },
  login: async (loginData) => {
    const { setToken, fetchMe } = getStore();
    const token = (await login(loginData)).access_token;
    setToken(token);
    await fetchMe();
  },
  signup: async (signupData) => {
    const { setToken, fetchMe } = getStore();
    const token = (await signup(signupData)).access_token;
    setToken(token);
    await fetchMe();
  },
  updateUser: async (data) => {
    const { setUser } = getStore();
    const user = await updateUser(data);
    setUser(user);
  },
  resetAuthData: () => {
    const { setUser, setToken, setGroupedTodos } = getStore();
    setUser();
    setToken();
    setGroupedTodos({});
  },
});
