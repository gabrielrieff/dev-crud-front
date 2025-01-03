import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Form,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AuthContext } from "@/context/authContext";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function FormFilterTodo() {
  const { GetTodos } = useContext(AuthContext);

  const FormSchema = z.object({
    range: z.object({
      from: z.date({}),
      to: z.date(),
    }),
    status: z.string().optional(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const start = data.range.from.toLocaleDateString("en-us");
    const end = data.range.to.toLocaleDateString("en-us");
    const status = data.status;

    GetTodos(start, end, status);
  }

  function CleanFilter() {
    const date = new Date();
    const start = date.toLocaleDateString("en-us");
    const end = date.toLocaleDateString("en-us");
    GetTodos(start, end);
    form.reset();
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="rounded-md border flex justify-between px-2 py-3"
      >
        <div className="flex items-end gap-3">
          <FormField
            control={form.control}
            defaultValue={{
              from: new Date(),
              to: new Date(),
            }}
            name="range"
            render={({ field, fieldState }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Periodo</FormLabel>
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
                          `${new Date(field.value.from).toLocaleDateString(
                            "pt-BR"
                          )} - 
                        ${new Date(field.value.to).toLocaleDateString("pt-BR")}`
                        ) : (
                          <span>Selecione o periodo</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="range"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {fieldState.error && (
                  <p className="mt-1 text-sm text-red-500">
                    {fieldState.error.message}
                  </p>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="0">Waiting</SelectItem>
                    <SelectItem value="1">Done</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-end gap-3">
          <Button type="submit">Aplicar filtro</Button>
          <Button variant="outline" type="button" onClick={CleanFilter}>
            Limpar filtro
          </Button>
        </div>
      </form>
    </Form>
  );
}
