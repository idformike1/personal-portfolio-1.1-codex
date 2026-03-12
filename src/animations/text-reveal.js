import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const initTextReveal = (root, reducedMotion) => {
  const blocks = [...root.querySelectorAll('[data-text-reveal]')];
  blocks.forEach((block) => {
    if (block.dataset.prepared) return;
    block.dataset.prepared = 'true';
    block.querySelectorAll('span').forEach((span) => {
      span.innerHTML = `<span class="line-mask"><span class="line-inner">${span.textContent}</span></span>`;
    });
    const inners = block.querySelectorAll('.line-inner');
    gsap.from(inners, {
      yPercent: reducedMotion ? 0 : 110,
      duration: reducedMotion ? 0 : 1.2,
      stagger: 0.06,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: block,
        start: 'top 85%'
      }
    });
  });
  return () => ScrollTrigger.getAll().forEach((trigger) => trigger.refresh());
};
