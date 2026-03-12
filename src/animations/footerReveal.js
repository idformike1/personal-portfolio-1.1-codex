import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const initFooterReveal = (container, scrollController) => {
  const footerWrap = container.querySelector('.footer-wrap');
  const footer = container.querySelector('.footer');

  if (!footerWrap || !footer) {
    return { destroy() {} };
  }

  const targets = [
    ...footer.querySelectorAll('.footer__headline-row, .footer__cta-row, .footer__links-row, .footer__bottom > *')
  ];

  gsap.set(targets, { autoAlpha: 1 });

  const tween = gsap.from(targets, {
    y: 44,
    autoAlpha: 0,
    duration: 0.95,
    stagger: 0.08,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: footerWrap,
      start: 'top bottom-=10%',
      scroller: scrollController.scrollerElement
    }
  });

  return {
    destroy() {
      tween.scrollTrigger?.kill();
      tween.kill();
    }
  };
};
