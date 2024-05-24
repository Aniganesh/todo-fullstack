import { Users } from 'src/models/users.entity';
import { CreateTodo } from 'dtos';

export interface CreateTodoForUser extends CreateTodo {
  user: Users;
}
