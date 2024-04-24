"use client";

import {
  SidebarNav,
  SidebarMain,
  SidebarLink,
  Sidebar,
} from "@/components/dashboard/side-bar";
import { usePathname } from "next/navigation";

export function SettingsSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };
  return (
    <aside>
      <Sidebar className="border-0">
        <SidebarNav className="flex flex-col flex-grow">
          <SidebarMain>
            <SidebarLink href="/app/setting" active={isActive("/app/setting")}>
              Perfil
            </SidebarLink>
          </SidebarMain>
          <SidebarMain>
            <SidebarLink
              href="/app/setting/theme"
              active={isActive("/app/setting/theme")}
            >
              Tema
            </SidebarLink>
          </SidebarMain>
        </SidebarNav>
      </Sidebar>
    </aside>
  );
}
