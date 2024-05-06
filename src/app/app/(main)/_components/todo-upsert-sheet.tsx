"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useContext, useRef } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Todo } from "../type";
import { AuthContext } from "@/context/authContext";

interface TodoUpsertSheetProps {
  children: React.ReactNode;
  defaultValue?: Todo;
}

export function TodoUpsertSheet({
  children,
  defaultValue,
}: TodoUpsertSheetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { CreateTodos, UpdadeTodo } = useContext(AuthContext);

  const form = useForm();

  const onSubmit = form.handleSubmit(async (data) => {
    const { title, description } = data;

    if (defaultValue) {
      UpdadeTodo(defaultValue.id, title, description);
    } else {
      await CreateTodos(title, description);
    }
    form.reset({
      title: "",
      description: "",
    });
  });
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div ref={ref}>{children}</div>
      </SheetTrigger>
      <SheetContent className="max-w-lg">
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-8 h-screen">
            <SheetHeader>
              <SheetTitle>Criar TODO</SheetTitle>
              <SheetDescription>
                Adicione ou edite um TODO aqui. Clique em salvar quando
                terminar.
              </SheetDescription>
            </SheetHeader>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o título do TODO"
                      {...field}
                      defaultValue={defaultValue ? defaultValue.title : ""}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Este será o título do seu TODO.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite a Descriçãoo do TODO"
                      {...field}
                      defaultValue={
                        defaultValue ? defaultValue.description : ""
                      }
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Este será a Descrição do seu TODO.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter>
              <Button type="submit">Salvar TODO</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
