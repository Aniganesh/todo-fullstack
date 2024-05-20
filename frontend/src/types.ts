export interface BaseEntity {
  createDateTime: string;
  lastChangedDateTime: string;
}

export const defaultTodoStatuses = {
  todo: "todo",
  inProgress: "inProgress",
  complete: "complete",
} as const;
