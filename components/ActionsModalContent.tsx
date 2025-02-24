import React from 'react'
import Thumbnail from './Thumbnail';
import FormatedDateTime from './FormatedDateTime';
import { convertFileSize, formatDateTime } from '@/lib/utils';


const ImageThumbnail = ({file}:{file:FileState}) => (
    <div className="file-details-thumbnail">
        <Thumbnail type={file.type} extension={file.extension} />
        <div className="flex flex-col">
            <p className='subtitle-2 mb-1'>{file.name}</p>
            <FormatedDateTime date={file.createdAt} />
        </div>
    </div>
)

const DetailRow = ({label,value}:{label:string , value:string}) => (
   <div className="flex">
       <p className='file-details-label text-left'>{label}</p>
       <p className='file-details-value text-left'>{value}</p>
   </div>
)


export const FileDetails = ({file}:{file:FileState}) => {

  return (
    <>
       <ImageThumbnail file={file} />
       <div className="space-y-4 px-2 pt-2">
              <DetailRow label='Format:' value={file.extension} />
              <DetailRow label='Size:' value={convertFileSize(file.size)} />
              <DetailRow label='Owner:' value={file?.username || ''} />
        <DetailRow label='Last Edit:' value={formatDateTime(file.updatedAt || file.createdAt)} />
       </div>
    </>
  )
}

