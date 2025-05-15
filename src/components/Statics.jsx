'use client';
import React from 'react';

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


export const SVGPhone = () => {
  return (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6 inline mr-4 mb-1">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
  </svg>

  )
}