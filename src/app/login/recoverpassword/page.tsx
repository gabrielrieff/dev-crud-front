"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/services/api";
import { ReloadIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const { push } = useRouter();

  async function handleRecoverPassword(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    try {
      await api.post("/recover-password", {
        email: email,
      });
      push("/login");
    } catch (error: any) {
      toast({
        title: "Problema ao tentar gerar uma nova senha",
        description: error.response.data.message,
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    <main className="flex flex-col min-h-screen items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-950 space-y-8">
      <div className="mx-auto w-full max-w-md space-y-4 rounded-md bg-white p-6 shadow-lg dark:bg-gray-900">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Esqueceu sua senha?</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Insira seu endereço de e-mail e nós enviaremos uma nova senha para
            você.
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleRecoverPassword}>
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              placeholder="Digite seu e-mail"
              required
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button disabled={loading} type="submit" className="w-full">
            {!loading ? (
              <>Nova senha</>
            ) : (
              <ReloadIcon className="w-4 h-5 animate-spin" />
            )}
          </Button>
        </form>
      </div>
      <div className="text-center">
        <Link
          href={"/login"}
          className="text-sky-600 hover:text-sky-400 hover:underline"
        >
          Voltar para sessão de login
        </Link>
      </div>
    </main>
  );
}
