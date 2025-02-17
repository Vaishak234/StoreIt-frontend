'use client'
import { navItems } from '@/constants';
import { selectUser } from '@/lib/features/User/userSlice';
import { calculatePercentage, cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { useSelector } from 'react-redux';

const Sidebar = () => {

   const pathname = usePathname()
   const {storageLimit , storageUsed} = useSelector(selectUser)
    

  return (
    <aside className='sidebar'>
        <Link href={'/'}>
           <Image src="/assets/icons/logo-full-brand.svg" alt="logo" width={160} height={50} className='hidden h-auto lg:block ' />

           <Image src="/assets/icons/logo-brand.svg" alt="logo" width={52} height={52} className='block h-auto lg:hidden ' />
        </Link>

        <nav className='sidebar-nav'>
            <ul className='flex flex-1 flex-col gap-6'>
                {
                    navItems?.map((item,index)=>{
                        
                        return (
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
                    ) })
                }
            </ul>
        </nav>

        <div className='mt-6 px-4 py-2 bg-white rounded-lg shadow-md border'>
            <div className='flex justify-between text-sm font-medium text-gray-700'>
            <span>Storage Used</span>
            <span>{calculatePercentage(storageUsed)}%</span>
            </div>

            <div className='relative pt-1'>
            <div className='overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200'>
            <div style={{ width: `${(storageUsed / storageLimit) * 100}%` }} className='shadow-none bg-brand flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-300'></div>
            </div>
            </div>

        </div>
    </aside>
  )
}

export default Sidebar
