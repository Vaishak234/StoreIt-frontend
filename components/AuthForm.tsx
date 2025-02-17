"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import OtpModal from "./OtpModal";
import axios from "@/lib/axios/axios";
import toast from "react-hot-toast";
import { AxiosError } from "axios";


const authFormSchema = (type: FormType) => {
    return z.object({
        email: z.string().email(),
        fullName: type === 'sign-up' ? z.string().min(3).max(50) : z.string().optional()
    });
};


type FormType = 'sign-in' | 'sign-up';

const AuthForm = ({ type }: { type: FormType; }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [errMessage, setErrMessage] = useState('');
    const [openOtp, setOpenOtp] = useState(false);
    const [otpValue, setOtpValue] = useState('');


    const formSchema = authFormSchema(type);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: ""
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        try {

            const response = type === 'sign-up'
                ? await axios.post('/auth/sign-up', values)
                : await axios.post('/auth/sign-in', { email: values.email });
            
            toast.success(response?.data.message);
            setOtpValue(response.data.data)
            setOpenOtp(true);
            setIsLoading(false);
            // form.reset();

        } catch (error) {
            setIsLoading(false)
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message || 'Error in signing up');
            } else {
                toast.error('An unexpected error occurred');
            }
        }

    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form ">
                    <h1 className="form-title  ">
                        {type === 'sign-in' ? 'Sign In' : 'Sign Up'}
                    </h1>
                    {
                        type === 'sign-up' && (

                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="shad-form-item">
                                            <FormLabel className="shad-form-label">Full Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your fullname" className="shad-input" {...field} />
                                            </FormControl>
                                            <FormMessage className="text-error" />

                                        </div>

                                    </FormItem>
                                )}
                            />
                        )
                    }

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <div className="shad-form-item">
                                    <FormLabel className="shad-form-label">Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your email" className="shad-input" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-error " />

                                </div>


                            </FormItem>
                        )}
                    />

                    <Button className="form-submit-button" disabled={isLoading} type="submit">Submit

                        {
                            isLoading && (
                                <Image src='/assets/icons/loader.svg' alt="loader" width={24} height={24} className="ml-2 animate-spin" />
                            )
                        }
                    </Button>

                    {
                        errMessage && (
                            <p className="error-message">* {errMessage}</p>
                        )
                    }

                    <div className="body-2 flex justify-center">
                        {
                            type === 'sign-in' ? (
                                <p className="text-light-100">Don't have an account? <Link href="/sign-up
                                ">Sign up</Link></p>
                            ) : (
                                <p className="text-light-100 ">Already have an account? <Link href="/sign-in
                                    ">Sign in</Link></p>
                            )

                        }
                    </div>
                </form>
            </Form>

            {/* otp verification */}

            {
                openOtp && <OtpModal otpValue={otpValue} email={form.getValues("email")} />
            }
        </>
    );

};



export default AuthForm;
