'use client'
import React from 'react'
import { Button } from './ui/button';
import Image from 'next/image';
import Search from './Search';
import FileUploader from './FileUploader';
import useLogout from '@/lib/hooks/useLogout';
import AvatarMenu from './AvatarMenu';

const Header = () => {


  const logout = useLogout()

  return (
    <header className='header'>

        <Search />

        <div className='header-wrapper'>
          
          <FileUploader/>

          <AvatarMenu />
          
        </div>
    </header>
  )
}

export default Header
