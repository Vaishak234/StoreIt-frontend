'use client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";


import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios/axios";
import toast from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { setUserState } from "@/lib/features/User/userSlice";


const OtpModal = ({ email ,otpValue }: { email: string ,otpValue:string }) => {    

    const [isOpen, setIsOpen] = useState(true);
    const [otp, setOtp] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()
    const dispatch = useDispatch()



    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(!otp ) {
            toast.error('Please enter your otp')
            return;
        }
        setIsLoading(true);
        try {
            // api call to verify otp
            const {data} = await axios.post('/auth/verify-otp', {email,otp});
            dispatch(setUserState(data?.data))
            toast.success(data.message)
            router.push('/')
        } catch (error) {

            toast.error('Invalid OTP');

        } finally {

            setIsLoading(false);
        }
    };

   

    return (
        <div>
            <AlertDialog open={isOpen} onOpenChange={setIsOpen} >
                <AlertDialogContent className="shad-alert-dialog">
                    <AlertDialogHeader className="relative flex justify-center">

                        <AlertDialogTitle className="h2 text-center">
                            Enter your otp
                            <Image className="otp-close-button" src="/assets/icons/close-dark.svg" width={24} height={24} alt="close" onClick={() => setIsOpen(prev => !prev)} />
                        </AlertDialogTitle>

                        <AlertDialogDescription className="subtitle-2 text-center text-light-100">
                            We'have send an otp to your email <span className="pl-1 text-brand">{email}</span>
                        </AlertDialogDescription>


                        <InputOTP maxLength={6} value={otp} onChange={setOtp} autoFocus>
                            <InputOTPGroup className="flex  mt-4 w-full justify-center sm:gap-2 " >
                                <InputOTPSlot index={0} className="shad-otp-slot" />
                                <InputOTPSlot index={1} className="shad-otp-slot" />
                                <InputOTPSlot index={2} className="shad-otp-slot" />
                                <InputOTPSlot index={3} className="shad-otp-slot" />
                                <InputOTPSlot index={4} className="shad-otp-slot" />
                                <InputOTPSlot index={5} className="shad-otp-slot" />
                            </InputOTPGroup>
                        </InputOTP>

                    </AlertDialogHeader>
                    <AlertDialogFooter>

                     
                        <AlertDialogAction onClick={handleSubmit}  className="shad-submit-btn w-full ">
                            Continue
                            {
                                isLoading && (
                                    <Image src='/assets/icons/loader.svg' alt="loader" width={24} height={24} className="ml-2 animate-spin" />
                                )
                            }
                        </AlertDialogAction>
                       

                    </AlertDialogFooter>
                    <div className="text-center text-light-200">
                        Your Resend Subscription is Expired
                        <Button type="button" variant="link" className="pl-1 text-brand" >{otpValue}</Button>
                    </div>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    );
};

export default OtpModal;
