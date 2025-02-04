import { formatDateTime } from '@/lib/utils';
import React from 'react'

const FormatedDateTime = ({date}:{date:string}) => {

  return (
    <p className='body-1 text-light-200'>
      {
        formatDateTime(date)
      }
    </p>
  )
}

export default FormatedDateTime
