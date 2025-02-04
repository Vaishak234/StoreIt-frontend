import PersistUser from '@/components/accessControl/PersistUser';
import ProtectedRoutes from '@/components/accessControl/ProtectedRoutes';
import Header from '@/components/Header';
import MobileNavigation from '@/components/MobileNavigation';
import Sidebar from '@/components/Sidebar';
import React, { ReactNode, useEffect } from 'react';

const layout = ({ children }: { children: ReactNode; }) => {

 
  return (
    <PersistUser >
    <ProtectedRoutes>
      <main className='flex h-screen '>
        <Sidebar />

        <section className='flex h-full flex-1 flex-col'>

          <MobileNavigation />

          <Header />

          <div className="main-content">
            {children}
          </div>
        </section>
      </main>
    </ProtectedRoutes>
    </PersistUser>
  );
};

export default layout;
