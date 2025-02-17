"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Download, X } from "lucide-react";
import { getDocumentIcon, handleDownLoad } from "@/lib/utils";
import Image from "next/image";
import { ImageViewer, VideoPlayer } from "./MediaPlayers";
import { useSelector } from "react-redux";
import { selectFileUrls } from "@/lib/features/Files/fileSlice";

type AllFilesUrl = {
    url: string;
    name: string;
    type: string;
};

const MediaViewer = ({ file, close }: { file: FileState; close: () => void; }) => {
    const allFiles: AllFilesUrl[] = useSelector(selectFileUrls);
    const index = allFiles.findIndex((item) => item.url === file.url);
    const [currentIndex, setCurrentIndex] = useState(index);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
    }, [currentIndex]);



    const getMediaPlayer = () => {
        if (file.type === "video" || file.type === "audio") {
            return <VideoPlayer url={allFiles[currentIndex].url}  />;
        }

        if (file.type === "image") {
            return <ImageViewer url={allFiles[currentIndex].url}  />;
        }

        // if (file.type === "document") {
        //     return <DocumentViewer url={allFiles[currentIndex].url}  />;
        // }

        if (file.type === "other") {
            return "other";
        }
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % allFiles.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + allFiles.length) % allFiles.length);
    };

    return (
        <div className="w-full h-screen fixed inset-0 bg-[rgba(0,0,0,0.8)] p-4 px-6 text-white select-none">
            <div className="flex justify-between ">
                <div className="flex items-center gap-2">
                    <button onClick={close}>
                        <X size={30} />
                    </button>
                    <Image src={getDocumentIcon(allFiles[currentIndex].type)} alt="icon" width={30} height={30} />
                    <p className="subtitle-2 truncate max-w-[200px]">{allFiles[currentIndex]?.name}</p>
                </div>

                <div className="flex gap-6">
                    <button onClick={() => handleDownLoad(allFiles[currentIndex].url)}>
                        <Download size={26} />
                    </button>
                </div>
            </div>

            <div className="flex justify-center items-center h-[calc(100vh-100px)]">
                <div className="relative">
                   
                        <>
                            <button
                                onClick={handlePrev}
                                className="absolute top-1/2 left-[-70px] transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded"
                            >
                                <ChevronLeft />
                            </button>

                            <button
                                onClick={handleNext}
                                className="absolute top-1/2 right-[-70px] transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded"
                            >
                                <ChevronRight />
                            </button>
                            {getMediaPlayer()}
                        </>
                  
                </div>
            </div>
        </div>
    );
};

export default MediaViewer;
