'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function NavigationBar() {
  const containerRef = useRef(null);
  const brandName = "LIGHT UP.. 💡  PROVIDE THE NEEDS";
  const duplicates = 20; // Number of times to repeat the brand name

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({ repeat: -1 });

    tl.to(".scrolling-content", {
      x: "-5000%",
      duration: 700,
      ease: "linear",
      onComplete: () => {
        gsap.set(".scrolling-content", { x: "0%" });
      }
    });

    return () => {
      tl.kill();
    };
  }, []);

  const brandNameElements = Array(duplicates).fill(brandName).map((name, index) => (
    <span key={index} className="mx-8 font-bold text-lg uppercase">
      {name}
    </span>
  ));

  return (
    <div className="w-full bg-transparent text-white overflow-hidden py-3 fixed top-0 z-30" ref={containerRef}>
      <div className="scrolling-content flex whitespace-nowrap">
        {brandNameElements}
        {brandNameElements}
      </div>
    </div>
  );
}
