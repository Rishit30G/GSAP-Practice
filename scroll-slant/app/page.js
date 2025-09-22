'use client';

import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import gsap from 'gsap';
import Lenis from 'lenis';
import { useEffect } from 'react';

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
    gsap.utils.toArray('.work-item').forEach((item) => {
      const img = item.querySelector('.work-item-img');
      const nameH1 = item.querySelector('.work-item-name h1');

      const split = SplitText.create(nameH1, { type: 'chars', mask: 'chars' });
      gsap.set(split.chars, { y: '125%' });

      split.chars.forEach((char, index) => {
        ScrollTrigger.create({
          trigger: item,
          start: `top+=${index * 25 - 250} top`,
          end: `top+=${index * 25 - 100} top`,
          scrub: true,
          animation: gsap.fromTo(
            char,
            {
              y: '125%',
            },
            {
              y: '0%',
              ease: 'none',
            }
          ),
        });
      });

      ScrollTrigger.create({
        trigger: item,
        start: 'top bottom',
        end: 'top top',
        scrub: 0.5,
        animation: gsap.fromTo(
          img,
          {
            clipPath: 'polygon(25% 25%, 75% 40%, 100% 100%, 0% 100%)',
          },
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            ease: 'none',
          }
        ),
      });

      ScrollTrigger.create({
        trigger: item,
        start: 'bottom bottom',
        end: 'bottom top',
        scrub: 0.5,
        animation: gsap.fromTo(
          img,
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          },
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 75% 60%, 25% 75%)',
            ease: 'none',
          }
        ),
      });
    });
  }, []);

  return (
    <>
      <section class="hero">
        <h1>Beyond the limits</h1>
      </section>
      <section class="work-item">
        <div class="work-item-img">
          <img src="/work_01.jpg" alt="" />
        </div>
        <div class="work-item-name">
          <h1>Water Body</h1>
        </div>
      </section>
      <section class="work-item">
        <div class="work-item-img">
          <img src="/work_02.jpg" alt="" />
        </div>
        <div class="work-item-name">
          <h1>Moon Rise</h1>
        </div>
      </section>
      <section class="work-item">
        <div class="work-item-img">
          <img src="/work_03.jpg" alt="" />
        </div>
        <div class="work-item-name">
          <h1>Flower Field</h1>
        </div>
      </section>
      <section class="work-item">
        <div class="work-item-img">
          <img src="/work_04.jpg" alt="" />
        </div>
        <div class="work-item-name">
          <h1>Earth Rotate</h1>
        </div>
      </section>
      <section class="work-item">
        <div class="work-item-img">
          <img src="/work_05.jpg" alt="" />
        </div>
        <div class="work-item-name">
          <h1>Airplane Fly</h1>
        </div>
      </section>
      <section class="outro">
        <h1>Back to base</h1>
      </section>
    </>
  );
}
