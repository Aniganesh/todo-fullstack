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
  name: string;
}

export type UpdateUser = Omit<User, keyof BaseEntity>;

export type PasswordChangeDto = {
  currentPassword: string;
  newPassword: string;
};
