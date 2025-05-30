'use client'
import Lenis from 'lenis';
import { useEffect } from 'react';

export default function Overlay({children}) {

  useEffect(() => {
    const lenis = new Lenis();
    let rafId

    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);


    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  });

  return (
    children
  )
}
