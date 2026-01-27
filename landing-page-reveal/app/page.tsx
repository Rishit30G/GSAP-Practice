'use client';

import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';
import gsap from 'gsap';

export default function Home() {
  gsap.registerPlugin(CustomEase, SplitText);

  CustomEase.create('hop', '0.85, 0, 0.15, 1');

  useGSAP(() => {
    const counterProgress = document.querySelector('.counter h1');
    const counter = { value: 0 };

    SplitText.create('.hero-header h1', {
      type: 'words',
      mask: 'words',
      wordsClass: 'word',
    });

    const counterTl = gsap.timeline({ delay: 0.5 });
    const overlayTextTl = gsap.timeline({ delay: 0.75 });
    const revealTl = gsap.timeline({ delay: 0.5 });

    counterTl.to(counter, {
      value: 100,
      duration: 5,
      ease: 'power2.out',
      onUpdate: () => {
        counterProgress.textContent = Math.floor(counter.value).toString();
      },
    });

    overlayTextTl
      .to('.overlay-text', {
        y: '0',
        duration: 0.75,
        ease: 'hop',
      })
      .to('.overlay-text', {
        y: '-2rem',
        duration: 0.75,
        ease: 'hop',
        delay: 0.75,
      })
      .to('.overlay-text', {
        y: '-4rem',
        duration: 0.75,
        ease: 'hop',
        delay: 0.75,
      })
      .to('.overlay-text', {
        y: '-6rem',
        duration: 0.75,
        ease: 'hop',
        delay: 1,
      });

    revealTl
      .to('.img', {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 1,
        ease: 'hop',
      })
      .to('.hero-images', {
        gap: '0.75vw',
        duration: 1,
        delay: 0.5,
        ease: 'hop',
      })
      .to(
        '.img',
        {
          scale: 1,
          duration: 1,
          ease: 'hop',
        },
        '<',
      )
      .to('.img:not(.hero-img)', {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        duration: 1,
        stagger: 0.1,
        ease: 'hop',
      })
      .to('.hero-img', {
        scale: 2,
        duration: 1,
        ease: 'hop',
      })
      .to('.hero-overlay', {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        duration: 1,
        ease: 'hop',
      })
      .to(
        '.hero-header h1 .word',
        {
          y: '0',
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
        },
        '-=0.5',
      )
      .to(
        '.hero-img',
        {
          scale: 1.2,
          translateY: '-25vh',
          // translateX: 'vw',
          duration: 1,
          ease: 'hop',
        },
        '<',
      )
      .to('.hero-img', {
        width: '38vw',
        aspectRatio: '16/9',
        duration: 1,
        ease: 'hop',
      });
  }, []);

  return (
    <>
      <nav>
        <div className="nav-logo">
          <a href="#">James Vandoghlo</a>
        </div>
        <div className="nav-items">
          <a href="#">Runaway</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Biography</a>
        </div>
      </nav>
      <section className="hero">
        <div className="hero-overlay">
          <div className="counter">
            <h1>0</h1>
          </div>
          <div className="overlay-text-container">
            <div className="overlay-text">
              <p>Structure</p>
              <p>Emotion</p>
              <p>Movement</p>
              <p>Light</p>
            </div>
          </div>
        </div>

        <div className="hero-images">
          <div className="img">
            <img src="/img1.jpg" alt="" />
          </div>
          <div className="img">
            <img src="/img2.jpg" alt="" />
          </div>
          <div className="img hero-img">
            <img src="/img3.jpg" alt="" />
          </div>
          <div className="img">
            <img src="/img4.jpg" alt="" />
          </div>
          <div className="img">
            <img src="/img1.jpg" alt="" />
          </div>
        </div>

        <div className="hero-header">
          <h1>James Vandoghlo</h1>
        </div>
      </section>
    </>
  );
}
