import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const initSectionReveal = (container, scrollController) => {
  const tweens = [];
  const triggers = [];
  const sections = [...container.querySelectorAll('[data-scroll-section]')];

  sections.forEach((section) => {
    const targets = section.querySelectorAll('.reveal-up, .featured-work__item');
    if (!targets.length) return;

    const tween = gsap.from(targets, {
      y: 40,
      autoAlpha: 0,
      duration: 0.9,
      stagger: 0.08,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 86%',
        scroller: scrollController.scrollerElement
      }
    });
    tweens.push(tween);
    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
  });

  return {
    destroy() {
      tweens.forEach((tween) => tween.kill());
      triggers.forEach((trigger) => trigger.kill());
    }
  };
};
