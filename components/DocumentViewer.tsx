"use client"; 

import { useEffect, useRef } from "react";
import WebViewer from "@pdftron/webviewer";

const DocumentViewer = ({url}:{url:string}) => {
  const viewer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (viewer.current) {
      WebViewer(
        {
          path: "/dist",
          initialDoc:url, 
        },
        viewer.current
      ).then((instance) => {
        console.log("WebViewer loaded", instance);

      
        instance.UI.disableElements(["downloadButton"]); 

      
      });
    }
  }, []);

  return <div className="webviewer" ref={viewer} style={{ height: "100vh" }} />;
};

export default DocumentViewer;
