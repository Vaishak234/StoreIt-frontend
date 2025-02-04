'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectUser } from '@/lib/features/User/userSlice';
import CircularLoader from '../ui/CircularLoader';


const ProtectedRoutes = ({ children }: { children: ReactNode; }) => {

    const router = useRouter();
    const { accessToken } = useSelector(selectUser);


    useEffect(() => {
        if (!accessToken) {
            router.push('/sign-in');
        }
    }, [accessToken, router]);


    if (!accessToken) {
        return <CircularLoader />;
    }

    return (
       
           <>
            {children}
           </>
       
    );
};

export default ProtectedRoutes;
