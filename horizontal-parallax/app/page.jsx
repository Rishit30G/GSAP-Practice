'use client';

import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    const stickySection = document.querySelector('.sticky');
    const slidesContainer = document.querySelector('.slides');
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');

    const stickyHeight = window.innerHeight * 6;
    const totalMove = slidesContainer.offsetWidth - slider.offsetWidth;
    const slideWidth = slider.offsetWidth;

    slides.forEach((slide) => {
      const title = slide.querySelector('.title h1');
      gsap.set(title, { y: -200 });
    });

    let currentVisibleIndex = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const currentIndex = Array.from(slides).indexOf(entry.target);

          const title = Array.from(slides).map((slide) =>
            slide.querySelector('.title h1')
          );
          if (entry.intersectionRatio >= 0.25) {
            currentVisibleIndex = currentIndex;
            title.forEach((t, index) => {
              gsap.to(t, {
                y: index === currentVisibleIndex ? 0 : -200,
                duration: 0.5,
                ease: 'power2.out',
              });
            });
          }
        });
      },
      {
        root: slider,
        threshold: [0, 0.25],
      }
    );

    slides.forEach((slide) => observer.observe(slide));

    ScrollTrigger.create({
      trigger: stickySection,
      start: 'top top',
      end: `+=${stickyHeight}px`,
      scrub: 1,
      pin: true,
      pinSpacing: true,
      onUpdate: (self) => {
        const progress = self.progress;

        const mainMover = progress * totalMove;

        gsap.set(slidesContainer, {
          x: -mainMover,
        });

        const currentSlide = Math.floor(mainMover / slideWidth);
        const sliderProgress = (mainMover % slideWidth) / slideWidth;

        slides.forEach((slide, index) => {
          const image = slide.querySelector('img');
            if (index === currentSlide || index === currentSlide + 1) {
              const relativeProgress =
                index === currentSlide ? sliderProgress : sliderProgress - 1;
              const parallaxAmount = relativeProgress * slideWidth * 0.25;
              gsap.set(image, {
                x: parallaxAmount,
                scale: 1.5,
              });
          }
        });
      },
    });
  }, []);

  return (
    <>
      <section className="sticky">
        <div className="slider">
          <div className="slides">
            <div className="slide">
              <div className="img">
                <img src="/img1.jpg" alt="" />
              </div>
              <div className="title">
                <h1>
                  Title Line 1 <br />
                  Title Line 2
                </h1>
              </div>
            </div>
            <div className="slide">
              <div className="img">
                <img src="/img2.jpg" alt="" />
              </div>
              <div className="title">
                <h1>
                  Title Line 1 <br />
                  Title Line 2
                </h1>
              </div>
            </div>
            <div className="slide">
              <div className="img">
                <img src="/img1.jpg" alt="" />
              </div>
              <div className="title">
                <h1>
                  Title Line 1 <br />
                  Title Line 2
                </h1>
              </div>
            </div>
            <div className="slide">
              <div className="img">
                <img src="/img4.jpg" alt="" />
              </div>
              <div className="title">
                <h1>
                  Title Line 1 <br />
                  Title Line 2
                </h1>
              </div>
            </div>
            <div className="slide">
              <div className="img">
                <img src="/img5.jpg" alt="" />
              </div>
              <div className="title">
                <h1>
                  Title Line 1 <br />
                  Title Line 2
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="outro">
        <h1>Shaping Timeless spaces with vision</h1>
      </section>
    </>
  );
}
