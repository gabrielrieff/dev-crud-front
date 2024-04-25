"use client";

import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/context/authContext";
import { useContext } from "react";
import { useSchemaProfile } from "../schema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UpdateUserProps } from "@/app/@types/user";

export function ProfileForm() {
  const { user, UpdateUser, DeleteUser } = useContext(AuthContext);
  const { toast } = useToast();

  const { schema } = useSchemaProfile();
  type formDataProps = z.infer<typeof schema>;

  const form = useForm<formDataProps>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: user?.email ?? "",
      first_name: user?.first_name ?? "",
      last_name: user?.last_name ?? "",
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data: formDataProps) => {
    const { first_name, last_name, email, password, confirm_password } = data;

    if (password !== confirm_password) {
      toast({
        title: "Erro ao alterar senha",
        description: `As senhas não coincidem. Tente novamente.`,
        variant: "destructive",
      });

      return;
    }

    const dataUpdate: UpdateUserProps = {
      ...(user?.first_name !== first_name && { first_name }),
      ...(user?.last_name !== last_name && { last_name }),
      ...(user?.email !== email && { email }),
      ...(password && { password }),
    };

    UpdateUser(
      dataUpdate.first_name,
      dataUpdate.last_name,
      dataUpdate.email,
      dataUpdate.password
    );
  });
  return (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <form autoComplete="off" onSubmit={onSubmit} className="space-y-8">
          <Card className="flex">
            <div className="w-full">
              <CardHeader>
                <CardTitle>Primeiro nome</CardTitle>
                <CardDescription>
                  Este será seu novo o primeiro nome
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Digite o primeiro nome"
                          {...field}
                          defaultValue={field.value}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </div>
            <div className="w-full">
              <CardHeader>
                <CardTitle>Segundo nome</CardTitle>
                <CardDescription>
                  Este será seu novo o segundo nome.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Digite o Segundo nome"
                          {...field}
                          defaultValue={field.value}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>E-mail</CardTitle>
              <CardDescription>Este será o seu novo e-mail.</CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Digite o E-mail"
                        autoComplete="off"
                        type="email"
                        {...field}
                        defaultValue={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card className="flex">
            <div className="w-full flex flex-col justify-between">
              <CardHeader>
                <CardTitle>Nova senha</CardTitle>
                <CardDescription>Este será sua nova senha.</CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="*****"
                          autoComplete="off"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </div>
            <div className="w-full flex flex-col justify-between">
              <CardHeader>
                <CardTitle>Confirmação de senha</CardTitle>
                <CardDescription>
                  Confirme se sua nova senha é igual a primeira senha digitada.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="confirm_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="*****" type="password" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </div>
          </Card>

          <Button disabled={form.formState.isSubmitting} type="submit">
            {form.formState.isSubmitting && "Salvando..."}
            {!form.formState.isSubmitting && "Salvar"}
          </Button>
        </form>
      </Form>

      <Card className="border-red-300 bg-red-100">
        <CardHeader>
          <CardTitle className="text-black">Excluir usuário</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={() => DeleteUser(user!.id)} variant={"destructive"}>
            Excluir usuário
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
