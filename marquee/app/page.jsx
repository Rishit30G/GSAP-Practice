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
  
      // Store lenis instance globally for access in useGSAP
      window.lenisInstance = lenis;
  
      return () => {
        lenis.destroy();
        delete window.lenisInstance;
      };
    }, []);
  
    gsap.registerPlugin(ScrollTrigger, SplitText);
  
    useGSAP(() => {
      const textBlocks = gsap.utils.toArray(".copy-block p"); 
      const splitInstances = textBlocks.map((block) => SplitText.create(block, { type: "words", mask: "words"}));

      gsap.set(splitInstances[1].words, { yPercent: 100 });
      gsap.set(splitInstances[2].words, { yPercent: 100 });

      const overlapCount = 3; 

      const getWordProgress = (phaseProgress, wordIndex, totalWords) => {
        //phaseProgress: 0 to 1
        //wordIndex: index of the word
        //totalWords: total words in the whole paragraph

        const scale = 1 / Math.min(1 + (totalWords - 1) / totalWords + overlapCount / totalWords); 

        const startTime = (wordIndex / totalWords) * scale;

        const endTime = startTime + (overlapCount / totalWords) * scale;

        const duration = endTime - startTime; 

        if(phaseProgress <= startTime) return 0; 
        if(phaseProgress >= endTime) return 1;

        return (phaseProgress - startTime) / duration; 
      }; 

      const animateBlock = (outBlock, inBlock, phaseProgress) => {
        outBlock.words.forEach((word, i) => {
          const progress = getWordProgress(phaseProgress, i, outBlock.words.length); 

          gsap.set(word, {yPercent: progress * 100}); 
        }); 

        inBlock.words.forEach((word, i) => {
          const progress = getWordProgress(phaseProgress, i, inBlock.words.length); 

          gsap.set(word, {yPercent: 100 - progress * 100});
        })
      }; 

      const indicator = document.querySelector('.scroll-indicator'); 

      const marqueeTrack = document.querySelector('.marquee-track');

      const items = gsap.utils.toArray('.marquee-item');

      items.forEach((item) => marqueeTrack.appendChild(item.cloneNode(true)));

      let marqueePosition = 0; 
      let smoothVelocity = 0; 

      gsap.ticker.add(() => {
        // Get velocity from Lenis instance
        const targetVelocity = window.lenisInstance ? Math.abs(window.lenisInstance.velocity) * 0.02 : 0;
        
        smoothVelocity += (targetVelocity - smoothVelocity) * 0.5; 

        const baseSpeed = 0.45; 

        const speed = baseSpeed + smoothVelocity * 9; 

        marqueePosition -= speed; 

        const trackWidth = marqueeTrack.scrollWidth / 2; 

        if(marqueePosition <= -trackWidth) {
          marqueePosition = 0;
        }

        gsap.set(marqueeTrack, { x: marqueePosition });
      }); 


      ScrollTrigger.create({
        trigger: '.container', 
        start: 'top top', 
        end: 'bottom bottom',
        onUpdate: (self) => {
          const scrollProgress = self.progress; 

          gsap.set(indicator, { "--progress": scrollProgress});

          if(scrollProgress <= 0.5){
            const phase1 = scrollProgress / 0.5; 
            animateBlock(splitInstances[0], splitInstances[1], phase1);
          }else{
            const phase2 = (scrollProgress - 0.5)/0.5; 
            gsap.set(splitInstances[0].words, {yPercent: 100});
            animateBlock(splitInstances[1], splitInstances[2], phase2);
          }
        }
      })



    }, []);

  return (
    <>
    <nav>
     <p>/ CAG1232</p>
      <p>/ Frontend Developer</p>
     </nav>

     <div className='container'>
        <section className='hero'>
          <div className='about-copy'>
            <div className='copy-block'>
              <p>
                Loremipsum dolor sit amet consectetur, adipisicing elit.
              </p>
            </div>
            <div className='copy-block'>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur amet aliquid facere eos, perferendis voluptate ea molestias inventore dolor odio.
              </p>
            </div>
            <div className='copy-block'>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione quo incidunt impedit, fugiat hic sapiente!
              </p>
            </div>
          </div>

          <div className="marquee">
            <div className="marquee-track">
              <div className='marquee-item'>
              <img src="/pic1.jpg" alt="Picture 1" />
              </div>
              <div className='marquee-item'>
                <img src="/pic2.jpg" alt="Picture 2" />
              </div>
              <div className='marquee-item'>
                <img src="/pic3.jpg" alt="Picture 3" />
              </div>
              <div className='marquee-item'>
                <img src="/pic4.jpg" alt="Picture 4" />
              </div>
               <div className='marquee-item'>
              <img src="/pic1.jpg" alt="Picture 1" />
              </div>
              <div className='marquee-item'>
                <img src="/pic2.jpg" alt="Picture 2" />
              </div>
              <div className='marquee-item'>
                <img src="/pic3.jpg" alt="Picture 3" />
              </div>
              <div className='marquee-item'>
                <img src="/pic4.jpg" alt="Picture 4" />
              </div>
               <div className='marquee-item'>
              <img src="/pic1.jpg" alt="Picture 1" />
              </div>
              <div className='marquee-item'>
                <img src="/pic2.jpg" alt="Picture 2" />
              </div>
            </div>
          </div>

          <div className='scroll-indicator'></div>
        </section>
     </div>
    </>
  );
}
