import { BaseEntity } from "@/types";

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  name: string;
}

export interface User extends BaseEntity {
  id: string;
  name: string;
}
