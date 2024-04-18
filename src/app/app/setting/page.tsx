import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderTitle,
  DashboardPageHeaderNav,
  DashboardPageMain,
} from "@/components/dashboard/page";

export default function Setting() {
  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Settings</DashboardPageHeaderTitle>
        <DashboardPageHeaderNav></DashboardPageHeaderNav>
      </DashboardPageHeader>
      <DashboardPageMain>settings</DashboardPageMain>
    </DashboardPage>
  );
}
