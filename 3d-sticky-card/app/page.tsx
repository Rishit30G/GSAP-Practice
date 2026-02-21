'use client';

import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {

  useGSAP(() => {
    const cards = document.querySelectorAll('.sticky-cards .card'); 
    const totalCards = cards.length; 
    const segmentSize = 1 / totalCards; 

    const cardYOffset = 5; 
    const cardScaleStep = 0.075; 

    cards.forEach((card, i) => {
      gsap.set(card, {
        xPercent: -50, 
        yPercent: -50 + i * cardYOffset, 
        scale: 1 - i * cardScaleStep
      })
    }); 

    ScrollTrigger.create({
      trigger: ".sticky-cards", 
      start: "top top", 
      end: `+=${window.innerHeight*2}px`, 
      pin: true, 
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress; 

        const activeIndex = Math.min(
          Math.floor(progress/segmentSize), 
          totalCards - 1,
        );


        // Same example: progress = 0.4, activeIndex = 1, segmentSize = 0.25.
        // Card 1’s slice starts at:
        // activeIndex * segmentSize = 1 * 0.25 = 0.25
        // We are at progress = 0.4.
        // So inside this card’s slice we have moved:
        // progress - (start of slice) = 0.4 - 0.25 = 0.15
        // So we’re 0.15 into a slice that is 0.25 long.

        // Step 4: Turn “0.15 out of 0.25” into “0 to 1”
        // Right now we have: “0.15 in a segment of size 0.25”.
        // To get “how far through this card’s part” as a 0→1 value, we divide by the segment size:
        // segProgress = 0.15 / 0.25 = 0.6
        // So: 60% through this card’s part → segProgress = 0.6.
        // In one line, that’s:
        // segProgress = (progress - activeIndex * segmentSize) / segmentSize
        // which is:
        // (how far into this slice) / (length of slice) = 0 to 1 for this card.
        const segProgress = (progress - activeIndex * segmentSize) / segmentSize;

        cards.forEach((card, i) => {
          if(i < activeIndex) {
            gsap.set(card, {
              yPercent: 250, 
              rotationX: 10,
            })
          } else if(i === activeIndex){
            gsap.set(card, {
              yPercent: gsap.utils.interpolate(-50, -200, segProgress), 
              rotationX: gsap.utils.interpolate(0, 40, segProgress), 
              scale: 1,
            })
          } else{
            const behindIndex = i - activeIndex; 
            const currentYOffset = (behindIndex - segProgress) * cardYOffset; 
            const currentScale = 1 - (behindIndex - segProgress) * cardScaleStep; 

            gsap.set(card, {
              yPercent: -50 + currentYOffset, 
              rotationX: 0, 
              scale: currentScale,
            })

          }
        })

      }
    })



  }, []);

  return (
    <>
     <section className='intro'>
       <h1>Enter the Frame</h1>
     </section>


     <section className="sticky-cards">
       <div className="card" id="card-1">
         <div className='col'>
            <p>Quiet Control</p>
            <h1>Signal Drift</h1>
         </div>
         <div className='col'>
           <img src="/img1.jpg" alt="" />
         </div>
       </div>
       <div className="card" id="card-2">
         <div className='col'>
            <p>Quiet Control</p>
            <h1>Signal Drift</h1>
         </div>
         <div className='col'>
           <img src="/img2.jpg" alt="" />
         </div>
       </div>
       <div className="card" id="card-3">
         <div className='col'>
            <p>Quiet Control</p>
            <h1>Signal Drift</h1>
         </div>
         <div className='col'>
           <img src="/img3.jpg" alt="" />
         </div>
       </div>
       <div className="card" id="card-4">
         <div className='col'>
            <p>Quiet Control</p>
            <h1>Signal Drift</h1>
         </div>
         <div className='col'>
           <img src="/img4.jpg" alt="" />
         </div>
       </div>
     </section>


     <section className="outro">
      <h1>Loop Complete</h1>
     </section>
    </>
  );
}
