'use client'
import Image from 'next/image';
import React, { useState } from 'react';
import ReactPlayer from 'react-player';
// import { Viewer, Worker } from '@react-pdf-viewer/core';
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// import "@react-pdf-viewer/core/lib/styles/index.css";
// import "@react-pdf-viewer/default-layout/lib/styles/index.css";


export const VideoPlayer = ({ url }: { url: string; }) => {
    const [loading, setLoading] = useState(false);

    const videoControl = {
        controls: true,
        width: '100%',
        height: '100%',
        pip: true,
        playsinline: true,
        playing: true
    };

   
    return (
        <div className="player-wrapper h-[500px] relative">
            {loading && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
            </div>
            )}

            <ReactPlayer
            url={url}
            {...videoControl}
            onBuffer={() => setLoading(true)}
            onBufferEnd={() => setLoading(false)}
            className="pointer-events-auto" // Ensure controls are always visible
            />
        </div>
    );
};


export const ImageViewer = ({ url }: { url: string; }) => {
    return (
        <div className="image-wrapper h-[500px] relative flex justify-center items-center" >
            <Image width={100} height={100} src={url} alt="Image Viewer" className="object-contain h-full w-full" />
        </div>
    );
};


// export function DocumentViewer({ url }: { url: string }) {
//   const defaultLayoutPluginInstance = defaultLayoutPlugin(); // Enables zoom, sidebar, etc.

//   return (
//     <div className="h-[90vh] w-[1000px] flex justify-center items-center bg-gray-100 rounded-lg shadow-lg p-4">
//       <Worker workerUrl={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.9.179/pdf.worker.min.js`}>
//         <div className="w-full max-w-[800px] h-full overflow-auto border border-gray-300 shadow-lg">
//           <Viewer fileUrl={url} plugins={[defaultLayoutPluginInstance]} />
//         </div>
//       </Worker>
//     </div>
//   );
// }