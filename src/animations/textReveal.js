import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const splitText = (element, mode) => {
  if (element.dataset.splitReady) return element.querySelectorAll('.split-inner');
  element.dataset.splitReady = 'true';

  const parts = [];
  const source = element.innerHTML;

  if (mode === 'chars') {
    const chars = source.replace(/<br\s*\/?>/gi, '\n').split('');
    element.innerHTML = chars
      .map((char) => {
        if (char === '\n') return '<br>';
        if (char === ' ') return '<span class="split-space">&nbsp;</span>';
        return `<span class="split-wrap"><span class="split-inner">${char}</span></span>`;
      })
      .join('');
  } else {
    element.innerHTML = source.replace(/<span>(.*?)<\/span>/g, '<span class="split-wrap"><span class="split-inner">$1</span></span>');
  }

  element.querySelectorAll('.split-inner').forEach((item) => parts.push(item));
  return parts;
};

export const initTextReveal = (container) => {
  const targets = [...container.querySelectorAll('[data-split]')];
  const animations = [];

  targets.forEach((target) => {
    const pieces = splitText(target, target.dataset.split);
    if (target.closest('.footer')) {
      gsap.set(pieces, { yPercent: 0 });
      return;
    }
    const tween = gsap.from(pieces, {
      yPercent: 110,
      rotate: 0.001,
      duration: 1,
      stagger: target.dataset.split === 'chars' ? 0.018 : 0.06,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: target,
        start: 'top 88%'
      }
    });
    animations.push(tween);
  });

  return {
    destroy() {
      animations.forEach((animation) => animation.kill());
    }
  };
};
