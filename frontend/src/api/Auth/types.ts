import { Image, BaseEntity } from "@/types";

export interface LoginData {
  email: string;
  password: string;
}

export interface User extends BaseEntity {
  name: string;
  profileImage?: Image;
}
