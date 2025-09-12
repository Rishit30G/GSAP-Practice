'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';
import './App.css';

function App() {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const initTextSplit = () => {
      const textElements = document.querySelectorAll('.col-3 h1, .col-3 p');
      textElements.forEach((element) => {
        const split = new SplitText(element, {
          type: 'lines',
          linesClass: 'line',
        });
        split.lines.forEach(
          (line) => (line.innerHTML = `<span>${line.textContent}</span>`)
        );
      });
    };

    initTextSplit();

    gsap.set('.col-3 .col-content-wrapper .line span', { y: '0%' });
    gsap.set('.col-3 .col-content-wrapper-2 .line span', { y: '-125%' });

    let currentPhase = 0;

    ScrollTrigger.create({
      trigger: ".sticky-cols",
      start: 'top top',
      end: `+=${window.innerHeight * 5}px`,
      pin: true,
      pinSpacing: true,
      onUpdate: (self) => {
        const progress = self.progress;
        if (progress >= 0.25 && currentPhase === 0) {
          currentPhase = 1;
          gsap.to('.col-1', { opacity: 0, scale: 0.75, duration: 0.75 });
          gsap.to('.col-2', { x: '0%', duration: 0.75 });
          gsap.to('.col-3', { y: '0%', duration: 0.75 });
          gsap.to('.col-img-1 img', { scale: 1.25, duration: 0.75 });
          gsap.to('.col-img-2', {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            duration: 0.75,
          });
          gsap.to('.col-img-2 img', { scale: 1, duration: 0.75 });
        }

        if (progress >= 0.5 && currentPhase === 1) {
          currentPhase = 2;

          gsap.to('.col-2', { opacity: 0, scale: 0.75, duration: 0.75 });
          gsap.to('.col-3', { x: '0%', duration: 0.75 });
          gsap.to('.col-4', { y: '0%', duration: 0.75 });

          gsap.to('.col-3 .col-content-wrapper .line span', {
            y: '-125%',
            duration: 0.75,
          });

          gsap.to('.col-3 .col-content-wrapper-2 .line span', {
            y: '0%',
            duration: 0.75,
            delay: 0.5,
          });
        }

        if (progress < 0.25 && currentPhase >= 1) {
          currentPhase = 0;

          gsap.to('.col-1', { opacity: 1, scale: 1, duration: 0.75 });

          gsap.to('.col-2', { x: '100%', duration: 0.75 });
          gsap.to('.col-3', { x: '100%', y: '100%', duration: 0.75 });

          gsap.to('.col-img-1 img', { scale: 1, duration: 0.75 });
          gsap.to('.col-img-2', {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
            duration: 0.75,
          });
          gsap.to('.col-img-2 img', { scale: 1.25, duration: 0.75 });
        }

        if (progress < 0.5 && currentPhase === 2) {
          currentPhase = 1;

          gsap.to('.col-2', { opacity: 1, scale: 1, duration: 0.75 });
          gsap.to('.col-3', { x: '100%', duration: 0.75 });
          gsap.to('.col-4', { y: '100%', duration: 0.75 });

          gsap.to('.col-3 .col-content-wrapper .line span', {
            y: '0%',
            duration: 0.75,
            delay: 0.5,
          });

          gsap.to('.col-3 .col-content-wrapper-2 .line span', {
            y: '-125%',
            duration: 0.75,
          });
        }
      },
    });
  }, []);

  return (
    <>
      <section className="intro">
        <h1>We create modern interiors that feel effortlessly personal.</h1>
      </section>
      <section className="sticky-cols">
        <div className="sticky-cols-wrapper">
          <div className="col col-1">
            <div className="col-content">
              <div className="col-content-wrapper">
                <h1>
                  We design beautiful, functional spaces for living and working,
                  tailored to your unique needs and style.
                </h1>
                <p>
                  Our team of experienced designers will work closely with you
                  to create a space that reflects your personality and enhances
                  your lifestyle.
                </p>
              </div>
            </div>
          </div>
          <div className="col col-2">
            <div className="col-img col-img-1">
              <div className="col-img-wrapper">
                <img src="/img_01.jpg" alt="sun" />
              </div>
            </div>
            <div className="col-img col-img-2">
              <div className="col-img-wrapper">
                <img src="/img_02.jpg" alt="moon" />
              </div>
            </div>
          </div>
          <div className="col col-3">
            <div className="col-content-wrapper">
              <h1>Our Interiors are crafted to inspire and delight.</h1>
              <p>
                Each space is designed with meticulous attention to detail,
                ensuring harmonious blend of aesthetics and functionality.
              </p>
            </div>
            <div className="col-content-wrapper-2">
              <h1>We believe in the power of design to transform lives.</h1>
              <p>
                Our mission is to create spaces that not only look beautiful but
                also enhance your well-being and productivity.
              </p>
            </div>
          </div>
          <div className="col col-4">
            <div className="col-img">
              <div className="col-img-wrapper">
                <img src="/img_03.jpg" alt="tree" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="outro">
        <h1>Timeless desgin begins with a conversation.</h1>
      </section>
    </>
  );
}

export default App;
