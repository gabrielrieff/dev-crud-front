import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from "@/components/dashboard/page";
import { PropsWithChildren } from "react";
import { SettingsSidebar } from "./_components/settings-sidebar";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <DashboardPage>
      <DashboardPageHeader className="p-[22px] py-7">
        <DashboardPageHeaderTitle>Settings</DashboardPageHeaderTitle>
      </DashboardPageHeader>
      <DashboardPageMain className="lg:px-1">
        <div className="container max-w-screen-lg lg:p-0">
          <div className="grid grid-cols-[16rem_1fr] xl:grid-cols-[7rem_1fr] gap-12 sm:gap-6">
            <SettingsSidebar />
            <div>{children}</div>
          </div>
        </div>
      </DashboardPageMain>
    </DashboardPage>
  );
}
