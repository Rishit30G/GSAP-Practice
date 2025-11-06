'use client';

import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import gsap from 'gsap';
import Lenis from 'lenis';
import { useEffect } from 'react';
import Image from 'next/image';
import TrailContainer from './_components/TrailContainer';

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

  useGSAP(() => {}, []);

  return (
    <>
      <section className="hero">
        <div className="hero-img">
          <img src="/image.png" alt="" />
        </div>
        <p>[The Future Moves in Frames]</p>
        <p>Experiment by Rishit</p>
        <TrailContainer/>
      </section>
    </>
  );
}
