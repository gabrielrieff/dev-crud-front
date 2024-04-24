"use client";

import { Todos } from "@/app/@types/todos/todos";
import { RegisterUserProps, User } from "@/app/@types/user";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { ReactNode, createContext, useEffect, useState } from "react";

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
  CreateTodos: (title: string, description: string) => void;
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
          GetTodos();
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
      GetTodos();
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
  async function GetTodos() {
    try {
      const response = await api.get("/todo");
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
        title: "TODO deletado com sucesso",
        description: `Seu TODO foi deletado com sucesso!`,
      });
    } catch (error) {
      toast({
        title: "Erro ao deletar o TODO",
        description: `Houve um erro ao tentar deletar o TODO. Por favor, tente novamente mais tarde.`,
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
        title: "TODO finalizado com sucesso",
        description: `Seu TODO foi marcado como finalizado com sucesso!`,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function CreateTodos(title: string, description: string) {
    try {
      const response = await api.post("todo", {
        title,
        description,
      });
      const todo = response.data;
      setTodos((Action) => [...Action, todo]);

      toast({
        title: "TODO criado com sucesso",
        description: `Seu TODO '${title}' foi criado !`,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Erro ao criar o TODO",
      });
    }
  }

  async function UpdadeTodo() {}
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
      }}
    >
      <>{children}</>
    </AuthContext.Provider>
  );
};
