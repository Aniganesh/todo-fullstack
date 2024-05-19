import Fetch from "@/FetchWrapper";
import { LoginData, SignupData } from "./types";

export const login = async (data: LoginData) => {
  return Fetch.request({
    method: "POST",
    url: "/auth/login",
    data,
  });
};

export const signup = async (data: SignupData) => {
  return Fetch.post({ url: "/auth/singup", data });
};

export const me = async () => {
  return Fetch.get("/auth/me");
};
