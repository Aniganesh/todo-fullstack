import Fetch from "@/FetchWrapper";
import { LoginData, SignupData, User } from "./types";

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
  data: SignupData
): Promise<{ access_token: string }> => {
  return Fetch.post({ url: "/auth/singup", data });
};

export const me = async (): Promise<User> => {
  return Fetch.get("/auth/me");
};
