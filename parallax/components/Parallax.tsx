'use client';

import React, { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

interface ParallaxProps {
  title: string;
  subtitle: string;
  url: string;
}

const Parallax = ({ title, subtitle, url }: ParallaxProps) => {
  const container = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  gsap.registerPlugin(useGSAP, ScrollTrigger);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useGSAP(() => {
    gsap.fromTo(
      imageRef.current,
      {
        y: '-25vh',
      },
      {
        y: '25vh',
        scrollTrigger: {
          trigger: container.current,
          scrub: true,
        },
      }
    );
  }, []);
  return (
    <div
      className="relative h-screen w-full overflow-hidden mt-30"
      ref={container}
    >
      <img
        ref={imageRef}
        className="h-full w-full object-cover scale-[1.5]"
        src={url}
        alt={title}
      />
      <div className="absolute inset-0 bg-black/30"></div>
      <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col w-fit mx-auto">
        <span className="text-[10vw] tracking-tight font-mono translate-x-[10%] ">
          {title}
        </span>
        <span className="text-[5vw] self-end font-light translate-[10%]">
          {subtitle}
        </span>
      </h1>
    </div>
  );
};

export default Parallax;
