import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ReloadIcon } from "@radix-ui/react-icons";

import { useContext, useState } from "react";
import { AuthContext } from "@/context/authContext";
import { useSchemaLogin } from "../../app/_components/schemaLogin";
import { z } from "zod";
import { InputPassword } from "./input-password";
import Link from "next/link";

export function FormLoginUser() {
  const { signIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const { form, schema } = useSchemaLogin();
  type formDataProps = z.infer<typeof schema>;

  async function onSubmit(data: formDataProps) {
    const { password, email } = data;
    setLoading(true);
    try {
      await signIn(email, password);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between">
                  <FormLabel>Senha</FormLabel>
                  <FormLabel>
                    <Link
                      href={"/login/recoverpassword"}
                      className="text-sky-500"
                    >
                      Esqueci minha senha
                    </Link>
                  </FormLabel>
                </div>
                <FormControl>
                  <InputPassword {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={!loading} type="submit" className="w-full">
            {loading ? (
              <>Login</>
            ) : (
              <ReloadIcon className="w-4 h-5 animate-spin" />
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
