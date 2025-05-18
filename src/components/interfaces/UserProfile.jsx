"use client"
import React from 'react'
import { SVGPhone } from '../Statics'

export default function UserProfile({ userData }) {
  // Safely access properties with optional chaining
  return (
    <div className='w-full h-screen flex flex-col justify-around items-center font-bigX text-white' dir='rtl'>
      <div className='h-[90vh] w-full flex flex-col items-center sm:flex-row sm:justify-around justify-center gap-y-10'>
        {userData?.image && (
          <img
            alt='User profile'
            className='rounded-xl sm:w-[330px] sm:h-[330px] w-64 h-64 object-cover'
            src={userData.image}
          />
        )}
        
        <ul className='flex flex-col justify-evenly items-start text-3xl space-y-10 mb-12'>
          <li className='flex gap-7'>
            <h1 className='font-sans text-2xl'>الاسم :</h1>
            <span className='text-violet-50'>{userData?.name || 'غير معروف'}</span>
          </li>
          <li className='flex gap-7'>
            <h1 className='font-sans text-2xl'>رصيدك :</h1>
            <span className='text-green-500'>
              {userData?.netWorth?.toLocaleString() || 0} $
            </span>
          </li>
          <li className='flex gap-7'>
            <h1 className='font-sans text-2xl'>الرقم :</h1>
            <span className='text-violet-50'>
              {userData?.phone || 'غير متوفر'} <SVGPhone />
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}