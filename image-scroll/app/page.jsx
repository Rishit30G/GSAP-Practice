'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const contentData = [
  {
    id: 1,
    title: "Design with Precision",
    description: "Every pixel matters. We ensure that your architectural vision is translated into a digital reality with exact specifications and seamless layouts.",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Robust Engineering",
    description: "Built on a foundation of modern technologies. Our systems are scalable, secure, and designed to handle high traffic without compromising performance.",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Seamless Integration",
    description: "Connect your favorite tools effortlessly. Our API-first approach ensures that your data flows smoothly between all your business platforms.",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Global Scale",
    description: "Reach audiences worldwide. With edge computing and distributed databases, your content is delivered instantly, no matter where your users are.",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop"
  }
];

export default function Home() {
  // Refs for the container and the elements we want to animate
  const containerRef = useRef(null);
  const rightColumnRef = useRef(null);
  const textRefs = useRef([]);

  useGSAP(() => {
    // 1. Create the Master Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top', // Start when top of container hits top of viewport
        end: '+=300% bottom', // The scroll distance (3x the viewport height)
        pin: true, // Pin the container
        scrub: 1, // Smooth scrubbing effect
        // markers: true, // Uncomment for debugging
      },
    });

    // 2. Animate the Right Side (Images)
    // We move the entire right column up.
    // The calculation is -(total sections - 1) * 100% 
    // This slides the images up one by one.
    const totalSections = contentData.length;
    
    tl.to(rightColumnRef.current, {
      yPercent: -(100 * (totalSections - 1)),
      ease: 'none', // vital for sync
      duration: totalSections - 1 // Time proportional to number of slides
    }, 0); // Start at time 0

    // 3. Animate the Left Side (Text)
    // We need to switch text opacity as the images scroll.
    contentData.forEach((_, i) => {
      // Skip the first text (it's already visible)
      if (i === 0) return;

      // Calculate the specific time in the timeline where this transition should happen
      // If we have 4 items, the timeline duration is 3. 
      // Transitions happen at 0->1, 1->2, 2->3.
      
      const fadeStart = i - 0.5; // Start fading out previous slightly before the move
      const fadeEnd = i;   

      // Fade in the current text
      tl.to(textRefs.current[i], {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out'
      }, fadeStart);

      // Fade out the previous text
      tl.to(textRefs.current[i - 1], {
        opacity: 0,
        y: -20, // slightly move up as it fades out
        duration: 0.5,
        ease: 'power2.out'
      }, fadeStart);
    });
  }, []);

  return (
    <>
      <section className='min-h-screen bg-black flex items-center justify-center'>
        <h1>Hello World</h1>
      </section>
    <section 
      ref={containerRef} 
      className="relative flex h-screen w-full overflow-hidden bg-gray-900 text-white"
    >
      {/* --- LEFT SIDE (TEXT) --- */}
      <div className="flex w-1/2 flex-col justify-center px-12 lg:px-24">
        <div className="relative h-64 w-full"> 
          {/* We use a relative container with absolute children to stack text on top of each other */}
          {contentData.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => (textRefs.current[index] = el)}
              className={`absolute top-0 left-0 flex w-full flex-col justify-center ${
                index === 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <h2 className="mb-6 text-4xl font-bold leading-tight md:text-5xl text-blue-400">
                {item.title}
              </h2>
              <p className="text-lg text-gray-300 md:text-xl leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* --- RIGHT SIDE (IMAGES) --- */}
      <div className="h-full w-1/2 overflow-hidden">
        {/* This inner div moves up via GSAP */}
        <div ref={rightColumnRef} className="h-full w-full">
          {contentData.map((item) => (
            <div key={item.id} className="relative h-full w-full">
              {/* Use Next/Image or standard img tag */}
              <img
                src={item.img}
                alt={item.title}
                className="h-full w-full object-cover"
              />
              {/* Optional: Overlay for better text contrast if needed */}
              <div className="absolute inset-0 bg-black/10" />
            </div>
          ))}
        </div>
      </div>
    </section>
    <section className='min-h-screen bg-black flex items-center justify-center'>
        <h1>Hello World</h1>
      </section>
    </>
  );
}