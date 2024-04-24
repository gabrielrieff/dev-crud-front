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
  SidebarLinkSimple,
} from "@/components/dashboard/side-bar";
import { usePathname } from "next/navigation";
import { CubeIcon, MixerVerticalIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Logo } from "@/components/Logo";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function MainSidebar() {
  const pathname = usePathname();
  const { user, singOut } = useContext(AuthContext);

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
        <SidebarMain>
          <SidebarLink href="/app/setting" active={isActive("/app/setting")}>
            <MixerVerticalIcon className="w-4 h-4 mr-3" />
            <span className="xl:hidden">Configurações</span>
          </SidebarLink>
        </SidebarMain>
      </SidebarNav>

      <SidebarLinkDivisor>Links extras</SidebarLinkDivisor>

      <SidebarNav>
        <SidebarMain>
          <SidebarLinkSimple href="/">
            <span className="xl:hidden">Landing page</span>
          </SidebarLinkSimple>
        </SidebarMain>
      </SidebarNav>

      <SidebarFooter className="xl:flex-col">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} className="gap-2">
              <Avatar>
                <AvatarFallback>GR</AvatarFallback>
              </Avatar>
              <SidebarFooterMain className="items-start">
                <span className="text-xs uppercase xl:text-center">
                  {user?.first_name} {user?.last_name}
                </span>
                <span className="text-xs font-semibold xl:hidden">
                  {user?.email}
                </span>
              </SidebarFooterMain>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem onClick={singOut}>Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
