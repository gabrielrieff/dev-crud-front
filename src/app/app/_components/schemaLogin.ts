import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const useSchemaLogin = () => {
  const schema = z.object({
    email: z.string().min(13, {
      message: "Informe um email.",
    }),
    password: z.string().min(5, {
      message: "Informe uma senha de pelo menos 5 caracteres",
    }),
  });

  type formDataProps = z.infer<typeof schema>;

  const form = useForm<formDataProps>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return { form, schema };
};
