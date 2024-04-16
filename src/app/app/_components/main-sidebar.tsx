'use client'

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
} from '@/components/dashboard/side-bar';
import { usePathname } from 'next/navigation';
import { CubeIcon, MixerVerticalIcon } from '@radix-ui/react-icons';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Logo } from '@/components/Logo';

export default function MainSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
        <SidebarTitleHeader>dev-crud</SidebarTitleHeader>
      </SidebarHeader>

      <SidebarNav className="flex flex-col flex-grow">
        <SidebarMain>
          <SidebarLink
            href="/app/dashboard"
            active={isActive('/app/dashboard')}
          >
            <CubeIcon className="w-4 h-4 mr-3"/>
            dashboard
          </SidebarLink>
        </SidebarMain>
      </SidebarNav>

      <SidebarLinkDivisor>Links extras</SidebarLinkDivisor>

      <SidebarNav>
        <SidebarMain>
          <SidebarLink href="">
            <MixerVerticalIcon className="w-4 h-4 mr-3"/>
            Configurações
          </SidebarLink>
        </SidebarMain>
      </SidebarNav>

      <SidebarFooter>
        <Avatar>
          <AvatarFallback>GR</AvatarFallback>
        </Avatar>
        <SidebarFooterMain>
          <span className='text-xs uppercase'>Gabriel Rieff</span>
          <span className='text-xs font-semibold'>gabrielrieff1@gmail.com</span>
        </SidebarFooterMain>
      </SidebarFooter>
    </Sidebar>
  )
}
