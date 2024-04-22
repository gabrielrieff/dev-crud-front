"use client";

import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderNav,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from "@/components/dashboard/page";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { TodoUpsertSheet } from "./_components/todo-upsert-sheet";
import { TodoDataTable } from "./_components/Todo-data-table";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";

export default function Page() {
  const { todos } = useContext(AuthContext);

  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Dashboard</DashboardPageHeaderTitle>
        <DashboardPageHeaderNav>
          <TodoUpsertSheet>
            <Button variant={"outline"} size={"sm"}>
              <PlusIcon className="w-4 h-4 mr-3" />
              Add Todo
            </Button>
          </TodoUpsertSheet>
        </DashboardPageHeaderNav>
      </DashboardPageHeader>
      <DashboardPageMain>
        <TodoDataTable data={todos} />
      </DashboardPageMain>
    </DashboardPage>
  );
}
