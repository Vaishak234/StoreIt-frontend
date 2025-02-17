'use client'
import React, { useState } from 'react'
import Thumbnail from './Thumbnail';
import FormatedDateTime from './FormatedDateTime';
import ActionDropdown from './ActionDropdown';
import { convertFileSize } from '@/lib/utils';


type Props = {
   file:FileState 
    setSelectedFile:React.Dispatch<React.SetStateAction<FileState| null>>
}

const Card = ({file , setSelectedFile}:Props) => {
 

  const handleSelect = (e: React.MouseEvent<HTMLDivElement, MouseEvent>,file:FileState) =>{
     e.stopPropagation();
     
     setSelectedFile(file);
  }
       
  return (
    <>
      <div role='button' onClick={(e)=>handleSelect(e,file)}  className='file-card'>
        <div className='flex justify-between'>
          <Thumbnail type={file.type} extension={file.extension} url={file.url} />
          <div className="flex flex-col items-end justify-between">
            <ActionDropdown file={file} />
            <p className="text-brand font-bold mt-1 text-[13px]">{convertFileSize(file.size)}</p>
          </div>
        </div>
        <div className='file-card-details'>
          <p className="subtitle-2 line-clamp-1">{file?.name}</p>
          <FormatedDateTime date={file.createdAt} />
          <p className='caption line-clamp-1 text-light-200'>{file.username && 'By ' + file.username}</p>
        </div>
      </div>

     
    </>
  )
}

export default Card
