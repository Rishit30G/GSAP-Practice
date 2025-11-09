'use client';

import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';
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

  gsap.registerPlugin(Flip, SplitText, CustomEase);

  useGSAP(() => {

    CustomEase.create(
      "hop",
      "M0,0 C0.355,0.022 0.448,0.079 0.5,0.5 0.542,0.846 0.615,1 1,1"
    );

    CustomEase.create(
      "hop2",
      "M0,0 C0.078,0.617 0.114,0.716 0.255,0.828 0.373,0.922 0.561,1 1,1"
    );

    const splitH2 = SplitText.create(".site-info h2", {
      types: "lines",
    }); 


    splitH2.lines.forEach((line) => {
      const text = line.textContent; 
      const wrapper = document.createElement("div"); 
      wrapper.className = "line";
      const span = document.createElement("span");
      span.textContent = text;
      wrapper.appendChild(span);
      line.parentNode.replaceChild(wrapper, line);
    }); 

    const mainTl = gsap.timeline(); 

    const revealerTl = gsap.timeline(); 

    const scaleTl = gsap.timeline(); 

    revealerTl.to(".r-1", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)", 
      duration: 1.5, 
      ease: "hop",
    }).to(".r-2", {
      clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", 
      duration: 1.5, 
      ease: "hop",
    }, "<");

    scaleTl.to(".img:first-child", {
      scale: 1, 
      duration: 2, 
      ease: "power4.inOut",
    }); 

    const images = document.querySelectorAll(".img:not(:first-child)"); 

    images.forEach((img) => {
      scaleTl.to(img, {
        opacity: 1, 
        scale: 1, 
        duration: 1.25, 
        ease: "power3.out"
      }, ">-0.5")
    });

    mainTl.add(revealerTl).add(scaleTl, "-=1.25").add(() => {
      document.querySelectorAll(".img:not(.main)").forEach((img) => img.remove());
      const state = Flip.getState(".main"); 
      const imagesContainer = document.querySelector(".images");
      imagesContainer.classList.add("stacked-container"); 
      document.querySelectorAll('.main').forEach((img, i) => {
        img.classList.add("stacked");
        img.style.order = i;
        gsap.set(".img.stacked", {
          clearProps: "transform, top, left",
        });
      }); 

      return Flip.from(state, {
        duration: 2, 
        ease: "hop", 
        absolute: true, 
        stagger: {
          amount: -0.3,
        },
      });

     }).to(".word h1, .nav-item p, .line p, .site-info h2, .line span", {
      y: 0, 
      duration: 3, 
      ease: "hop2", 
      stagger: 0.1, 
      delay: 1.25,
     }).to(".cover-img", {
      clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)", 
      duration: 2, 
      ease: "hop",
      delay: -4.75,
     });

  }, []);


  return (
    <>
      <div className="container">
        <div className="revealers">
          <div className="revealer r-1"></div>
          <div className="revealer r-2"></div>
        </div>
        <div className="images">
          <div className="img">
            <img src="/img1.jpg" alt=""></img>
          </div>
          <div className="img main">
            <img src="/img2.jpg" alt=""></img>
          </div>
          <div className="img main">
            <img src="/img3.jpg" alt=""></img>
          </div>
          <div className="img main">
            <img src="/img4.jpg" alt=""></img>
          </div>
        </div>

          <div className="hero-content">
            <div className="site-logo">
              <div className="word">
                <h1>Arc</h1>
              </div>
              <div className="word">
                <h1>
                  Worldwide <sup>&copy;</sup>
                </h1>
              </div>
            </div>

          <div className="nav">
            <div className="nav-item">
              <p>About</p>
            </div>
            <div className="nav-item">
              <p>Work</p>
            </div>
            <div className="nav-item">
              <p>Journal</p>
            </div>
            <div className="nav-item">
              <p>Contact</p>
            </div>
          </div>

          <div className="cover-img">
            <img src="/img1.jpg" alt="" />
          </div>

          <div className="site-info">
            <div className="row">
              <div className="col">
                <div className="line">
                  <p>Featured Works</p>
                </div>
              </div>
              <div className="col">
                <h2>
                  Arc is a contemporary fashion brand redifining elegance with
                  timeless design.
                </h2>
              </div>
            </div>
            <div className="row">
              <div className="col"></div>
              <div className="col">
                <div className="address">
                  <div className="line">
                    <p>Arc studio</p>
                  </div>
                  <div className="line">
                    <p>RiverStone Building</p>
                  </div>
                  <div className="line">
                    <p>-28 Orchard Lane</p>
                  </div>
                  <div className="line">
                    <p>N1 4DX</p>
                  </div>
                </div>
                <div className="socials">
                  <div className="line">
                    <p>SayHi@Arc.com</p>
                  </div>
                  <br />
                  <div className="line">
                    <p>Instagram</p>
                  </div>
                  <div className="line">
                    <p>LinkedIn</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
      </div>
    </>
  );
}
