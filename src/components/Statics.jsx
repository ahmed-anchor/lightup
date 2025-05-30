'use client';
import React from 'react';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';


export const Spinner = ({ spinnerColor = 'blue-600' }) => {
  
  return (
    <div
      className={`
        w-8 h-8
        animate-spin rounded-full
        border-4 border-solid border-current border-e-transparent
        align-[-0.125em] text-surface
        motion-reduce:animate-[spin_1.5s_linear_infinite]
        text-${spinnerColor}
      `}
      role="status"
    />
  );
};




export const GhostIcon = ({ fill = "#000000", size = 70 }) => {
  const svgRef = useRef(null)
  const [isSigned, setSign] = useState(null)

  useEffect(() => {
    const svg = svgRef.current
    
    if(!isSigned && svg) {
      // Create explosive shaking animation with initial delay
      const tl = gsap.timeline({ repeat: -1, delay: .01 })
      
      // Add initial delay before starting the shake sequence
      tl.to({}, { duration: 2 }) // 2 second delay before shaking starts
      
      // Initial gentle shake
      tl.to(svg, {
        x: "random(-2, 2)",
        y: "random(-2, 2)",
        rotation: "random(-1, 1)",
        duration: 0.05,
        ease: "none"
      })
      
      // Intensify the shake
      tl.to(svg, {
        x: "random(-4, 4)",
        y: "random(-4, 4)",
        rotation: "random(-2, 2)",
        duration: 0.05,
        ease: "none"
      })
      
      // Even more intense
      tl.to(svg, {
        x: "random(-6, 6)",
        y: "random(-6, 6)",
        rotation: "random(-3, 3)",
        duration: 0.04,
        ease: "none"
      })
      
      // Maximum intensity
      tl.to(svg, {
        x: "random(-3, 8)",
        y: "random(-8, 8)",
        rotation: "random(-4, 40)",
        duration: 0.03,
        ease: "none"
      })
      
      // Quick burst shake
      tl.to(svg, {
        x: "random(-6, 10)",
        y: "random(-10, 10)",
        rotation: "random(-2, 50)",
        duration: 0.02,
        ease: "none",
        repeat: 3,
        yoyo: true
      })
      
      // Brief pause before restarting
      tl.to(svg, {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0.1,
        ease: "power2.out"
      })
    }
    
    
  }, [isSigned])

  return (
    <svg
      ref={svgRef}
      fill={fill}
      version="1.1"
      id="Layer_1"
      width={size}
      height={size}
      viewBox="0 0 70 70"
      enableBackground="new 0 0 70 70"
      xmlSpace="preserve"
      className="fixed bottom-8 left-4 rounded-3xl cursor-pointer mix-blend-difference"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <g>
          <path d="M59.5,27.848c0-13.509-10.99-24.5-24.5-24.5s-24.5,10.991-24.5,24.5c0,9.392,5.314,17.562,13.091,21.672 c0.006,0.052,0.004,0.103,0.015,0.155l2.9,14.539c0.185,0.938,1.007,1.369,1.962,1.369h3.383c0.347,1,0.984,1,1.723,1h2 c0.738,0,1.376,0,1.723-1h3.371c0.958,0,1.782-0.463,1.964-1.404l2.772-14.174C53.725,46.085,59.5,37.639,59.5,27.848z M39.017,61.583h-8.905l-2.068-10.281c2.207,0.654,4.54,1.028,6.957,1.028c2.064,0,4.069-0.285,5.986-0.768L39.017,61.583z M32.117,48.032l-2.774-13.359c0.045,0.003,0.089,0.012,0.135,0.012c0.869,0,1.621-0.609,2.097-1.683 c0.028-0.033,0.054-0.067,0.077-0.104c0.046-0.071,0.087-0.123,0.12-0.158c0.032,0.036,0.073,0.086,0.118,0.157 c0.029,0.045,0.063,0.088,0.101,0.127c0.478,1.054,1.224,1.65,2.083,1.65c0.479,0,1.374-0.198,2.021-1.518 c0.007-0.012,0.014-0.025,0.02-0.038c0.022-0.047,0.044-0.096,0.065-0.145c0.02-0.024,0.037-0.05,0.055-0.076 c0.046-0.071,0.087-0.123,0.12-0.158c0.033,0.035,0.074,0.087,0.12,0.158c0.021,0.034,0.046,0.065,0.072,0.096 c0.475,1.08,1.229,1.691,2.102,1.691c0.87,0,1.623-0.609,2.098-1.684c0.027-0.033,0.054-0.067,0.077-0.104 c0.045-0.07,0.086-0.122,0.118-0.157c0.026,0.027,0.06,0.074,0.093,0.122l-3.15,15.17c-0.006,0.03,0.003,0.06,0,0.09 c-0.944,0.133-1.902,0.226-2.883,0.226c-0.981,0-1.938-0.093-2.882-0.226C32.114,48.092,32.124,48.063,32.117,48.032z M39.993,47.71l3.124-15.043c0.096-0.458-0.15-0.893-0.555-1.087c-0.896-1.132-2.356-1.151-3.246-0.013 c-0.146,0.113-0.262,0.267-0.328,0.448c-0.125,0.339-0.257,0.53-0.341,0.622c-0.085-0.091-0.217-0.282-0.342-0.622 c-0.058-0.159-0.162-0.296-0.293-0.404c-0.6-0.795-1.286-0.921-1.659-0.921c-0.369,0-1.048,0.124-1.645,0.902 c-0.13,0.108-0.232,0.25-0.295,0.416c-0.032,0.086-0.067,0.169-0.096,0.229c-0.004,0.008-0.009,0.017-0.013,0.025 c-0.089,0.185-0.173,0.299-0.231,0.362c-0.084-0.091-0.215-0.28-0.339-0.614c-0.062-0.166-0.176-0.309-0.318-0.417 c-0.448-0.585-1.025-0.904-1.646-0.904c-0.365,0-1.033,0.121-1.624,0.877c-0.146,0.113-0.262,0.266-0.328,0.447 c-0.125,0.34-0.258,0.531-0.342,0.623c-0.084-0.091-0.217-0.282-0.342-0.623c-0.145-0.393-0.57-0.655-0.989-0.655 c-0.169,0-0.318,0.052-0.454,0.126c-0.011,0.002-0.021-0.002-0.032,0c-0.541,0.112-0.889,0.642-0.776,1.182l3.124,15.043 C21.103,45.478,14.5,37.445,14.5,27.848c0-11.323,9.178-20.5,20.5-20.5s20.5,9.177,20.5,20.5 C55.5,37.445,48.897,45.478,39.993,47.71z"></path>
          <path d="M32.842,11.742c-0.39,0-0.777,0.016-1.16,0.047c-0.551,0.045-0.96,0.528-0.915,1.079c0.044,0.522,0.48,0.918,0.996,0.918 c0.027,0,0.056-0.001,0.083-0.003c0.328-0.027,0.661-0.041,0.996-0.041c0.553,0,1-0.448,1-1S33.395,11.742,32.842,11.742z"></path>
          <path d="M27.03,13.007c-4.942,2.269-8.136,7.247-8.136,12.683c0,0.552,0.447,1,1,1s1-0.448,1-1c0-4.657,2.736-8.922,6.97-10.866 c0.502-0.23,0.723-0.824,0.492-1.326C28.125,12.997,27.53,12.777,27.03,13.007z"></path>
          <path d="M29.575,54.84c-0.068,0.548,0.32,1.048,0.868,1.116l7.292,0.912c0.042,0.005,0.084,0.008,0.125,0.008 c0.497,0,0.928-0.37,0.991-0.876c0.068-0.548-0.32-1.048-0.868-1.116l-7.292-0.912C30.143,53.908,29.645,54.293,29.575,54.84z"></path>
          <path d="M37.463,58.817l-6.087-0.76c-0.548-0.063-1.047,0.32-1.116,0.868c-0.068,0.548,0.32,1.048,0.868,1.116l6.087,0.76 c0.042,0.005,0.084,0.008,0.125,0.008c0.497,0,0.928-0.37,0.991-0.876C38.399,59.386,38.011,58.886,37.463,58.817z"></path>
        </g>
      </g>
    </svg>
  )
}



