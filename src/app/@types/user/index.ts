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
