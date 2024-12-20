"use client";

import { Todos } from "@/app/@types/todos/todos";
import { RegisterUserProps, User } from "@/app/@types/user";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { ReactNode, createContext, useEffect, useState } from "react";
import { date } from "zod";

type AuthContextData = {
  user?: User;
  signIn: (email_user: string, password_user: string) => void;
  singOut: () => void;
  DeleteUser: (id: string) => void;
  RegisterNewUser: ({
    first_name,
    last_name,
    email,
    password,
  }: RegisterUserProps) => void;
  UpdateUser: (
    first_name?: string,
    last_name?: string,
    email?: string,
    password?: string
  ) => void;

  todos: Todos[];

  DeleteTodo: (id: string) => void;
  FinishTodo: (id: string) => void;
  CreateTodos: (title: string, description: string, created_at: string) => void;
  UpdadeTodo: (todoId: string, title?: string, description?: string) => void;
  GetTodos: (start: string, end: string, status?: string) => void;
};

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { push } = useRouter();
  const { toast } = useToast();

  const [user, setUser] = useState<User>();
  const [todos, setTodos] = useState<Todos[]>([]);

  useEffect(() => {
    const { "@nextauth.token": token } = parseCookies();
    if (token) {
      api
        .get(`/detail`)
        .then((response) => {
          const { id, first_name, last_name, email } = response.data;
          setUser({
            id,
            first_name,
            last_name,
            email,
            token,
          });

          const date = new Date().toLocaleDateString("en-us");
          GetTodos(date, date);
        })
        .catch(() => {
          singOut();
        });
    }
  }, []);

  async function signIn(email_user: string, password_user: string) {
    try {
      const response = await api.post("/session", {
        email: email_user,
        password: password_user,
      });

      const { id, first_name, last_name, email, token } = response.data as User;

      setCookie(undefined, "@nextauth.token", token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });

      setUser({
        id,
        first_name,
        last_name,
        email,
        token,
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      const date = new Date().toLocaleDateString("en-us");

      GetTodos(date, date);
      push("/app");
    } catch (error) {
      console.log(error);
    }
  }

  async function singOut() {
    try {
      destroyCookie(null, "@nextauth.token", {
        path: "/",
      });

      setUser(undefined);
      push("/");
    } catch (error) {
      console.log("erro ao deslogar");
    }
  }

  async function UpdateUser(
    first_name?: string,
    last_name?: string,
    email?: string,
    password?: string
  ) {
    try {
      const dataToUpdate = {
        ...(first_name && { first_name }),
        ...(last_name && { last_name }),
        ...(email && { email }),
        ...(password && { password }),
      };

      const response = await api.patch("/user", dataToUpdate);

      const {
        id,
        first_name: firstName,
        last_name: lastName,
        email: Email,
      } = response.data as User;

      const tokenUser = user!.token;

      setUser({
        id,
        first_name: firstName,
        last_name: lastName,
        email: Email,
        token: tokenUser,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function RegisterNewUser({
    first_name,
    last_name,
    email,
    password,
  }: RegisterUserProps) {
    try {
      await api.post("/user", {
        first_name,
        last_name,
        email,
        password,
      });

      signIn(email, password!);
    } catch (error) {}
  }

  async function DeleteUser(id: string) {
    try {
      await api.delete(`/user/${id}`);
      singOut();
    } catch (error) {
      console.log(error);
    }
  }

  //TODOS
  async function GetTodos(start: string, end: string, status?: string) {
    try {
      const response = await api.get(
        `/todos?start=${start}&end=${end}${
          status !== undefined ? `&status=${status}` : ""
        }`
      );
      setTodos(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function DeleteTodo(id: string) {
    try {
      await api.delete(`/todo/${id}`);
      const todosFilter = todos.filter((todo) => todo.id !== id);
      setTodos(todosFilter);

      toast({
        title: "Tarefa deletado com sucesso",
        description: `Sua Tarefa foi deletado com sucesso!`,
      });
    } catch (error) {
      toast({
        title: "Erro ao deletar o tarefa",
        description: `Houve um erro ao tentar deletar o tarefa. Por favor, tente novamente mais tarde.`,
      });
    }
  }

  async function FinishTodo(id: string) {
    try {
      await api.patch(`/todo/${id}`);

      const finishTodo = todos.filter((todo) => {
        if (todo.id === id) {
          return (todo.finish_at = new Date());
        }
        return todo;
      });
      setTodos(finishTodo);

      toast({
        title: "Tarefa finalizado com sucesso",
        description: `Sua tarefa foi marcado como finalizado com sucesso!`,
      });
    } catch (error) {
      toast({
        title: "Erro ao tentar finalizar a tarefa",
      });
    }
  }

  async function CreateTodos(
    title: string,
    description: string,
    created_at: string
  ) {
    try {
      const response = await api.post("todo", {
        title,
        description,
        created_at,
      });
      const todo = response.data;
      setTodos((Action) => [...Action, todo]);

      toast({
        title: "Tarefa criado com sucesso",
        description: `Sua tarefa '${title}' foi criado !`,
      });
    } catch (error) {
      toast({
        title: "Erro ao criar o tarefa",
      });
    }
  }

  async function UpdadeTodo(
    todoId: string,
    title?: string,
    description?: string
  ) {
    try {
      const dataToUpdate = {
        ...(title && { title }),
        ...(description && { description }),
      };
      const response = await api.patch(`/todo-update/${todoId}`, dataToUpdate);

      const updatedTodo = response.data;
      const todosFilter = todos.filter((item) => item.id !== todoId);

      setTodos([...todosFilter, updatedTodo]);

      toast({
        title: "Tarefa editado com sucesso",
        description: `Sua Tarefa foi marcado como editado com sucesso!`,
      });
    } catch (error) {
      toast({
        title: "Erro ao editar a tarefa",
      });
    }
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        singOut,
        DeleteUser,
        UpdateUser,
        RegisterNewUser,
        todos,
        DeleteTodo,
        FinishTodo,
        CreateTodos,
        UpdadeTodo,
        GetTodos,
      }}
    >
      <>{children}</>
    </AuthContext.Provider>
  );
};
