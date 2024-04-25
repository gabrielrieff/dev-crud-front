"use client";

import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs";
import { FormRegisterUser } from "./_components/form-register-user";
import { FormLoginUser } from "./_components/form-login-user";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 py-12 dark:bg-gray-950">
      <div className="mx-auto w-full max-w-md space-y-8">
        <Tabs
          className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950"
          defaultValue="login"
        >
          <TabsList className="grid grid-cols-2 rounded-t-lg bg-gray-100 p-1 dark:bg-gray-900">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent className="p-6" value="login">
            <FormLoginUser />
          </TabsContent>
          <TabsContent className="p-6" value="register">
            <FormRegisterUser />
          </TabsContent>
        </Tabs>
        <div className="text-center">
          <Link
            href={"/"}
            className="text-sky-600 hover:text-sky-400 hover:underline"
          >
            Ir para pagina principal
          </Link>
        </div>
      </div>
    </div>
  );
}
