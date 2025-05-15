"use client"
import React from 'react'
import { SVGPhone, SVGProfile } from '../Statics'

export default function UserProfile({ userData }) {
  return (
    <div
      className='w-full h-screen flex flex-col justify-around items-center font-bigX text-white '
      dir='rtl'
    >
      <div
        className='
        h-[90vh] w-full
        flex flex-col items-center sm:flex-row sm:justify-around justify-center gap-y-10

        '
      >
        <img
          alt='no pic'
          className='
          rounded-xl 
          sm:w-[330px] sm:h-[330px] w-64 h-64
          '
          src={userData.imagePath}
        />
        <ul
          className='flex flex-col justify-evenly items-start text-3xl space-y-10 mb-12'
        >
          <li
            className='flex gap-7'
          >
            <h1 className='font-sans text-2xl' >
              الاسم : 
            </h1>
            <span
              className='text-violet-50'
            >
              { userData.name }
            </span>
          </li>
          <li
            className='flex gap-7'
          >
            <h1 className='font-sans text-2xl'>
              رصيدك : 
            </h1>
            <span
              className='text-green-500'
            >
              { userData.netWorth } $
            </span>
          </li>
          <li
            className='flex gap-7'
          >
            <h1 className='font-sans text-2xl' >
              الرقم : 
            </h1>
            <span
              className='text-violet-50'
            >
              { userData.phone }  <SVGPhone />
            </span>
          </li>
        </ul>
      </div>
        <ul
          className="space-y-4 w-64 flex flex-col justify-between"
        >
            {/* <li 
              className="flex justify-between items-center text-4xl"
            >
              <span className="font-medium text-gray-200">مشروع احمد :</span>
              <span className="text-green-400 font-bold">
                  23 $
              </span>
            </li> */}
          {/* {userData.projects?.map((project, index) => (
            <li 
              key={index}
              className="flex justify-between items-center"
            >
              <span className="font-medium text-gray-200">{project.name}asd</span>
              <span className="text-green-400 font-bold">
                {project.price} $ sad
              </span>
            </li>
          ))} */}
        </ul>
    </div>
  )
}
