import Fetch from "@/FetchWrapper";
import { LoginData, User } from "./types";
import { CreateUser, PasswordChange, UpdateUser } from "dtos";

export const login = async (
  data: LoginData
): Promise<{ access_token: string }> => {
  return Fetch.request({
    method: "POST",
    url: "/auth/login",
    data,
  });
};

export const signup = async (
  data: CreateUser
): Promise<{ access_token: string }> => {
  return Fetch.post({ url: "/auth/singup", data });
};

export const me = async (): Promise<User> => {
  return Fetch.get("/auth/me");
};

export const changePassword = async (
  data: PasswordChange
): Promise<boolean> => {
  return Fetch.post({ url: "/auth/password", data });
};

export const updateUser = (data: UpdateUser): Promise<User> => {
  return Fetch.post({ url: "/auth/user", data });
};
