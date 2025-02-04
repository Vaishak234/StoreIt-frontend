import { getFileIcon } from '@/lib/utils';
import Image from 'next/image';
import React from 'react'


interface Prop{
    type:string
    extension:string
    url?:string

}

const Thumbnail = ({type,extension, url=''}:Prop) => {
  

    const isImage = type === 'image' && extension !== 'svg' 

    const width = isImage ? 20 : 12
    const height = isImage ? 20 : 12
    const padding = isImage ? 0 :2

  return (
    <figure className={`mr-2 bg-light-400 flex justify-center items-center rounded-full overflow-hidden w-12 h-12 p-${padding}`}>
            <Image src={isImage ? url : getFileIcon(extension, type)} alt='thumbnail' width={100} height={100} className='object-cover object-top w-full h-full rounded-full' />
            
    </figure>

  )
}

export default Thumbnail
