'use client';

import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import { Flip } from 'gsap/Flip';
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

  gsap.registerPlugin(Flip, SplitText);

  useGSAP(() => {
    const setupTextSplitting = () => {
      const textElements = document.querySelectorAll('h1, h2, h3, p, a');
      textElements.forEach((el) => {
        new SplitText(el, {
          type: 'lines',
          linesClass: 'line',
          mask: 'lines',
        });
      });

      gsap.set('.line', { yPercent: 125 });
    };

    const createCounterDigits = () => {
      const counter1 = document.querySelector('.counter-1');
      const num0 = document.createElement('div');
      num0.className = 'num';
      num0.textContent = '0';
      counter1.appendChild(num0);

      const num1 = document.createElement('div');
      num1.className = 'num';
      num1.textContent = '1';
      counter1.appendChild(num1);

      const counter2 = document.querySelector('.counter-2');
      for (let i = 0; i <= 10; i++) {
        const numDiv = document.createElement('div');
        numDiv.className = i === 1 ? 'num num1offset2' : 'num';
        numDiv.textContent = i === 10 ? '0' : i;
        counter2.appendChild(numDiv);
      }

      const counter3 = document.querySelector('.counter-3');
      for (let i = 0; i < 30; i++) {
        const numDiv = document.createElement('div');
        numDiv.className = 'num';
        numDiv.textContent = i % 10;
        counter3.appendChild(numDiv);
      }

      const finalNum = document.createElement('div');
      finalNum.className = 'num';
      finalNum.textContent = '0';
      counter3.appendChild(finalNum);
    };

    const animateCounter = (counter, duration, delay = 0) => {
      const numHeight = counter.querySelector('.num').clientHeight;
      const totalDistance =
        (counter.querySelectorAll('.num').length - 1) * numHeight;

      gsap.to(counter, {
        y: -totalDistance,
        duration: duration,
        ease: 'power2.inOut',
        delay: delay,
      });
    };

    function animateImages() {
      const images = document.querySelectorAll('.img');

      images.forEach((img) => {
        img.classList.remove('animate-out');
      });

      const state = Flip.getState(images);

      images.forEach((img) => img.classList.add('animate-out'));

      const mainTimeline = gsap.timeline();

      mainTimeline.add(
        Flip.from(state, {
          duration: 1.5,
          stagger: 0.1,
          ease: 'power3.inOut',
        })
      );

      images.forEach((img, index) => {
        const scaleTimeline = gsap.timeline();

        scaleTimeline
          .to(
            img,
            {
              scale: 2.5,
              duration: 0.45,
              ease: 'power3.in',
            },
            0.025
          )
          .to(
            img,
            {
              scale: 1,
              duration: 0.45,
              ease: 'power3.out',
            },
            0.5
          );
        mainTimeline.add(scaleTimeline, index * 0.1);
      });
      return mainTimeline;
    }

    setupTextSplitting();
    createCounterDigits();

    animateCounter(document.querySelector('.counter-1'), 2.5);
    animateCounter(document.querySelector('.counter-2'), 3);
    animateCounter(document.querySelector('.counter-3'), 2, 1.5);

    const tl = gsap.timeline();

    gsap.set('.img', { scale: 0 });

    tl.to('.hero-bg', {
      scaleY: '100%',
      duration: 3,
      ease: 'power2.inOut',
      delay: 0.25,
    });

    tl.to(
      '.img',
      {
        scale: 1,
        duration: 1,
        stagger: 0.125,
        ease: 'power3.out',
      },
      '<'
    );

    tl.to('.counter', {
      opacity: 0,
      duration: 0.3,
      ease: 'power3.out',
      delay: 0.3,
      onComplete: () => {
        animateImages();
      },
    });

    tl.to('.sidebar .divider', {
      scaleY: '100%',
      duration: 1,
      ease: 'power3.inOut',
      delay: 1.25,
    });

    tl.to(
      ['nav .divider', '.site-info .divider'],
      {
        scaleX: '100%',
        duration: 1,
        stagger: 0.5,
        ease: 'power3.inOut',
      },
      '<'
    );

    tl.to(
      '.logo',
      {
        scale: 1,
        duration: 1,
        ease: 'power4.inOut',
      },
      '<'
    );

    tl.to(
      '.line',
      {
        yPercent: 0,
        duration: 1,
        stagger: 0.3,
        ease: 'power4.out',
        delay: 0.5,
      },
      '<'
    );
  }, []);

  return (
    <section className="hero">
      <div className="hero-bg"></div>
      <div className="counter">
        <div className="counter-1 digit"></div>
        <div className="counter-2 digit"></div>
        <div className="counter-3 digit"></div>
      </div>

      <div className="images-container">
        <div className="img">
          <img src="/img1.jpg" alt=""></img>
        </div>
        <div className="img">
          <img src="/img2.jpg" alt=""></img>
        </div>
        <div className="img">
          <img src="/img3.jpg" alt=""></img>
        </div>
        <div className="img">
          <img src="/img4.jpg" alt=""></img>
        </div>
        <div className="img">
          <img src="/img5.jpg" alt=""></img>
        </div>
        <div className="img">
          <img src="/img6.jpg" alt=""></img>
        </div>
        <div className="img">
          <img src="/img7.jpg" alt=""></img>
        </div>
      </div>

      <nav>
        <div className="logo-name">
          <a href="#">Omno</a>
        </div>

        <div className="nav-items">
          <div className="links">
            <a href="#">Portfolio</a>
            <p>/</p>
            <a href="#">About</a>
          </div>
          <div className="cta">
            <a href="#">Contact Us</a>
          </div>
        </div>

        <div className="divider"></div>
      </nav>

      <div className="sidebar">
        <div className="logo">
          <img src="img1.jpg" alt="" />
        </div>
        <div className="divider"></div>
      </div>

      <div className="header">
        <h1>Visual engineering for modern brands</h1>
      </div>

      <div className="site-info">
        <h2>A design team focused on brands websites, apps and products</h2>

        <div className="divider"></div>

        <div className="site-info-copy">
          <p>Award-winning creative studio</p>
          <p>Operating since 2019</p>
        </div>
      </div>

      <div className="hero-footer">
        <h2>Watch showreel</h2>
      </div>
    </section>
  );
}
