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
      end: `+=${window.innerHeight*8}px`, 
      pin: true, 
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress; 

        const activeIndex = Math.min(
          Math.floor(progress/segmentSize), 
          totalCards - 1,
        );

        const segProgress = (progress - activeIndex * segmentSize) / segmentSize;

        cards.forEach((card, i) => {
          if( i < activeIndex) {
            gsap.set(card, {
              yPercent: -250, 
              rotationX: 35,
            })
          } else if(i === activeIndex){
            gsap.set(card, {
              yPercent: gsap.utils.interpolate(-50, -200, segProgress), 
              rotationX: gsap.utils.interpolate(0, 35, segProgress), 
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