export const Logo = () => {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      role="img"
      preserveAspectRatio="xMidYMid meet"
      fill="#000000"
      className="size-12 my-3 ml-5"
    >
      <path d="M28 58c0 2.2 1.8 4 4 4s4-1.8 4-4h-8" fill="#616466" />
      <path
        d="M24.9 48H39c.8-4.3 3.5-8.5 6.3-12.9C48.6 30 52 24.7 52 19.6C52 9.9 43 2 32 2S12 9.9 12 19.6c0 5.1 3.4 10.4 6.6 15.5c2.8 4.4 5.5 8.6 6.3 12.9"
        fill="#ffea00"
      />
      <path
        d="M26.4 33.6c..."
        fill="#c79127"
      />
      <g fill="#94989b">
        <path d="M24.9 50h14.3v1.8H24.9z" />
        <path d="M25.9 53.6h12.3v1.8H25.9z" />
      </g>
      <path fill="#616466" d="M25.9 51.8h12.3v1.8H25.9z" />
      <g fill="#94989b">
        <path d="M39.2 50l-13.3 3.6v1.9l13.3-3.7z" />
        <path d="M26.9 57.3h10.3v1.8H26.9z" />
      </g>
      <path fill="#616466" d="M26.9 55.5h10.3v1.8H26.9z" />
      <path fill="#94989b" d="M38.2 53.6l-11.3 3.7v1.9l11.3-3.7z" />
    </svg>
  );
};

