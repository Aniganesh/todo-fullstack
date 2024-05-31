import { BaseEntity } from "@/types";

export interface LoginData {
  email: string;
  password: string;
}

interface Image {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: string;
  height: string;
  format: string;
  resource_type: "image";
  created_at: string;
  tags: [];
  bytes: number;
  type: "upload";
  etag: string;
  placeholder: false;
  url: string;
  secure_url: string;
  folder: "";
  original_filename: string;
  api_key: string;
}

export interface User extends BaseEntity {
  name: string;
  profileImage?: Image;
}
