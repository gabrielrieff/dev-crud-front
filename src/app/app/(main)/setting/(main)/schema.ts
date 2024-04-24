import { z } from "zod";

export const useSchemaProfile = () => {
  const schema = z.object({
    email: z.string().optional(),
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    password: z.string().optional(),
    confirm_password: z.string().optional(),
  });
  return { schema };
};
