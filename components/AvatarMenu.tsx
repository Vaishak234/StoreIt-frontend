import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { Button } from './ui/button';
import Image from 'next/image';
import useLogout from '@/lib/hooks/useLogout';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { selectUser } from '@/lib/features/User/userSlice';
import { useSelector } from 'react-redux';


const AvatarMenu = () => {


    const logout = useLogout()
    const user = useSelector(selectUser)

  return (
    <div>
          <DropdownMenu>

              <DropdownMenuTrigger className='shad-no-focus cursor-pointer select-none'>
                  <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent className='mr-4 mt-4 w-[250px]'>
                  <DropdownMenuLabel className='max-w-[200px] w-full truncate'>
                      <div className='flex gap-3'>
                          <Image src="/assets/images/avatar-placeholder.png" alt="avatar" width={50} height={50} className='rounded-full header-user-avatar' />
                          <div className='line-clamp-1 '>
                              <p className='subtitle-2 capitalize'>{user?.fullName}</p>
                              <p className="caption">{user?.email}</p>
                          </div>
                      </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                         SignOut
                  </DropdownMenuItem>
              </DropdownMenuContent>
          </DropdownMenu>

    </div>
  )
}

export default AvatarMenu
