'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

export default function Home() {

  gsap.registerPlugin(ScrollTrigger, SplitText);

  useGSAP(() => {

    const heroCopySplit = SplitText.create('.hero-copy h3', { type: 'words', wordClass: 'word'});

    let isHeroCopyHidden = false; 

    ScrollTrigger.create({
      trigger: '.hero', 
      start: 'top top', 
      end: `+${window.innerHeight * 3.5}px`, 
      pin: true,
      pinSpacing:false,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress; 
        const heroHeaderProgress = Math.min(1, progress / 0.25);
        gsap.set('.hero-header', { yPercent: -heroHeaderProgress * 100});
        const heroWordsProgress = Math.max(0, Math.min(1, (progress - 0.25) / 0.25));

        const totalWords = heroCopySplit.words.length; 

        heroCopySplit.words.forEach((word, i) => {
          const wordStart = i / totalWords; 
          const wordEnd = (i + 1) / totalWords; 

          const wordOpacity = Math.max(0, Math.min((heroWordsProgress - wordStart) / (wordEnd - wordStart), 1)); 

          gsap.set(word, { opacity: wordOpacity});
        }); 

        if(progress > 0.64 && !isHeroCopyHidden){
          isHeroCopyHidden = true; 
          gsap.to('.hero-copy h3', {opacity: 0, duration: 0.2});
        }
        else if(progress <= 0.64 && isHeroCopyHidden){
          isHeroCopyHidden = false; 
          gsap.to(".hero-copy h3", {opacity: 1, duration: 0.2}); 
        }

        const heroImgProgress = Math.max(0, Math.min((progress - 0.75) / 0.25, 1)); 

        const heroImgWidth = gsap.utils.interpolate(window.innerWidth, 150, heroImgProgress); 
        const heroImgHeight = gsap.utils.interpolate(window.innerHeight, 150, heroImgProgress)
        const heroImgBorderRadius = gsap.utils.interpolate(0, 10, heroImgProgress);

        gsap.set('.hero-img', { width: heroImgWidth, height: heroImgHeight, borderRadius: heroImgBorderRadius});
      }
    })

    const aboutImgCols = [
      { id: '#about-imgs-col-1', y: -500 },
      { id: '#about-imgs-col-2', y: -250 },
      { id: '#about-imgs-col-3', y: -250 },
      { id: '#about-imgs-col-4', y: -500 },
    ]; 

    aboutImgCols.forEach(({id, y}) => {
      gsap.to(id, {
        y, 
        scrollTrigger: {
          trigger: '.about', 
          start: 'top bottom',
          end: 'bottom top', 
          scrub: true,
        }
      })
    })

  }, []);
  return (
    <>
    <section className='hero'>
      <div className='hero-img'>
        <img src="img2.jpg" alt="Hero Image" />
      </div>
      <div className="hero-header">
        <h1>A study of motion unfolding inside a single frame</h1>
      </div>
      <div className='hero-copy'>
        <h3>The moment where stillness transforms into movement</h3>
      </div>
    </section>

    <section className='about'>
      <div className='about-images'>
        <div className="about-imgs-col" id="about-imgs-col-1">
          <div className="img">
            <img src="img1.jpg" alt="About Image 1" />
          </div>
          <div className="img">
          <img src="img2.jpg" alt="About Image 1" />

          </div>
          <div className="img">
          <img src="img3.jpg" alt="About Image 1" />

          </div>
          <div className="img">
          <img src="img4.jpg" alt="About Image 1" />

          </div>
        </div>
        <div className="about-imgs-col" id="about-imgs-col-2">
        <div className="img">
            <img src="img1.jpg" alt="About Image 1" />
          </div>
          <div className="img">
          <img src="img2.jpg" alt="About Image 1" />

          </div>
          <div className="img">
          <img src="img3.jpg" alt="About Image 1" />

          </div>
          <div className="img">
          <img src="img4.jpg" alt="About Image 1" />

          </div>
        </div>
        <div className="about-imgs-col" id="about-imgs-col-3">
        <div className="img">
            <img src="img1.jpg" alt="About Image 1" />
          </div>
          <div className="img">
          <img src="img2.jpg" alt="About Image 1" />

          </div>
          <div className="img">
          <img src="img3.jpg" alt="About Image 1" />

          </div>
          <div className="img">
          <img src="img4.jpg" alt="About Image 1" />

          </div>
        </div>
        <div className="about-imgs-col" id="about-imgs-col-4">
        <div className="img">
            <img src="img1.jpg" alt="About Image 1" />
          </div>
          <div className="img">
          <img src="img2.jpg" alt="About Image 1" />

          </div>
          <div className="img">
          <img src="img3.jpg" alt="About Image 1" />

          </div>
          <div className="img">
          <img src="img4.jpg" alt="About Image 1" />

          </div>
        </div>
      </div>

      <div className='about-header'>
        <h3>
          Fragments of motion and atmosphere gathered into a drifting collection of quiet visual moments.
        </h3>
      </div>
    </section>

    <section className='outro'>
      <h3>The frame settles back into quiet stillness.</h3>
    </section>
    </>
  );
}
