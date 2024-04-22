"use client";

import { Todos } from "@/app/@types/todos/todos";
import { User } from "@/app/@types/user";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { ReactNode, createContext, use, useEffect, useState } from "react";

type AuthContextData = {
  user?: User;
  signIn: (email_user: string, password_user: string) => void;
  singOut: () => void;
  todos: Todos[];

  DeleteTodo: (id: string) => void;
  FinishTodo: (id: string) => void;
  CreateTodos: (title: string, description: string) => void;
};

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { push } = useRouter();

  const [user, setUser] = useState<User>();
  const [todos, setTodos] = useState<Todos[]>([]);

  useEffect(() => {
    const { "@nextauth.token": token } = parseCookies();
    if (token) {
      api
        .get(`/detail`)
        .then((response) => {
          const { id, first_name, last_name, email, password } = response.data;

          setUser({
            id,
            first_name,
            last_name,
            email,
            password,
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

      const { id, first_name, last_name, email, password, token } =
        response.data as User;

      setCookie(undefined, "@nextauth.token", token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });

      setUser({
        id,
        first_name,
        last_name,
        email,
        password,
        token,
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

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
    } catch (error) {
      console.log(error);
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
      const todo = response.data.Todo;
      setTodos((Action) => [...Action, todo]);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        singOut,
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
