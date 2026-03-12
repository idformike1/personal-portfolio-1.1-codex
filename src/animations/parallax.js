import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const initParallaxAnimations = (root, reducedMotion) => {
  const media = [...root.querySelectorAll('.gallery-card__media img')];
  media.forEach((node) => {
    gsap.fromTo(
      node,
      { yPercent: reducedMotion ? 0 : -8, scale: 1.08 },
      {
        yPercent: reducedMotion ? 0 : 8,
        ease: 'none',
        scrollTrigger: {
          trigger: node,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );
  });
  return () => {};
};
