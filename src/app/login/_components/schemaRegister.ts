import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const useSchemaRegister = () => {
  const schema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string(),
    password: z.string(),
  });

  type formDataProps = z.infer<typeof schema>;

  const form = useForm<formDataProps>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
    },
  });

  return { form, schema };
};
