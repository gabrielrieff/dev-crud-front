import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderNav,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from "@/components/dashboard/page";

export default function Page() {
  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Dashboard</DashboardPageHeaderTitle>
        <DashboardPageHeaderNav></DashboardPageHeaderNav>
      </DashboardPageHeader>
      <DashboardPageMain>Tarefas</DashboardPageMain>
    </DashboardPage>
  );
}
