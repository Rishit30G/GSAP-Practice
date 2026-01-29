'use client';

import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

export default function Home() {
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    const teamSection = document.querySelector('.team');
    const teamMembers = gsap.utils.toArray('.team-member');
    const teamMemberCards = gsap.utils.toArray('.team-member-card');

    let cardPlaceholderEntrance = null;
    let cardSlideInAnimation = null;

    function initTeamAnimations() {
      if (window.innerWidth < 1000) {
        if (cardPlaceholderEntrance) cardPlaceholderEntrance.kill();
        if (cardSlideInAnimation) cardSlideInAnimation.kill();

        teamMembers.forEach((member) => {
          gsap.set(member, { clearProps: 'all' });
          const teamMemberInitial = member.querySelector(
            '.team-member-name-initial h1',
          );
          gsap.set(teamMemberInitial, { clearProps: 'all' });
        });

        teamMemberCards.forEach((card) => {
          gsap.set(card, { clearProps: 'all' });
        });

        return;
      }

      if (cardPlaceholderEntrance) cardPlaceholderEntrance.kill();
      if (cardSlideInAnimation) cardSlideInAnimation.kill();

      cardPlaceholderEntrance = ScrollTrigger.create({
        trigger: teamSection,
        start: 'top bottom',
        end: 'top top',
        scrub: 1,

        onUpdate: (self) => {
          const progress = self.progress;

          teamMembers.forEach((member, index) => {
            const entranceDelay = 0.15;
            const entranceDuration = 0.7;
            const entranceStart = index * entranceDelay;
            const entranceEnd = entranceStart + entranceDuration;

            if (progress >= entranceStart && progress <= entranceEnd) {
              const memberEntranceProgress =
                (progress - entranceStart) / entranceDuration;

              const entranceY = 125 - memberEntranceProgress * 125;
              gsap.set(member, { y: `${entranceY}%` });

              const teamMemberInitial = member.querySelector(
                '.team-member-name-initial h1',
              );

              const initialLetterScaleDelay = 0.4;
              const initialLetterScaleProgress = Math.max(
                0,
                (memberEntranceProgress - initialLetterScaleDelay) /
                  (1 - initialLetterScaleDelay),
              );
              gsap.set(teamMemberInitial, {
                scale: initialLetterScaleProgress,
              });
            } else if (progress > entranceEnd) {
              gsap.set(member, { y: `0%` });
              const teamMemberInitial = member.querySelector(
                '.team-member-name-initial h1',
              );
              gsap.set(teamMemberInitial, { scale: 1 });
            }
          });
        },
      });

      cardSlideInAnimation = ScrollTrigger.create({
        trigger: teamSection,
        start: 'top top',
        end: `+=${window.innerHeight * 3}`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          teamMemberCards.forEach((card, index) => {
            const slideInStagger = 0.075;
            const xRotationDuration = 0.4;
            const xRotationStart = index * slideInStagger;
            const xRotationEnd = xRotationStart + xRotationDuration;

            if (progress >= xRotationStart && progress <= xRotationEnd) {
              const cardProgress =
                (progress - xRotationStart) / xRotationDuration;

              const cardInitialX = 300 - index * 100;
              const cardTargetX = 0;
              const cardSlideInX =
                cardInitialX + cardProgress * (cardTargetX - cardInitialX);

              const cardSlideInRotation = 20 - cardProgress * 20;

              gsap.set(card, {
                xPercent: -50,
                yPercent: -50,
                x: `${cardSlideInX}%`,
                rotation: cardSlideInRotation,
              });
            } else if (progress > xRotationEnd) {
              gsap.set(card, {
                xPercent: -50,
                yPercent: -50,
                x: 0,
                rotation: 0,
              });
            }

            const cardScaleStagger = 0.12;
            const cardScaleStart = 0.4 + index * cardScaleStagger;

            if (progress >= cardScaleStart && progress <= 1) {
              const scaleProgress =
                (progress - cardScaleStart) / (1 - cardScaleStart);

              const scaleValue = 0.75 + scaleProgress * 0.25;

              gsap.set(card, {
                scale: scaleValue,
              });
            } else if (progress > 1) {
              gsap.set(card, {
                scale: 1,
              });
            }
          });
        },
      });
    }

    let resizeTimer;

    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        initTeamAnimations();
        ScrollTrigger.refresh();
      }, 250);
    });
    initTeamAnimations();
  }, []);

  return (
    <>
      <section className="hero">
        <h1>Faces behind the Frame</h1>
      </section>

      <section className="team">
        <div className="team-member">
          <div className="team-member-name-initial">
            <h1>C</h1>
          </div>
          <div className="team-member-card">
            <div className="team-member-img">
              <img src="/img1.jpg" alt="Team Member" />
            </div>
            <div className="team-member-info">
              <p>( Creative Director )</p>
              <h1>
                Capian <span>Merlow</span>
              </h1>
            </div>
          </div>
        </div>{' '}
        <div className="team-member">
          <div className="team-member-name-initial">
            <h1>C</h1>
          </div>
          <div className="team-member-card">
            <div className="team-member-img">
              <img src="/img1.jpg" alt="Team Member" />
            </div>
            <div className="team-member-info">
              <p>( Creative Director )</p>
              <h1>
                Capian <span>Merlow</span>
              </h1>
            </div>
          </div>
        </div>{' '}
        <div className="team-member">
          <div className="team-member-name-initial">
            <h1>C</h1>
          </div>
          <div className="team-member-card">
            <div className="team-member-img">
              <img src="/img1.jpg" alt="Team Member" />
            </div>
            <div className="team-member-info">
              <p>( Creative Director )</p>
              <h1>
                Capian <span>Merlow</span>
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="outro">
        <h1>Where Vision Becomes Work</h1>
      </section>
    </>
  );
}
