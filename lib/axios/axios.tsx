import axios, { AxiosError, AxiosInstance } from 'axios';

// Create an axios instance with a base URL
const api :AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,  
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials:true
});


export const axiosPrivate:AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,  
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials:true
});

// axios interceptor to intercepct response and if  status 401 (token expire) , redirect to login page
axiosPrivate.interceptors.response.use(
    (response) => {
        return response;
    },
    (error:AxiosError) => {
        const originalRequest = error.config;
        // Check if it's a 401 Unauthorized error and if the user is not already being redirected
        if (error.response && error.response.status === 401) {
            // Redirect the user to the login page to reauthenticate
            window.location.href = '/login';  
        }

        return Promise.reject(error);
    }
);






export default api