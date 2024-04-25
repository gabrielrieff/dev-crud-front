export type Todos = {
  id: string;
  title: string;
  description?: string;
  created_at: Date;
  update_at: Date;
  finish_at?: Date;

  userId?: string;
};
