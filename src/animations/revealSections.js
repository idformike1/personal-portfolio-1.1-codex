import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const initRevealSections = (container, scroll) => {
  const animations = [];
  const sections = [...container.querySelectorAll('[data-scroll-section]')];

  sections.forEach((section) => {
    const tween = gsap.from(section.querySelectorAll('.reveal-up, .featured-work__item, .project-row, .work-tile'), {
      y: 64,
      autoAlpha: 0,
      stagger: 0.06,
      duration: 0.95,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 82%',
        scroller: scroll.scrollerElement
      }
    });
    animations.push(tween);
  });

  const marquee = container.querySelector('[data-marquee-track]');
  if (marquee) {
    marquee.innerHTML += marquee.innerHTML;
    const loop = gsap.to(marquee, {
      xPercent: -50,
      duration: 18,
      repeat: -1,
      ease: 'none'
    });
    animations.push(loop);
  }

  const homeTrack = container.querySelector('[data-home-marquee]');
  if (homeTrack) {
    homeTrack.innerHTML += homeTrack.innerHTML;
    const loop = gsap.to(homeTrack, {
      xPercent: -50,
      duration: 24,
      repeat: -1,
      ease: 'none'
    });
    animations.push(loop);
  }

  return {
    destroy() {
      animations.forEach((item) => item.kill());
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    }
  };
};
