'use client';
import ProtectedRoutes from "@/components/accessControl/ProtectedRoutes";
import ActionDropdown from "@/components/ActionDropdown";
import { Chart } from "@/components/Chart";
import FormatedDateTime from "@/components/FormatedDateTime";
import Thumbnail from "@/components/Thumbnail";
import { axiosPrivate } from "@/lib/axios/axios";
import { selectFiles, selectFilesType, selectTotalSize, setFilesState } from "@/lib/features/Files/fileSlice";
import { convertFileSize, convertTypetoPath, getDocumentIcon, getFileIcon } from "@/lib/utils";
import { Separator } from "@radix-ui/react-menubar";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {

  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const recentFiles = useSelector(selectFiles);
  const totalSize = useSelector(selectTotalSize);
  const usageSummary = useSelector(selectFilesType)
  const type = usePathname()

  useEffect(() => {
    
    const controller = new AbortController()
    const signal = controller.signal

    async function fetchStorage() {
      try {
        const { data } = await axiosPrivate.get('/file/usage-space',{
           signal
        });
         
        let totalSize = data?.data?.totalSpace[0]?.totalSpace || 0
        let files = data?.data?.recentFiles || []
        let fileTypes = data?.data?.filesSpace || []

        dispatch(setFilesState({ data: { totalSize, files, fileTypes } , type:'home'} ))
        setIsLoading(false);

      } catch (error) {
        setIsLoading(false);
      }
    }
    fetchStorage();

  }, [type]);

  return (
    <ProtectedRoutes>
      <div className="dashboard-container">

        <section>
          <Chart used={totalSize} />

          {/* Uploaded file type summaries */}
          <ul className="dashboard-summary-list ">
            {usageSummary?.map((summary: any,index) => (
              <Link
                href={`/${convertTypetoPath(summary._id)}`}
                key={summary._id}
                className="dashboard-summary-card"
              >
                <div className="space-y-4">
                  <div className="flex justify-between gap-3">  
                    <div className="">
                    <figure className=' bg-light-400 flex justify-center items-center rounded-full overflow-hidden p-2'>
                      <Image src={getDocumentIcon(summary._id)} alt='thumbnail' width={100} height={100} className='object-cover w-full h-full' />
                    </figure>
                    </div>
                    <h4 className="summary-type-size">
                      {convertFileSize(summary.size) || 0}
                    </h4>
                  </div>

                  <h5 className="summary-type-title capitalize">{summary._id}</h5>
                  <Separator className="bg-light-400" />
                  {/* <FormattedDateTime
                    date={summary.latestDate}
                    className="text-center"
                  /> */}
                </div>
              </Link>
            ))}
          </ul>

        </section>

        {/* Recent files uploaded */}

        <section className="dashboard-recent-files">
          <h2 className="h3 xl:h2 text-light-100">Recent files uploaded</h2>
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Image src={'/assets/icons/loader-brand.svg'} alt="loader" width={20} height={20} />
            </div>
          ) : recentFiles.length > 0 ? (
            <ul className="mt-5 flex flex-col gap-5">
              {recentFiles.map((file: any, index) => (
                <Link
                  href={file.url}
                  target="_blank"
                  className="flex items-center gap-3"
                  key={file._id + '_' + index}
                >
                  <Thumbnail
                    type={file.type}
                    extension={file.extension}
                    url={file.url}
                  />
                  <div className="recent-file-details">
                    <div className="flex flex-col gap-1">
                      <p className="recent-file-name ">{file.name}</p>
                      <FormatedDateTime date={file.createdAt} />
                    </div>
                    <ActionDropdown file={file} />
                  </div>
                </Link>
              ))}
            </ul>
          ) : (
            <p className="empty-list">No files uploaded</p>
          )}
        </section>

      </div>
    </ProtectedRoutes>
  );
}
