export interface CreateUser {
  email: string;
  name: string;
  password: string;
}

export type PasswordChange = {
  currentPassword: string;
  newPassword: string;
};

export type UpdateUser = {
  name: string;
};
