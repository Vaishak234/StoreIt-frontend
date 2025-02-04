import toast from "react-hot-toast";
import { axiosPrivate } from "../axios/axios";

type ParamsType = {
    type?: string,
    page?: number;
    query?: string,
    sort?: string,
};

// get files api call
export const getFilesApi = async ({ type, query, sort, page }: ParamsType) => {

    try {

        const { data } = await axiosPrivate.get('/file', {
            params: { type, query, sort },
        });
        return data;
    } catch (error) {

        toast.error(error);
    }
};

// api call for deleting file
export const deleteFileApi = async (id: string, size: number) => {
    try {
        const { data } = await axiosPrivate.delete(`/file/${id}/${size}`);
        return data;

    } catch (error) {
        console.log(error);
        toast.error(error);
    }
};

// api call for rename file
export const renameFileApi = async (id: string, name: string) => {
    try {
        const { data } = await axiosPrivate.put(`/file/${id}`, { name });

        return data;

    } catch (error) {
        console.log(error);
        toast.error(error);
    }
};

// api for generate presigned url
export const generateUrlApi = async (formData:FormData) => {
    try {
        const { data } = await axiosPrivate.post('/file/generate-url', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        if (!data || !data.data || !Array.isArray(data.data)) {
            throw new Error('Invalid response format from the server');
        }
        return data;
    } catch (error) {
        throw error;
    }

};