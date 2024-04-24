export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  token: string;
  created_at?: Date;
  update_at?: Date;
};

export type RegisterUserProps = Pick<
  User,
  "first_name" | "last_name" | "email" | "password"
>;

export type UpdateUserProps = {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
};
