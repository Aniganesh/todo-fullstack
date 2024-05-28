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
