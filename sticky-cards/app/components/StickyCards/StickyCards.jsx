'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Lenis from 'lenis';
import { useEffect, useRef } from 'react';
import './StickyCards.css';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const StickyCards = () => {

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

  gsap.registerPlugin(ScrollTrigger);

  const container = useRef(null);

  useGSAP(() => {
    const cards = document.querySelectorAll('.sticky-card'); 

    cards.forEach((card, index) => {
        if(index < cards.length - 1){
            ScrollTrigger.create({
                trigger: card, 
                start: "top top", 
                endTrigger: cards[cards.length - 1], 
                end: "top top", 
                pin: true,
                pinSpacing: false,
            })
        }

        if(index < cards.length - 1){
            ScrollTrigger.create({
                trigger: cards[index + 1], 
                start: "top bottom", 
                end: "top top", 
                markers: true,
                onUpdate: (self) => {
                    const progress = self.progress; 
                    const scale = 1 - progress * 0.25; 
                    const rotation = (index % 2 === 0 ? 5 : -5) * progress; 
                    const afterOpacity = progress;

                    gsap.set(card, {
                        scale: scale, 
                        rotation: rotation, 
                        "--after-opacity": afterOpacity,
                    }); 
                }
            })
        }
    })
  }, {scope: container});


  const stickyCards = [
    {
      index: '01',
      title: 'Character',
      image: '/img1.jpg',
      description:
        'Discover the essence of character through compelling narratives and vivid imagery that bring stories to life.',
    },
    {
      index: '02',
      title: 'Setting',
      image: '/img2.jpg',
      description:
        'Explore diverse settings that transport you to different worlds, enriching your reading experience.',
    },
    {
      index: '03',
      title: 'Plot',
      image: '/img3.jpg',
      description:
        'Dive into intricate plots filled with twists and turns that keep you engaged from start to finish.',
    },
    {
      index: '04',
      title: 'Theme',
      image: '/img4.jpg',
      description:
        'Uncover the underlying themes that give depth and meaning to stories, provoking thought and reflection.',
    },
  ];

  return <div className="sticky-cards" ref={container}>
    {stickyCards.map((cardData, index) => (
        <div className='sticky-card' key={index}>
            <div className='sticky-card-index'><h1>{cardData.index}</h1></div>
            <div className='sticky-card-content'>
                <div className='sticky-card-content-wrapper'>
                    <h1 className="sticky-card-header">{cardData.title}</h1>
                    <div className='sticky-card-img'>
                        <img src={cardData.image} alt="" />
                    </div>

                    <div className="sticky-card-copy">
                        <div className="sticky-card-copy-title">
                            <p>(About the state)</p>
                        </div>
                        <div className='sticky-card-copy-description'>
                            <p>{cardData.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ))}
  </div>;
};

export default StickyCards;
