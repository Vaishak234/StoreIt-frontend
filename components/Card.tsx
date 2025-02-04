import Link from 'next/link';
import React from 'react'
import Thumbnail from './Thumbnail';
import FormatedDateTime from './FormatedDateTime';
import ActionDropdown from './ActionDropdown';
import { convertFileSize } from '@/lib/utils';



const Card = ({file}:{file:FileState}) => {
       
    
  return (
    <Link href={file.url} target='_blank' className='file-card'>
       <div className='flex justify-between'>
        <Thumbnail type={file.type} extension={file.extension} url={file.url} />
            <div className="flex flex-col itens-end justify-between">

                <ActionDropdown file={file} />
                <p className=" text-brand font-bold mt-1 text-[13px]">{convertFileSize(file.size)}</p>

            </div>
       </div>
       <div className='file-card-details '>
             <p className="subtitle-2 line-clamp-1">{file?.name}</p>
              <FormatedDateTime date={file.createdAt} />
              <p className='caption line-clamp-1 text-light-200'> {file.username && 'By ' + file.username}</p>
       </div>
    </Link>
  )
}

export default Card
