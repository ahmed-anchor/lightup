'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import NavigationBar from '@/components/accessiblity/NavigationBar'
import Link from 'next/link'

export default function page() {
  const lightRef = useRef(null)
  const upRef = useRef(null)

  useEffect(() => {
    // Split text into individual characters
    const lightText = lightRef.current
    const upText = upRef.current
    
    // Split LIGHT into spans
    const lightChars = 'LIGHT'.split('').map((char, index) => 
      `<span class="char" style="opacity: 0;">${char}</span>`
    ).join('')
    lightText.innerHTML = lightChars
    
    // Split UP into spans
    const upChars = 'UP'.split('').map((char, index) => 
      `<span class="char" style="opacity: 0;">${char}</span>`
    ).join('')
    upText.innerHTML = upChars
    
    // Get all character spans
    const lightCharSpans = lightText.querySelectorAll('.char')
    const upCharSpans = upText.querySelectorAll('.char')
    
    // Create timeline
    const tl = gsap.timeline()
    
    // Animate LIGHT characters appearing
    tl.to(lightCharSpans, {
      opacity: 1,
      duration: 0.4,
      stagger: 0.08,
      ease: "none"
    })
    
    // Animate UP characters appearing with slight delay
    tl.to(upCharSpans, {
      opacity: 1,
      duration: 0.1,
      stagger: 0.08,
      ease: "none"
    }, "-=0.2")
    
    // Wait for 2 seconds then remove text from last to first character
    tl.to(upCharSpans, {
      opacity: 0,
      duration: 0.05,
      stagger: {
        each: 0.03,
        from: "end"
      },
      ease: "none"
    }, "+=2")
    
    // Remove LIGHT text from last to first character
    tl.to(lightCharSpans, {
      opacity: 0,
      duration: 0.05,
      stagger: {
        each: 0.03,
        from: "end"
      },
      ease: "none"
    }, "-=0.1")
    
    // Optional: Restart the animation after everything is removed
    tl.call(() => {
      setTimeout(() => {
        tl.restart()
      }, 600)
    })

  }, [])

  return (
    <div className='min-h-screen w-full flex lg:flex-row flex-col font-robert items-start lg:items-center text-white gap-y-13'>
      <NavigationBar />
      <div className='flex flex-col'>
        <h1
          ref={lightRef}
          className='sm:mt-16 lg:-mt-16 mt-40 ml-2 sm:text-[200px] text-[110px] mix-blend-overlay'
        >
          LIGHT
        </h1>
        <h1 
          ref={upRef}
          className="sm:text-[200px] text-[113px] mix-blend-overlay sm:-mt-36 -mt-20 ml-[14px]"
        >
          UP
        </h1>
      </div>
      <ul className=' font-robert font-medium flex text-3xl flex-col justify-center lg:w-fit w-full items-end pr-12 lg:pl-40 xl:pl-[420px] -mt-12 sm:-mt-10 lg:mt-60 gap-y-10'>
        <Link
          href='/jobs'
          className='bg-black mr-7 rotate-3 hover:rotate-0 transition ease-out duration-200 text-nowrap'
        >
          Jobs
        </Link>
        <Link
          href='/ai'
          className='bg-black mr-6 -rotate-3 hover:-rotate-0 transition ease-out duration-200 text-nowrap'
        >
          Ai Services
        </Link>
        <Link
          href='/order'
          className='bg-black mr-3 rotate-3 hover:rotate-0 transition ease-out duration-200 text-nowrap'
        >
        Order Now
        </Link>
        <Link
          href='/workers'
          className='bg-black mr-3 -rotate-1 hover:-rotate-0 transition ease-out duration-200 text-nowrap'
        >
          require Dev
        </Link>
      </ul>
    </div>
  )
}