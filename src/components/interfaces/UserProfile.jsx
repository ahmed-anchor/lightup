'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { SVGPhone } from '../Statics'

export default function UserProfile({ userData }) {
  const containerRef = useRef(null)
  const imageRef = useRef(null)
  const listItemsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate container fade + scale
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' }
      )

      // Animate image fade-in
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: 'power2.out' }
      )

      // Animate list items with stagger
      gsap.fromTo(
        listItemsRef.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: 0.7,
          stagger: 0.15,
          ease: 'power2.out',
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className='w-full h-screen flex flex-col justify-around items-center font-bigX text-white' dir='rtl'>
      <div className='h-screen w-full flex items-center justify-center bg-[#0000009d]'>
        <div
          ref={containerRef}
          className='flex flex-col items-center sm:flex-row sm:gap-32 justify-center gap-y-10  w-full h-full'
        >
          {userData?.image && (
            <img
              ref={imageRef}
              alt='User profile'
              className='rounded-md sm:w-[330px] sm:h-[330px] w-64 h-64 object-cover'
              src={userData.image}
            />
          )}
          
          <ul className='flex flex-col sm:mt-32 justify-evenly items-start text-3xl space-y-10 mb-12 py-7 px-5 rounded-lg'>
            {[
              {
                label: 'الاسم :',
                value: userData?.name || 'غير معروف',
                color: 'text-violet-50',
              },
              {
                label: 'رصيدك :',
                value: `${userData?.netWorth?.toLocaleString() || 0} $`,
                color: 'text-[#4ce142]',
              },
              {
                label: 'الرقم :',
                value: userData?.phone || 'غير متوفر',
                color: 'text-violet-50',
                icon: <SVGPhone color='#4ce142' />,
              },
            ].map((item, index) => (
              <li
                key={index}
                className='flex gap-7'
                ref={el => (listItemsRef.current[index] = el)}
              >
                <h1 className='text-3xl'>{item.label}</h1>
                <span className={item.color}>
                  {item.value} {item.icon}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
