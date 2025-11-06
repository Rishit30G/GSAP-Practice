'use client';

import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import gsap from 'gsap';
import Lenis from 'lenis';
import { useEffect } from 'react';
import Image from 'next/image';

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
    initSpotlightAnimation();
    window.addEventListener('resize', initSpotlightAnimation);

    function initSpotlightAnimation() {
      const images = document.querySelectorAll('.img');
      const coverImg = document.querySelector('.spotlight-cover-img');
      const introHeader = document.querySelector('.spotlight-intro-header h1');
      const outroHeader = document.querySelector('.spotlight-outro-header h1');

      let introHeaderSplit = null;
      let outroHeaderSplit = null;

      introHeaderSplit = SplitText.create(introHeader, { type: 'words' });
      gsap.set(introHeaderSplit.words, { opacity: 1 });

      outroHeaderSplit = SplitText.create(outroHeader, { type: 'words' });
      gsap.set(outroHeaderSplit.words, { opacity: 0 });

      const scatterDirections = [
        { x: 1.3, y: 0.7 },
        { x: -1.5, y: 1.0 },
        { x: 1.1, y: -1.3 },
        { x: -1.7, y: -0.8 },
        { x: 0.8, y: 1.5 },
        { x: -1.0, y: -1.4 },
        { x: 1.6, y: 0.3 },
        { x: -0.7, y: 1.7 },
        { x: 1.2, y: -1.6 },
        { x: -1.4, y: 0.9 },
        { x: 1.8, y: -0.5 },
        { x: -1.1, y: -1.8 },
        { x: 0.9, y: 1.8 },
        { x: -1.9, y: 0.4 },
        { x: 1.0, y: -1.9 },
        { x: -0.8, y: 1.9 },
        { x: 1.7, y: -1.0 },
        { x: -1.3, y: -1.2 },
        { x: 0.7, y: 2.0 },
        { x: 1.25, y: -0.2 },
      ];

      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const isMobile = screenWidth < 1000;

      const scatterMultiplier = isMobile ? 0.5 : 1.5;

      const startPosition = Array.from(images).map(() => ({
        x: 0,
        y: 0,
        z: -1000,
        scale: 0,
      }));

      const endPosition = scatterDirections.map((dir) => ({
        x: dir.x * screenWidth * scatterMultiplier,
        y: dir.y * screenHeight * scatterMultiplier,
        z: 2000,
        scale: 2,
      }));

      images.forEach((img, index) => {
        gsap.set(img, startPosition[index]);
      });

      gsap.set(coverImg, {
        z: -1000,
        scale: 0,
        x: 0,
        y: 0,
      });

      ScrollTrigger.create({
        trigger: '.spotlight',
        start: 'top top',
        end: `+=${window.innerHeight * 15}px`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          images.forEach((img, index) => {
            const staggerDelay = index * 0.03;
            const scaleMultiplier = isMobile ? 4 : 2;
            let imageProgress = Math.max(0, (progress - staggerDelay) * 4);

            const start = startPosition[index];
            const end = endPosition[index];

            const zValue = gsap.utils.interpolate(
              start.z,
              end.z,
              imageProgress
            );

            const scaleValue = gsap.utils.interpolate(
              start.scale,
              end.scale,
              imageProgress * scaleMultiplier
            );

            const xValue = gsap.utils.interpolate(
              start.x,
              end.x,
              imageProgress
            );

            const yValue = gsap.utils.interpolate(
              start.y,
              end.y,
              imageProgress
            );

            gsap.set(img, {
              x: xValue,
              y: yValue,
              z: zValue,
              scale: scaleValue,
            });

            const coverProgress = Math.max(0, (progress - 0.7) * 4);
            const coverZValue = -1000 + 1000 * coverProgress;
            const coverScaleValue = Math.min(1, coverProgress * 2);

            gsap.set(coverImg, {
              z: coverZValue,
              scale: coverScaleValue,
              x: 0,
              y: 0,
            });

            if (introHeaderSplit && introHeaderSplit.words.length > 0) {
              if (progress >= 0.6 && progress <= 0.75) {
                const introFadeProgress = (progress - 0.6) / 0.15;
                const totalWords = introHeaderSplit.words.length;

                introHeaderSplit.words.forEach((word, index) => {
                  const wordFadeProgress = index / totalWords;
                  const fadeRange = 0.1;

                  if (introFadeProgress >= wordFadeProgress * fadeRange) {
                    gsap.set(word, { opacity: 0 });
                  } else if (introFadeProgress <= wordFadeProgress) {
                    gsap.set(word, { opacity: 1 });
                  } else {
                    const wordOpacity =
                      1 - (introFadeProgress - wordFadeProgress) / fadeRange;
                    gsap.set(word, { opacity: wordOpacity });
                  }
                });
              } else if (progress < 0.6) {
                gsap.set(introHeaderSplit.words, { opacity: 1 });
              } else if (progress > 0.75) {
                gsap.set(introHeaderSplit.words, { opacity: 0 });
              }
            }

            if (outroHeaderSplit && outroHeaderSplit.words.length > 0) {
              if (progress >= 0.8 && progress <= 0.95) {
                const outroRevealProgress = (progress - 0.8) / 0.15;
                const totalWords = outroHeaderSplit.words.length;

                outroHeaderSplit.words.forEach((word, index) => {
                  const wordRevealProgress = index / totalWords;
                  const fadeRange = 0.1;

                  if (outroRevealProgress >= wordRevealProgress + fadeRange) {
                    gsap.set(word, { opacity: 1 });
                  } else if (outroRevealProgress <= wordRevealProgress) {
                    gsap.set(word, { opacity: 0 });
                  } else {
                    const wordOpacity =
                      (outroRevealProgress - wordRevealProgress) / fadeRange;
                    gsap.set(word, { opacity: wordOpacity });
                  }
                });
              } else if (progress < 0.8) {
                gsap.set(outroHeaderSplit.words, { opacity: 0 });
              } else if (progress > 0.95) {
                gsap.set(outroHeaderSplit.words, { opacity: 1 });
              }
            }
          });
        },
      });
    }
  }, []);
  return (
    <>
      <section className="intro">
        <h1>Visions That Move Beyond the Surface</h1>
      </section>
      <section className="spotlight">
        <div className="spotlight-images">
          <div className="img">
            <img src="/img1.jpg" alt="" />
          </div>
          <div className="img">
            <img src="/img2.jpg" alt="" />
          </div>
          <div className="img">
            <img src="/img3.jpg" alt="" />
          </div>
          <div className="img">
            <img src="/img4.jpg" alt="" />
          </div>
          <div className="img">
            <img src="/img1.jpg" alt="" />
          </div>
          <div className="img">
            <img src="/img2.jpg" alt="" />
          </div>
          <div className="img">
            <img src="/img3.jpg" alt="" />
          </div>
          <div className="img">
            <img src="/img4.jpg" alt="" />
          </div>
          <div className="img">
            <img src="/img1.jpg" alt="" />
          </div>
          <div className="img">
            <img src="/img2.jpg" alt="" />
          </div>
          <div className="img">
            <img src="/img3.jpg" alt="" />
          </div>
          <div className="img">
            <img src="/img4.jpg" alt="" />
          </div>
          <div className="img">
            <img src="/img1.jpg" alt="" />
          </div>
          <div className="img">
            <img src="/img2.jpg" alt="" />
          </div>
          <div className="img">
            <img src="/img3.jpg" alt="" />
          </div>
          <div className="img">
            <img src="/img4.jpg" alt="" />
          </div>
          <div className="img">
            <img src="/img1.jpg" alt="" />
          </div>
          <div className="img">
            <img src="/img2.jpg" alt="" />
          </div>
          <div className="img">
            <img src="/img3.jpg" alt="" />
          </div>
          <div className="img">
            <img src="/img4.jpg" alt="" />
          </div>
        </div>
        <div className="spotlight-cover-img">
          <img src="/img1.jpg" alt="" />
        </div>
        <div className="spotlight-intro-header">
          <h1>When Motion and Emotion Collide</h1>
        </div>
        <div className="spotlight-outro-header">
          <h1>Experience the Art of Movement</h1>
        </div>
      </section>
      <section className="outro">
        <h1>Outro Section</h1>
      </section>
    </>
  );
}
