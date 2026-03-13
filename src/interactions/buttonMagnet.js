import gsap from 'gsap';

const BUTTON_SELECTOR = [
  '.btn-round',
  '.archive-pill',
  '.nav-bar__menu',
  '.floating-menu',
  '[data-magnetic]'
].join(', ');

export class ButtonMagnet {
  constructor(container, cursor) {
    this.container = container;
    this.cursor = cursor;
    this.destroyers = [];
  }

  init() {
    const buttons = [...this.container.querySelectorAll(BUTTON_SELECTOR)];

    buttons.forEach((button) => {
      const multiplier = 0.2;
      const isDarkFillButton = button.matches('.archive-pill, [data-magnetic], .nav-bar__menu');

      const onEnter = () => {
        this.cursor?.setState({ mode: 'hover', label: '' });
        gsap.to(button, {
          scale: 1.015,
          duration: 0.22,
          ease: 'power2.out',
          overwrite: 'auto'
        });
        if (isDarkFillButton) {
          gsap.to(button, {
            backgroundColor: '#1C1D20',
            color: '#FFFFFF',
            duration: 0.6,
            ease: 'power3.out',
            overwrite: 'auto'
          });
        }
      };

      const onMove = (event) => {
        const bounds = button.getBoundingClientRect();
        const centerX = bounds.left + bounds.width / 2;
        const centerY = bounds.top + bounds.height / 2;
        const x = (event.clientX - centerX) * multiplier;
        const y = (event.clientY - centerY) * multiplier;
        gsap.to(button, {
          x,
          y,
          duration: 0.3,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      };

      const onLeave = () => {
        this.cursor?.setState({ mode: 'default' });
        gsap.to(button, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'elastic.out(1, 0.45)',
          overwrite: 'auto'
        });
        if (isDarkFillButton) {
          gsap.to(button, {
            backgroundColor: 'transparent',
            color: '#1C1D20',
            duration: 0.6,
            ease: 'power3.out',
            overwrite: 'auto'
          });
        }
      };

      button.addEventListener('pointerenter', onEnter);
      button.addEventListener('pointermove', onMove);
      button.addEventListener('pointerleave', onLeave);

      this.destroyers.push(() => {
        button.removeEventListener('pointerenter', onEnter);
        button.removeEventListener('pointermove', onMove);
        button.removeEventListener('pointerleave', onLeave);
      });
    });

    return this;
  }

  destroy() {
    this.destroyers.forEach((destroy) => destroy());
    this.destroyers = [];
  }
}
