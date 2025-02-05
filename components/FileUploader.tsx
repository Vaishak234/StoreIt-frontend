'use client';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from './ui/button';
import Image from 'next/image';
import { convertFileToUrl, getFileType, getFileTypesParams } from '@/lib/utils';
import Thumbnail from './Thumbnail';
import { axiosPrivate } from '@/lib/axios/axios';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { addFileState } from '@/lib/features/Files/fileSlice';
import { useDispatch } from 'react-redux';
import { useParams } from 'next/navigation';
import { generateUrlApi } from '@/lib/services/fileServices';

const FileUploader = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number; }>({});
    const [uploadLoader, setUploadLoader] = useState<{ [key: string]: boolean; }>({});
    const [abortControllers, setAbortControllers] = useState<{ [key: string]: AbortController; }>({});
    const dispatch = useDispatch();
    const params = useParams<{ type?: string; }>();

     

    const type = params.type || 'home';
  
    const types = getFileTypesParams(type);
    
    

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
       if(acceptedFiles.length > 6 ){
          setFiles([])
          toast.error('cannot upload more that 6 files');
           return
       }
        setFiles(acceptedFiles);    
        const formData = new FormData();
        acceptedFiles.forEach((file) => formData.append('files', file));

        // try {
           
        //     const data = await generateUrlApi(formData)

        //     data?.data.map((file: any) => {
        //         setUploadLoader((prev) => ({
        //             ...prev, [file.name]: true
        //         }));
        //     });

        //     const uploadPromises = acceptedFiles.map(async (file, index) => {
        //         const fileData = data.data[index];

        //         // abort controller for canceling request
        //         const controller = new AbortController();

        //         setAbortControllers((prevControllers) => ({
        //             ...prevControllers,
        //             [file.name]: controller,
        //         }));

        //         try {
        //             const uploadResponse = await axios.put(fileData.url, file, {
        //                 headers: { 'Content-Type': file.type },
        //                 signal: controller.signal,
        //                 onUploadProgress: (progressEvent) => {
        //                     const { loaded, total } = progressEvent;
        //                     if (total) {
        //                         const progress = Math.round((loaded / total) * 100);

        //                         setUploadProgress((prevProgress) => ({
        //                             ...prevProgress,
        //                             [file.name]: progress,
        //                         }));
        //                     }
        //                 },
        //             });

        //             if (uploadResponse.status !== 200) {
        //                 throw new Error(`Failed to upload file: ${file.name}`);
        //             }

        //             const response = await axiosPrivate.post('/file/upload', fileData);

        //             if (response.status !== 200) {
        //                 throw new Error(`Failed to record file upload for: ${file.name}`);
        //             }

        //             setFiles((prev) => prev.filter((f) => f.name !== file.name));
        //             setUploadProgress((prev) => {
        //                 const { [file.name]: _, ...rest } = prev; // Removes file2
        //                 return rest; // returns the new object without file2
        //             });
        //             setUploadLoader((prev) => ({
        //                 ...prev,
        //                 [file.name]: false,
        //             }));
                   
        //             dispatch(addFileState({ data: response.data?.data, type: types[0] }));

        //             return { status: 'fulfilled', data: response.data };
        //         } catch (error) {

                    
        //             setFiles((prev) => prev.filter((f) => f.name !== file.name)); // Clean up the file from state
        //             if (axios.isAxiosError(error) && error.name === 'CanceledError') {
        //                 // Handle AbortError specific to the file cancelation
        //                 return { status: 'rejected', error };
        //             }

        //             toast.error(`Error uploading file ${file.name}`);
        //             return { status: 'rejected', error };
        //         }
        //     });

        //     const results = await Promise.all(uploadPromises);
        //     const allSuccessful = results.every((result) => result.status === 'fulfilled');

        //     if (allSuccessful) {
        //         toast.success('Files uploaded successfully');
        //     }
        //     setUploadLoader({})
        //     setFiles([])
        // } catch (error) {
           
        //     setUploadLoader({})
        //     setUploadProgress({})
        //     setFiles([])
        //     setFiles([])
        //     console.log(error);
            
        //     if(error instanceof AxiosError){
        //        return  toast.error(error.response?.data?.message || error.message);
        //     }
        //     toast.error('File upload failed');
        // }
    }, [type]);



    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const handleRemoveFile = (e: React.MouseEvent<HTMLImageElement>, fileName: string) => {
        e.stopPropagation();
        setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));

        //cancel the request on remove
        const controller = abortControllers[fileName];
        if (controller) {
            controller.abort(); // Cancel the specific file's upload
        }

        // Also clear progress of the removed file
        setUploadProgress((prevProgress) => {
            const updatedProgress = { ...prevProgress };
            delete updatedProgress[fileName];
            return updatedProgress;
        });
    };

    return (
        <div {...getRootProps()} className="cursor-pointer">
            <input {...getInputProps()} />

            <Button type="button" className="uploader-button mb-2">
                <Image src="/assets/icons/upload.svg" alt="upload" width={24} height={24} className="h-auto" />
                <p>Upload</p>
            </Button>

            {files.length > 0 && (
                <ul className="uploader-preview-list">
                    <h4 className="h4 text-light-100">Uploading</h4>
                    {files.map((file, index) => {
                        const { type, extension } = getFileType(file.name);

                        return (
                            <li key={`${file.name}-${index}`} className="uploader-preview-item">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-3">
                                        <Thumbnail extension={extension} type={type} url={convertFileToUrl(file)} />
                                        <div className="preview-item-name">
                                            {file?.name}
                                            <Image src="/assets/icons/file-loader.gif" width={80} height={26} alt="Loader" />
                                        </div>
                                    </div>
                                    <span className="caption-1 text-brand">{uploadProgress[file.name] || 0}%</span>
                                </div>

                                {
                                    uploadLoader[file.name] ? (
                                        <Image
                                            src="/assets/icons/remove.svg"
                                            width={24}
                                            height={24}
                                            alt="Remove"
                                            onClick={(e) => handleRemoveFile(e, file?.name)}
                                        />
                                    ) : (
                                        <Image
                                            src="/assets/icons/loader-brand.svg"
                                            width={24}
                                            height={24}
                                            alt="loader"
                                        />
                                    )
                                }
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default FileUploader;
