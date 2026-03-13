import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const initFooterReveal = (container, scrollController) => {
  const footerWrap = container.querySelector('.footer-wrap');
  const footer = container.querySelector('.footer');
  const buttonWrap = footer?.querySelector('.btn-fixed');
  const button = footer?.querySelector('.btn-round');
  const gradient = container.querySelector('.overlay-gradient');

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

  const gradientTween = gradient
    ? gsap.to(gradient, {
        backgroundPosition: '0% 100%',
        duration: 4.2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      })
    : null;

  const onFooterMove = (event) => {
    if (!buttonWrap || !button) return;
    const bounds = button.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 10;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 10;
    gsap.to(buttonWrap, {
      x,
      y,
      duration: 0.35,
      ease: 'power3.out',
      overwrite: 'auto'
    });
  };

  const onFooterEnter = () => {
    if (!button) return;
    gsap.to(button, {
      scale: 1.04,
      duration: 0.32,
      ease: 'power3.out',
      overwrite: 'auto'
    });
  };

  const onFooterLeave = () => {
    if (!button || !buttonWrap) return;
    gsap.to(button, {
      scale: 1,
      duration: 0.45,
      ease: 'elastic.out(1, 0.5)',
      overwrite: 'auto'
    });
    gsap.to(buttonWrap, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'power3.out',
      overwrite: 'auto'
    });
  };

  button?.addEventListener('pointerenter', onFooterEnter);
  button?.addEventListener('pointermove', onFooterMove);
  button?.addEventListener('pointerleave', onFooterLeave);

  return {
    destroy() {
      button?.removeEventListener('pointerenter', onFooterEnter);
      button?.removeEventListener('pointermove', onFooterMove);
      button?.removeEventListener('pointerleave', onFooterLeave);
      gradientTween?.kill();
      tween.scrollTrigger?.kill();
      tween.kill();
    }
  };
};
