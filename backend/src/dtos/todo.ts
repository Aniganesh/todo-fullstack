import { Users } from 'src/models/users.entity';

export interface CreateTodo {
  title: string;
  description: string;
  status: string;
}

export interface CreateTodoForUser extends CreateTodo {
  user: Users;
}

export type UpdateTodo = { id: string } & Partial<CreateTodo>;
