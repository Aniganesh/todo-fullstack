export interface CreateUserDto {
  email: string;
  name: string;
  password: string;
}

export type PasswordChangeDto = {
  currentPassword: string;
  newPassword: string;
};

export type UpdateUserDto = {
  name: string;
};
