"use client"
import React from 'react'
import { SVGPhone } from '../Statics'

export default function UserProfile({ userData }) {
  // Safely access properties with optional chaining
  return (
    <div className='w-full h-screen flex flex-col justify-around items-center font-bigX text-white' dir='rtl'>
      <div className=' h-screen w-full flex items-center justify-center'>
        <div
          className='flex flex-col items-center sm:flex-row sm:gap-32 justify-center gap-y-10 bg-[#0000009d] w-full h-full'
        >
          {userData?.image && (
            <img
              alt='User profile'
              className='rounded-md sm:w-[330px] sm:h-[330px] w-64 h-64 object-cover'
              src={userData.image}
            />
          )}
          
          <ul className='flex flex-col sm:mt-32 justify-evenly items-start text-3xl space-y-10 mb-12 py-7 px-5 rounded-lg'>
            <li className='flex gap-7'>
              <h1 className='text-3xl'>الاسم :</h1>
              <span className='text-violet-50'>{userData?.name || 'غير معروف'}</span>
            </li>
            <li className='flex gap-7'>
              <h1 className='text-3xl'>رصيدك :</h1>
              <span className='text-[#4ce142]'>
                {userData?.netWorth?.toLocaleString() || 0} $
              </span>
            </li>
            <li className='flex gap-7'>
              <h1 className='text-3xl'>الرقم :</h1>
              <span className='text-violet-50'>
                {userData?.phone || 'غير متوفر'} <SVGPhone color='#4ce142' />
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}