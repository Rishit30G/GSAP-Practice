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

  const slides = [
    {
      title:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, ut?',
      image: '/slider_img_1.jpg',
    },
    {
      title:
        'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: '/slider_img_2.jpg',
    },
    {
      title:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      image: '/slider_img_3.jpg',
    },
    {
      title:
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      image: '/slider_img_4.jpg',
    },
  ];

  gsap.registerPlugin(ScrollTrigger, SplitText);

  useGSAP(() => {
    const pinDistance = window.innerHeight * slides.length;
    const progressBar = document.querySelector('.slider-progress');
    const sliderImages = document.querySelector('.slider-images');
    const sliderTitle = document.querySelector('.slider-title');
    const sliderIndices = document.querySelector('.slider-indices');

    let activeSlide = 0;
    let currentSplit = null;

    function createIndices() {
      sliderIndices.innerHTML = '';

      slides.forEach((_, index) => {
        const indexNum = (index + 1).toString().padStart(2, '0');
        const indicatorElement = document.createElement('p');
        indicatorElement.dataset.index = index;
        indicatorElement.innerHTML = `<span class="marker"></span><span class="index">${indexNum}</span>`;
        sliderIndices?.appendChild(indicatorElement);

        if (index === 0) {
          gsap.set(indicatorElement.querySelector('.index'), {
            opacity: 1,
          });
          gsap.set(indicatorElement.querySelector('.marker'), {
            scaleX: 1,
          });
        } else {
          gsap.set(indicatorElement.querySelector('.index'), {
            opacity: 0.5,
          });
          gsap.set(indicatorElement.querySelector('.marker'), {
            scaleX: 0,
          });
        }
      });
    }

    function animateNewSlide(index) {
      const newSliderImage = document.createElement('img');
      newSliderImage.src = slides[index].image;
      newSliderImage.alt = `Slide ${index + 1}`;

      gsap.set(newSliderImage, {
        opacity: 0,
        scale: 1.1,
      });

      sliderImages.appendChild(newSliderImage);

      gsap.to(newSliderImage, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
      });

      gsap.to(newSliderImage, {
        scale: 1,
        duration: 1,
        ease: 'power2.out',
      });

      const allImages = sliderImages.querySelectorAll('img');
      if (allImages.length > 3) {
        const removeCount = allImages.length - 3;
        for (let i = 0; i < removeCount; i++) {
          sliderImages.removeChild(allImages[i]);
        }
      }

      animateNewTitle(index);
      animateIndicator(index);
    }

    function animateIndicator(index) {
      const indicators = sliderIndices.querySelectorAll('p');

      indicators.forEach((indicators, i) => {
        const markerElement = indicators.querySelector('.marker');
        const indexElement = indicators.querySelector('.index');

        if (i === index) {
          gsap.to(indexElement, {
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out',
          });

          gsap.to(markerElement, {
            scaleX: 1,
            duration: 0.3,
            ease: 'power2.out',
          });
        } else {
          gsap.to(indexElement, {
            opacity: 0.5,
            duration: 0.3,
            ease: 'power2.out',
          });

          gsap.to(markerElement, {
            scaleX: 0,
            duration: 0.3,
            ease: 'power2.out',
          });
        }
      });
    }

    function animateNewTitle(index) {
      if (currentSplit) {
        currentSplit.revert();
      }

      sliderTitle.innerHTML = `<h1>${slides[index].title}</h1>`;

      currentSplit = new SplitText(sliderTitle.querySelector('h1'), {
        type: 'lines',
        linesClass: 'line',
        mask: 'lines',
      });

      gsap.set(currentSplit.lines, {
        yPercent: 100,
        opacity: 0,
      });

      gsap.to(currentSplit.lines, {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }

    createIndices();

    ScrollTrigger.create({
      trigger: '.slider',
      start: 'top top',
      end: `+=${pinDistance}`,
      scrub: 1,
      pin: true,
      pinSpacing: true,
      onUpdate: (self) => {
        gsap.set(progressBar, {
          scaleY: self.progress,
        });

        const currentSlide = Math.floor(self.progress * slides.length);

        if (activeSlide !== currentSlide && currentSlide < slides.length) {
          activeSlide = currentSlide;
          animateNewSlide(activeSlide);
        }
      },
    });
  }, []);

  return (
    <>
      <nav>
        <div className="logo">
          <p>Codegrid / Experiment 501</p>
        </div>
        <div className="site-info">
          <p>[ Scroll Motion Slider ]</p>
        </div>
      </nav>

      <section className="intro">
        <h1>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. At,
          corporis!
        </h1>
      </section>

      <section className="slider">
        <div className="slider-images">
          <img src="/slider_img_1.jpg" alt="slide 1"></img>
        </div>
        <div className="slider-title">
          <h1>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem
            eius commodi rerum! Aliquid quaerat ipsum quam ut id, neque
            laboriosam.
          </h1>
        </div>
        <div className="slider-indicator">
          <div className="slider-indices"></div>
          <div className="slider-progress-bar">
            <div className="slider-progress"></div>
          </div>
        </div>
      </section>

      <section className="outro">
        <h1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et ipsam
          perspiciatis omnis voluptas reprehenderit doloremque necessitatibus,
          ea suscipit itaque ducimus!
        </h1>
      </section>
    </>
  );
}
