'use client'

import { ChevronsUpDown, LogOut, Palette } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar'
import { useRouter } from 'next/navigation'
import { useTheme } from '@/hooks/use-theme'
import { api } from '@/igniter.client'

export function NavUser() {
  const router = useRouter()
  const { isMobile } = useSidebar()
  const { toggleTheme } = useTheme()
  const session = api.auth.getSession.useQuery()
  const user = session.data?.user
  const handleLogout = async () => {
    await api.auth.signOut.mutate()
    router.push('/')
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <Avatar className='rounded-lg w-8 h-8'>
                <AvatarFallback className='rounded-lg'>
                  {user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className='flex-1 grid text-sm text-left leading-tight'>
                <span className='font-semibold truncate'>
                  {user?.name}
                </span>
                <span className='text-xs truncate'>
                  {user?.email}
                </span>
              </div>
              <ChevronsUpDown className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='rounded-lg w-[--radix-dropdown-menu-trigger-width] min-w-56'
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={4}
          >
            <DropdownMenuItem onClick={toggleTheme}>
              <Palette />
              Alterar tema
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
