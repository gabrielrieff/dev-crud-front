import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/context/authContext";
import { useContext, useState } from "react";
import { useSchemaRegister } from "./schemaRegister";
import { InputPassword } from "./input-password";
import { ReloadIcon } from "@radix-ui/react-icons";

export function FormRegisterUser() {
  const { form, schema } = useSchemaRegister();
  const { RegisterNewUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const onSubmit = form.handleSubmit((data) => {
    try {
      setLoading(true);
      RegisterNewUser(data);
    } finally {
      setLoading(false);
    }
  });
  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-8">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primeiro nome</FormLabel>
                <FormControl>
                  <Input placeholder="Carlos" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Segundo nome</FormLabel>
                <FormControl>
                  <Input placeholder="Pereira da Silva" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

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
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <InputPassword {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={!loading} type="submit" className="w-full">
            {loading ? (
              <>Registrar</>
            ) : (
              <ReloadIcon className={`w-4 h-5 ${loading && "animate-spin"}`} />
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
