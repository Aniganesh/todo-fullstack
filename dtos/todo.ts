export interface CreateTodo {
  title: string;
  description: string;
  status: string;
}

export type UpdateTodo = { id: string } & Partial<CreateTodo>;

// Update to allow filtering by multiple statuses.
export type TodoFilter = { status: string | string[] };
