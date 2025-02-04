'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator"

import { usePathname } from 'next/navigation';
import { navItems } from '@/constants';
import Link from 'next/link';
import { Button } from './ui/button';
import FileUploader from './FileUploader';
import useLogout from '@/lib/hooks/useLogout';
import { useSelector } from 'react-redux';
import { selectUser } from '@/lib/features/User/userSlice';

const MobileNavigation = () => {

  const [open, setOpen] = useState(false);
  const user = useSelector(selectUser)
  const pathname = usePathname();
  const logout = useLogout()

  return (
    <header className='mobile-header '>

      <Image src="/assets/icons/logo-full-brand.svg" alt="logo" width={120} height={52} className='h-auto' />

      <Sheet open={open} onOpenChange={setOpen} >
        <SheetTrigger>
          <Image src="/assets/icons/menu.svg" alt="menu" width={30} height={30} className='h-auto' />
        </SheetTrigger>
        <SheetContent className='shad-sheet h-screen px-3'>

          <SheetTitle aria-describedby='mobile_nav_header'>
            <div className='header-user'>
              <Image src="/assets/images/avatar-placeholder.png" alt="avatar" width={50} height={50} className='rounded-full header-user-avatar' />

              <div className='sm:hidden lg:block'>
                <p className='subtitle-2 capitalize'>{user?.fullName}</p>
                <p className="caption">{user?.email}</p>
              </div>
            </div>
            {/* seperetor component from shjadcn ui */}
            <Separator className='mb-4 bg-light-200/20'/>

          </SheetTitle>
         
           <nav className="mobile-nav">
            <ul className="mobile-nav-list">
                {
                  navItems?.map(({name,icon,url})=>(
                    <Link href={url} key={name} className="lg:w-full">
                      <li className={`mobile-nav-item ${pathname === url ? 'shad-active' : ''}`}>
                        <Image
                          src={icon}
                          alt={name}
                          width={24}
                          height={24}
                          className={`nav-icon ${pathname === url ? 'nav-icon-active' : ''}`}
                        />
                        <p>{name}</p>
                      </li>
                    </Link>
                  ))
                }
            </ul>
           </nav>
           <Separator className='my-5 bg-light-200/20'/>

           <div className='flex flex-col justify-between gap-5'>
              <FileUploader />
           </div>

          <Button type='submit' className='mobile-sign-out-button mt-4 ' onClick={logout}>
            SignOut
            <Image src="/assets/icons/logout.svg" alt="logo" width={24} height={24} className='w-6' />
          </Button>

        </SheetContent>
      </Sheet>


    </header>
  );
};

export default MobileNavigation;
