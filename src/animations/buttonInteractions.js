import gsap from 'gsap';

const BUTTON_SELECTOR = [
  '.btn-round',
  '.archive-pill',
  '.nav-bar__menu',
  '.floating-menu',
  '[data-magnetic]'
].join(', ');

export const initButtonInteractions = (container) => {
  const destroyers = [];
  const buttons = [...container.querySelectorAll(BUTTON_SELECTOR)];

  buttons.forEach((button) => {
    const strength = button.classList.contains('btn-round') ? 26 : 14;

    const onMove = (event) => {
      const bounds = button.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * strength;
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * strength;

      gsap.to(button, {
        x,
        y,
        yPercent: -2,
        duration: 0.28,
        ease: 'power3.out',
        overwrite: 'auto'
      });
    };

    const onEnter = () => {
      gsap.to(button, {
        scale: 1.015,
        duration: 0.24,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    };

    const onLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        yPercent: 0,
        scale: 1,
        duration: 0.72,
        ease: 'elastic.out(1, 0.45)',
        overwrite: 'auto'
      });
    };

    button.addEventListener('pointerenter', onEnter);
    button.addEventListener('pointermove', onMove);
    button.addEventListener('pointerleave', onLeave);

    destroyers.push(() => {
      button.removeEventListener('pointerenter', onEnter);
      button.removeEventListener('pointermove', onMove);
      button.removeEventListener('pointerleave', onLeave);
    });
  });

  return {
    destroy() {
      destroyers.forEach((destroy) => destroy());
    }
  };
};
