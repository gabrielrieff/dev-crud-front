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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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
    const { title, description, created_at } = data;

    const date = new Date(created_at).toLocaleDateString("en-us");

    if (defaultValue) {
      UpdadeTodo(defaultValue.id, title, description);
    } else {
      await CreateTodos(title, description, date);
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
              <SheetTitle>Nova/Editar Tarefa</SheetTitle>
              <SheetDescription>
                Crie ou edite uma tarefa aqui. Clique em salvar quando terminar.
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
                      placeholder="Título"
                      {...field}
                      defaultValue={defaultValue ? defaultValue.title : ""}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormDescription>Título da tarefa.</FormDescription>
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
                      placeholder="Descrição"
                      {...field}
                      defaultValue={
                        defaultValue ? defaultValue.description : ""
                      }
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormDescription>Descrição da sua tarefa</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="created_at"
              defaultValue={defaultValue ? defaultValue.created_at : ""}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Data da tarefa</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              new Date(field.value).toLocaleDateString("pt-BR")
                            ) : (
                              <span>Selecione uma data</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter>
              <Button type="submit">Salvar tarefa</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
