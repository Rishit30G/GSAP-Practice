'use client';

import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import gsap from 'gsap';
import Lenis from 'lenis';
import { useEffect } from 'react';
import Image from 'next/image';

export default function Home() {

   useEffect(() => {
      // Initialize Lenis
      const lenis = new Lenis({
        duration: 2.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
  
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
  
      requestAnimationFrame(raf);
  
      return () => {
        lenis.destroy();
      };
    }, []);
  
    gsap.registerPlugin(ScrollTrigger, SplitText);

    useGSAP(() => {
        gsap.to("#img img", {
            y: 150, 
            scrollTrigger: {
                trigger: "#img",
                start: "top bottom",
                end: "bottom top", 
                scrub: true,
            }
        });
    }, []);

  return (
    <>
      <section className='min-h-screen bg-black flex items-center justify-center'>
        <h1 className='text-7xl text-center text-white font-extrabold font-stretch-ultra-condensed'>The future is here</h1>
      </section>
      <section className='min-h-screen bg-white flex items-center justify-center'>
        <div className='w-150 h-150 overflow-hidden' id="img">
          <img src="img4.jpg" alt="Image 4" className='object-cover w-full  h-full scale-150'/>
        </div>
      </section>
      <section className='min-h-screen bg-black flex items-center justify-center'>
        <h1 className='text-7xl text-center text-white font-stretch-ultra-condensed font-bold'>It's the end</h1>
      </section>
    </>
  );
}
