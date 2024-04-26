"use client";

import { HeaderMain } from "./_components/header-main";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full h-full flex flex-col items-center gap-52">
        <HeaderMain />

        <div className="text-center">
          <h4 className="text-5xl font-bold">Seja bem-vindo ao</h4>
          <h1 className="text-9xl font-bold bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent">
            dev-crud
          </h1>
        </div>
      </div>
    </main>
  );
}
