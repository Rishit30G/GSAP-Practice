'use client';

import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';


export default function Home() {
  gsap.registerPlugin(SplitText, ScrollTrigger);
  useGSAP(() => {
    const windowWidth = window.innerWidth; 
    const wrapperWidth = 180; 
    const finalPosition = windowWidth - wrapperWidth; 
    const stepDistance = finalPosition / 6; 
    const tl = gsap.timeline(); 

    tl.to(".count", {
      x: -900, 
      duration: 0.85, 
      delay: 0.5, 
      ease: "power4.inOut",
    }); 

    for(let i = 1; i <=6; i++){
      const xPosition = -900 + i * 180;
      tl.to(".count", {
        x: xPosition, 
        duration: 0.85, 
        ease: "power4.inOut",
        onStart: () => {
          gsap.to(".count-wrapper", {
            x: stepDistance * i, 
            duration: 0.85, 
            ease: "power4.inOut",
          })
        }
      })
    }

    gsap.set(".revealer svg", {scale: 0}); 

    const delays = [6, 6.5, 7]; 

    document.querySelectorAll('.revealer svg').forEach((el, i) => {
      gsap.to(el, {
        scale: 35, 
        duration: 1.5, 
        ease: "power4.inOut", 
        delay: delays[i],
        onComplete: () => {
          if(i === delays.length - 1){
            document.querySelector('.loader').remove();
          }
        }
      })
    }); 

    gsap.to(".header h1", {
      onStart: () => {
        gsap.to(".toggle-btn", {
          scale: 1, 
          duration: 1, 
          ease: "power4.inOut", 
        }); 
        const split = new SplitText(".line p", {type: "lines", mask: 'lines'});
        gsap.set(".line p", {opacity: 1}); 
        gsap.fromTo(split.lines, 
          {
            yPercent: 100,
          },
          {
            yPercent: 0,
            stagger: 0.2, 
            duration: 1, 
            ease: "power3.out", 
          }
        );

      },
      rotateX: 0, 
      opacity: 1, 
      duration: 2, 
      ease: "power3.out", 
      delay: 8,
    }); 

  }, []);

  return (
    <>
      <div className="loader">
        <div className="count-wrapper">
          <div className="count">
            <div className="digit">
              <h1>9</h1>
            </div>
            <div className="digit">
              <h1>8</h1>
            </div>
            <div className="digit">
              <h1>7</h1>
            </div>
            <div className="digit">
              <h1>4</h1>
            </div>
            <div className="digit">
              <h1>2</h1>
            </div>
            <div className="digit">
              <h1>0</h1>
            </div>
          </div>
        </div>
        <div className="count-wrapper">
          <div className="count">
            <div className="digit">
              <h1>9</h1>
            </div>
            <div className="digit">
              <h1>5</h1>
            </div>
            <div className="digit">
              <h1>9</h1>
            </div>
            <div className="digit">
              <h1>7</h1>
            </div>
            <div className="digit">
              <h1>4</h1>
            </div>
            <div className="digit">
              <h1>0</h1>
            </div>
          </div>
        </div>
        <div className="revealer revealer-1">
          <svg
            width="151"
            height="148"
            viewBox="0 0 151 148"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M75.9817 0 L77.25 34.2209 C78.0259 55.1571 94.8249 71.9475 115.762 72.7127
              L150.982 74 L115.762 75.2873 C94.8249 76.0525 78.0259 92.8429 77.25 113.779
              L75.9817 148 L74.7134 113.779 C73.9375 92.8429 57.1385 76.0525 36.2019 75.2873
              L0.981689 74 L36.2018 72.7127 C57.1384 71.9475 73.9375 55.1571 74.7134 34.2209
              L75.9817 0 Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="revealer revealer-2">
          <svg
            width="151"
            height="148"
            viewBox="0 0 151 148"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M75.9817 0 L77.25 34.2209 C78.0259 55.1571 94.8249 71.9475 115.762 72.7127
              L150.982 74 L115.762 75.2873 C94.8249 76.0525 78.0259 92.8429 77.25 113.779
              L75.9817 148 L74.7134 113.779 C73.9375 92.8429 57.1385 76.0525 36.2019 75.2873
              L0.981689 74 L36.2018 72.7127 C57.1384 71.9475 73.9375 55.1571 74.7134 34.2209
              L75.9817 0 Z"
              fill="#CDFD50"
            />
          </svg>
        </div>
        <div className="revealer revealer-3">
          <svg
            width="151"
            height="148"
            viewBox="0 0 151 148"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M75.9817 0 L77.25 34.2209 C78.0259 55.1571 94.8249 71.9475 115.762 72.7127
              L150.982 74 L115.762 75.2873 C94.8249 76.0525 78.0259 92.8429 77.25 113.779
              L75.9817 148 L74.7134 113.779 C73.9375 92.8429 57.1385 76.0525 36.2019 75.2873
              L0.981689 74 L36.2018 72.7127 C57.1384 71.9475 73.9375 55.1571 74.7134 34.2209
              L75.9817 0 Z"
              fill="black"
            />
          </svg>
        </div>
      </div>
      <div className="container">
        <div className="site-info">
          <div className='line'><p>Digital & Brand Design</p></div>
          <div className='line'><p>Photography & Film Production</p></div>
        </div>
          <div className="toggle-btn">
            <img src="/img1.jpg" alt="" />
          </div>
          <div className='header'>
            <h1>HauteMuse</h1>
          </div>
      </div>
    </>
  );
}
