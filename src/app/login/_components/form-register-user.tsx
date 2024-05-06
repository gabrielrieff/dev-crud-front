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
  const [validatePassword, setValidatePassword] = useState("");

  const onSubmit = form.handleSubmit((data) => {
    setLoading(true);
    try {
      RegisterNewUser(data);
    } finally {
      setLoading(false);
    }
  });

  function forcingPassword(password: string) {
    if (password.length < 7) {
      return setValidatePassword("bg-red-500 w-1/4");
    }

    let strength = 0;
    if (/[A-Z]/.test(password)) {
      strength++;
    }

    if (/\d/.test(password)) {
      strength++;
    }

    if (/[!@#$%^&*()_+]/.test(password)) {
      strength++;
    }

    switch (strength) {
      case 1:
        setValidatePassword("bg-orange-500 w-2/4");
        break;
      case 2:
        setValidatePassword("bg-yellow-500 w-3/4");
        break;
      case 3:
        setValidatePassword("bg-green-500 w-full");
        break;
      default:
        setValidatePassword("bg-red-500 w-1/4");
    }
  }

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
                  <InputPassword
                    {...field}
                    onChange={(e: any) => {
                      field.onChange(e.target.value);
                      forcingPassword(e.target.value);
                    }}
                  />
                </FormControl>

                <div className="w-full h-2 rounded-xl">
                  <div className={`h-full ${validatePassword}`}></div>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={!loading} type="submit" className="w-full">
            {loading ? (
              <>Registrar</>
            ) : (
              <ReloadIcon className="w-4 h-5 animate-spin" />
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
