'use client'
import React from 'react'

export default function FetchStatus({ res }) {
  return (
    <div className={`
    absolute top-10 right-3 
    border-[1px] 
    ${
      res.status===200?'border-green-600'
      :res.status===300? 'border-yellow-400'
      :res.status===404? 'border-red-500'
      :'border-blue-500'
    }
    w-fit min-h-10 p-2
    flex justify-center items-center
    `}>
      <h1 className='font-bigX text-center text-3xl'>
        {
          res.message
        }
      </h1>
    </div>
  )
}
