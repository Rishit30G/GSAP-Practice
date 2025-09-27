'use client';

import Image from 'next/image';
import { ScrollTrigger } from "gsap/ScrollTrigger"; 
import Lenis from "lenis"; 
import { useEffect } from "react";
import { useGSAP } from '@gsap/react';
import { gsap } from "gsap";


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

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    const texts = document.querySelectorAll('.animate-text').forEach((text) => {
      text.setAttribute('data-text', text.textContent.trim());

      ScrollTrigger.create({
        trigger: text, 
        start: "top 50%", 
        end: "bottom 50%", 
        scrub: 1, 
        onUpdate: (self) => {
          const clipValue = Math.max(0, 100 - self.progress * 100); 
          text.style.setProperty("--clip-value", `${clipValue}%`);
        }
      })
    }); 

    ScrollTrigger.create({
      trigger: ".services", 
      start: "top bottom", 
      end: "top top", 
      scrub: 1, 
      onUpdate: (self) => {
        const headers = document.querySelectorAll('.services-header'); 
        gsap.set(headers[0], { x: `${100 - self.progress * 100}%`}); 
        gsap.set(headers[1], { x: `${-100 + self.progress * 100}%`});
        gsap.set(headers[2], { x: `${100 - self.progress * 100}%`});
      },
    });

    ScrollTrigger.create({
      trigger: ".services", 
      start: "top top", 
      end: `+=${window.innerHeight * 2}`,
      pin: true, 
      scrub: 1, 
      pinSpacing: false, 
      onUpdate: (self) => {
        const headers = document.querySelectorAll('.services-header'); 

        if(self.progress <= 0.5){
          const yProgress = self.progress / 0.5; 
          gsap.set(headers[0], { y: `${100 * yProgress}%`});
          gsap.set(headers[2], { y: `${-100 * yProgress}%`});
        }else{
          gsap.set(headers[0], { y: `100%`});
          gsap.set(headers[2], { y: `-100%`});

          const scaleProgress = (self.progress - 0.5) / 0.5; 
          const minScale = window.innerWidth <= 1000 ? 0.3 : 0.1; 
          const scale = 1 - scaleProgress * ( 1 - minScale); 

          headers.forEach((headers) => gsap.set(headers, { scale })); 

        }
      }
    })

  }, []);


  return (
    <>
      <section class="hero">
        <img class="hero-img" src="work_01.jpg" />
      </section>
      <section class="about">
        <h1 className="animate-text">
          A space for work shaped with clarity and intention. Each project
          follows a simple path from thought to form, from form to function.
        </h1>
      </section>

      <section class="services">
        <div className="services-header">
          <img src="/W.png" />
        </div>
        <div className="services-header">
          <img src="/W.png" />
        </div>
        <div className="services-header">
          <img src="/W.png" />
        </div>
      </section>

      <section class="services-copy">
        <h1 class="animate-text">
          We design and build digital products, brands, and experiences. This
          includes UI/UX design, front-end development, and branding.
        </h1>
      </section>

      <section class="outro">
        <img class="outro-img" src="work_01.jpg" />
      </section>
    </>
  );
}
