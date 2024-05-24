export interface CreateTodo {
  title: string;
  description: string;
  status: string;
}

export type UpdateTodo = { id: string } & Partial<CreateTodo>;

export type TodoFilter = { status: string };
