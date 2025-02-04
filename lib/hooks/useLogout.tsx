'use client'
import axios from "@/lib/axios/axios"
import {  useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { logoutUser } from "../features/User/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../features/store";

const useLogout = () => {

    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()

    const logoutFn = async () => {
         try {
            const response = await axios.get('/auth/logout')
            console.log(response.data);
            dispatch(logoutUser())
            router.push('/sign-in')
            toast.success(response?.data?.message)
            
         } catch (error) {
            console.log(error);
            
         }
    };

    return logoutFn;
};

export default useLogout;