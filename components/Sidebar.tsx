'use client'
import { navItems } from '@/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const Sidebar = () => {

    const pathname = usePathname()

    

  return (
    <aside className='sidebar'>
        <Link  href={'/'}>
           <Image src="/assets/icons/logo-full-brand.svg" alt="logo" width={160} height={50} className='hidden h-auto lg:block ' />

           <Image src="/assets/icons/logo-brand.svg" alt="logo" width={52} height={52} className='block h-auto lg:hidden ' />
        </Link>

        <nav className='sidebar-nav'>
            <ul className='flex flex-1 flex-col gap-6'>
                {
                    navItems?.map((item,index)=>(
                        <Link href={item.url} key={index} className="lg:w-full">
                            <li className={`sidebar-nav-item ${pathname === item.url ? 'shad-active' : ''}`}>
                                <Image
                                    src={item.icon}
                                    alt={item.name}
                                    width={24}
                                    height={24}
                                    className={`nav-icon ${pathname === item.url ? 'nav-icon-active' : ''}`}
                                />
                                <p>{item.name}</p>
                            </li>
                        </Link>
                    ))
                }
            </ul>
        </nav>

        <Image src="/assets/images/files-2.png" alt="logo" width={506} height={418} className='w-full' />

       
    </aside>
  )
}

export default Sidebar
