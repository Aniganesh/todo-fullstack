export interface BaseEntity {
  id: string;
  createDateTime: string;
  lastChangedDateTime: string;
}

export const defaultTodoStatuses = {
  todo: "todo",
  inProgress: "inProgress",
  complete: "complete",
} as const;

export type ValueOf<T> = T[keyof T];
export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;


export interface Image {
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
