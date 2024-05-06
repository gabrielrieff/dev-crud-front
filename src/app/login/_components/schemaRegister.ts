import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const useSchemaRegister = () => {
  const schema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string().email(),
    password: z
      .string()
      .min(7, "A senha deve ter pelo menos 7 caracteres")
      .refine((value) => /[A-Z]/.test(value), {
        message: "A senha deve conter pelo menos uma letra maiúscula",
      })
      .refine((value) => /\d/.test(value), {
        message: "A senha deve conter pelo menos um número",
      })
      .refine((value) => /[!@#$%^&*()_+]/.test(value), {
        message: "A senha deve conter pelo menos um caractere especial",
      }),
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
