'use client';
import { selectUser, setUserState } from '@/lib/features/User/userSlice';
import axios from '@/lib/axios/axios';
import React, { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CircularLoader from '../ui/CircularLoader';

const PersistUser = ({children}:{children:ReactNode}) => {


    const [isLoading, setIsLoading] = useState(true);
    const { accessToken } = useSelector(selectUser);
    const dispatch = useDispatch()
    

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {

                const { data } = await axios.get('/auth/refresh');

                dispatch(setUserState(data?.data))         

            } catch (error) {
                console.log(error);

            } finally {
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
            }
        };

        if (!accessToken) {
            verifyRefreshToken();
        } else {

            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
    }, [accessToken]);

    return (
        <>
            {
                isLoading ? <CircularLoader/> : children
            }
        </>
    );
};


export default PersistUser;