export function SVGAddImage({ color = "#000000", size = 24 }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill={color}
      width={size}
      height={size}
    >
      <rect x="0" fill="none" width="24" height="24" />
      <g>
        <path d="M23 4v2h-3v3h-2V6h-3V4h3V1h2v3h3zm-8.5 7c.828 0 1.5-.672 1.5-1.5S15.328 8 14.5 8 13 8.672 13 9.5s.672 1.5 1.5 1.5zm3.5 3.234l-.513-.57c-.794-.885-2.18-.885-2.976 0l-.655.73L9 9l-3 3.333V6h7V4H6c-1.105 0-2 .895-2 2v12c0 1.105.895 2 2 2h12c1.105 0 2-.895 2-2v-7h-2v3.234z" />
      </g>
    </svg>
  );
}

export const SVGProfile = () => {
  return (
    <svg
      className="w-24 h-24 lg:w-36 lg:h-36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="0.00024"
    >
      <g id="SVGRepo_iconCarrier">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.5 7.063C16.5 10.258 14.57 13 12 13c-2.572 0-4.5-2.742-4.5-5.938C7.5 3.868 9.16 2 12 2s4.5 1.867 4.5 5.063zM4.102 20.142C4.487 20.6 6.145 22 12 22c5.855 0 7.512-1.4 7.898-1.857a.416.416 0 0 0 .09-.317C19.9 18.944 19.106 15 12 15s-7.9 3.944-7.989 4.826a.416.416 0 0 0 .091.317z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};

export const SVGLocker = () => {
  return (
    <svg
      fill="currentColor"
      version="1.1"
      id="Layer_1"
      viewBox="0 0 330 330"
      xmlSpace="preserve"
      className="size-5"
    >
      <g id="XMLID_509_">
        <path
          id="XMLID_510_"
          d="M65,330h200c8.284,0,15-6.716,15-15V145c0-8.284-6.716-15-15-15h-15V85c0-46.869-38.131-85-85-85 
          S80,38.131,80,85v45H65c-8.284,0-15,6.716-15,15v170C50,323.284,56.716,330,65,330z M180,234.986V255c0,8.284-6.716,15-15,15 
          s-15-6.716-15-15v-20.014c-6.068-4.565-10-11.824-10-19.986c0-13.785,11.215-25,25-25s25,11.215,25,25 
          C190,223.162,186.068,230.421,180,234.986z M110,85c0-30.327,24.673-55,55-55s55,24.673,55,55v45H110V85z"
        />
      </g>
    </svg>
  );
};

export const SVGCode = () => {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-9 mt-2 mr-2">
      <path
        d="M7 8L3 11.6923L7 16M17 8L21 11.6923L17 16M14 4L10 20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const SVGClient = () => (
  <svg viewBox="0 0 1024 1024" width={30} fill="currentColor" className="mt-2 mr-3">
    <path d="M512 505.6c-108.8 0-204.8-89.6-204.8-204.8S396.8 102.4 512 102.4c108.8 0 204.8 89.6 204.8 204.8S620.8 505.6 512 505.6zm0-358.4c-83.2 0-153.6 70.4-153.6 153.6s64 153.6 153.6 153.6 153.6-70.4 153.6-153.6S595.2 147.2 512 147.2z"/>
    <path d="M832 864c0-211.2-147.2-377.6-326.4-377.6s-326.4 166.4-326.4 377.6H832z"/>
    <path d="M832 889.6H147.2v-25.6c0-224 160-403.2 352-403.2s352 179.2 352 396.8v25.6l-19.2 6.4zm-633.6-51.2h608C800 659.2 665.6 512 505.6 512c-166.4 0-294.4 147.2-307.2 326.4z"/>
    <path d="M710.4 499.2c-12.8 0-25.6-12.8-25.6-25.6s12.8-25.6 25.6-25.6c64 0 121.6-51.2 121.6-121.6 0-51.2-32-96-83.2-115.2-12.8-6.4-19.2-19.2-12.8-32 6.4-12.8 19.2-19.2 32-12.8 70.4 19.2 115.2 83.2 115.2 160-6.4 96-83.2 172.8-172.8 172.8z"/>
    <path d="M966.4 806.4h-57.6c-12.8 0-25.6-12.8-25.6-25.6s12.8-25.6 25.6-25.6h32c-12.8-140.8-115.2-249.6-236.8-249.6-12.8 0-25.6-12.8-25.6-25.6s12.8-25.6 25.6-25.6c160 0 288 147.2 288 326.4v25.6h-25.6z"/>
    <path d="M300.8 499.2c-6.4 0-6.4 0 0 0-44.8 0-89.6-12.8-121.6-44.8-32-32-44.8-76.8-44.8-121.6 0-70.4 44.8-134.4 115.2-160 12.8-6.4 25.6 0 32 12.8 6.4 12.8 0 25.6-12.8 32-57.6 19.2-89.6 64-89.6 115.2 0 32 12.8 64 32 83.2 19.2 25.6 51.2 32 83.2 38.4 19.2 0 25.6 12.8 25.6 25.6s-6.4 19.2-19.2 19.2z"/>
    <path d="M89.6 806.4H12.8v-25.6c0-179.2 128-320 288-320 12.8 0 25.6 12.8 25.6 25.6s-12.8 25.6-25.6 25.6C179.2 512 76.8 620.8 64 761.6h32c12.8 0 25.6 12.8 25.6 25.6-6.4 6.4-12.8 19.2-32 19.2z"/>
  </svg>
);

export const SVGSingIn = () => {
  return (
    <svg 
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="size-6 mt-2 mr-2"
    >
      <path 
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
      />
    </svg>

  );
};


export const SVGOrder = () => {
  return(
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="size-6 mt-2 mr-2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
    </svg>

  )
}


export const SVGPhone = ({ color = 'white' }) => {
  return (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke={color} className="size-6 inline mr-4 mb-1">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
  </svg>

  )
}



export const BackgroundGrid = ({ boxSize = 60 }) => {
  const containerRef = useRef(null)

  useEffect(() => {
    const lines = containerRef.current?.querySelectorAll('.horizontal-line')
    if (!lines) return

    lines.forEach((line) => {

      gsap.fromTo(
        line,
        { y: 0, },
        {
          y: boxSize,
          duration: 7,
          repeat: -1,
          ease: 'none',
        }
      )
    })
  }, [boxSize])

  return (
    <div
      ref={containerRef}
      className="gradient-top w-screen h-screen bg-[#ECEBE8] overflow-hidden absolute -z-10"
    >
      {/* Vertical lines */}
      {Array.from({ length: 100 }).map((_, i) => (
        <div
          key={`v-${i}`}
          className="absolute top-0 h-full border-r border-[#ECEBE8] -ml-16"
          style={{ left: `${i * boxSize}px` }}
        />
      ))}

      {/* Horizontal lines with GSAP class */}
      {Array.from({ length: 100 }).map((_, i) => (
        <div
          key={`h-${i}`}
          className="horizontal-line absolute left-0 w-full border-t border-[#ECEBE8]"
          style={{ top: `${i * boxSize}px` }}
        />
      ))}
    </div>
  )
}
