'use client'
import { useEffect, useRef } from "react"
import gsap from "gsap"
import Link from "next/link"
import { SVGClient, SVGCode, SVGOrder, SVGSingIn } from "../Statics"

export default function ButtonsCollection({ handleCard }) {

  const elementRef = useRef(null)

  useEffect(()=>{
    if (elementRef.current) {
      // Set initial state (completely transparent)
      gsap.set(elementRef.current, { opacity: 0 });
      
      // Create the animation
      gsap.to(elementRef.current, {
        delay: .7,
        opacity: 1,        
        duration: 1.5,
        ease: "power2.out" 
      });
    }
  },[])



  return (
    <div
      className="flex absolute lg:mt-64 mt-[310px] flex-col font-bigX lg:space-y-10 space-y-10 lg:w-full lg:justify-around lg:items-center"
      ref={elementRef}
    >
      <div className="flex flex-col gap-10 lg:flex-row lg:w-full lg:justify-center lg:items-center">
        <Link
          href='/'
          className="bg-purple-950 pb-2 text-yellow-200 text-4xl items-center justify-center min-w-[300px] flex max-h-9 overflow-visible rounded w-fit"
          onClick={() => handleCard(true)}
        >
          <SVGClient />اختيار مستقل حر
        </Link>
        <Link
          className="bg-yellow-300 pb-2 text-purple-800 text-4xl items-center justify-center min-w-[300px] flex max-h-9 overflow-visible rounded w-fit"
          href='/profile'
        >
          <SVGSingIn /> التسجيل كمستقل
        </Link>
      </div>
      <div className="flex flex-col gap-10 lg:flex-row lg:w-full lg:justify-center lg:items-center">
        <button
          className="bg-purple-900 pb-2 text-yellow-200 text-4xl items-center justify-center min-w-[300px] flex max-h-9 overflow-visible rounded w-fit"
          onClick={() => handleCard(true)}
        >
        <SVGCode /> الذكاء الاصطناعي
        </button>
        <button
          className="bg-violet-950 pb-2 text-yellow-200 text-4xl items-center justify-center min-w-[300px] flex max-h-9 overflow-visible rounded w-fit"
          onClick={() => handleCard(true)}
        >
        <SVGOrder /> عرض طلب
        </button>
      </div>
    </div>
  )
}
