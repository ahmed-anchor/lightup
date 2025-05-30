import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className='flex flex-col justify-center gap-y-24 items-center text-[100px] font-robert h-screen w-full text-white'>
      <h1 className='mix-blend-overlay'>AI SOON</h1>
      <Link href='/' className='text-2xl'>Back !!</Link>
    </div>
  )
}
