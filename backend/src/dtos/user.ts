import { Users } from 'src/models/users.entity';
import { BaseEntity } from 'src/models/base.entity';

export interface CreateUserDto {
  email: string;
  name: string;
  password: string;
}

export type PasswordChangeDto = {
  currentPassword: string;
  newPassword: string;
};

export type UpdateUserDto = Omit<Users, keyof BaseEntity>;
