"use client";

import {
  SidebarHeader,
  SidebarTitleHeader,
  SidebarNav,
  SidebarMain,
  SidebarLink,
  SidebarLinkDivisor,
  SidebarFooter,
  SidebarFooterMain,
  Sidebar,
} from "@/components/dashboard/side-bar";
import { usePathname } from "next/navigation";
import { CubeIcon, MixerVerticalIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Logo } from "@/components/Logo";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";

export default function MainSidebar() {
  const pathname = usePathname();
  const { user } = useContext(AuthContext);

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
        <SidebarTitleHeader className="xl:hidden">dev-crud</SidebarTitleHeader>
      </SidebarHeader>

      <SidebarNav className="flex flex-col flex-grow">
        <SidebarMain>
          <SidebarLink href="/app" active={isActive("/app")}>
            <CubeIcon className="w-4 h-4 mr-3" />
            <span className="xl:hidden">dashboard</span>
          </SidebarLink>
        </SidebarMain>
      </SidebarNav>

      <SidebarLinkDivisor>Links extras</SidebarLinkDivisor>

      <SidebarNav>
        <SidebarMain>
          <SidebarLink href="/app/setting" active={isActive("/app/setting")}>
            <MixerVerticalIcon className="w-4 h-4 mr-3" />
            <span className="xl:hidden">Configurações</span>
          </SidebarLink>
        </SidebarMain>
      </SidebarNav>

      <SidebarFooter className="xl:flex-col">
        <Avatar>
          <AvatarFallback>GR</AvatarFallback>
        </Avatar>
        <SidebarFooterMain>
          <span className="text-xs uppercase xl:text-center">
            {user?.first_name} {user?.last_name}
          </span>
          <span className="text-xs font-semibold xl:hidden">{user?.email}</span>
        </SidebarFooterMain>
      </SidebarFooter>
    </Sidebar>
  );
}
