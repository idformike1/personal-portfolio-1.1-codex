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
      const strength = button.classList.contains('btn-round') ? 24 : 12;

      const onEnter = () => {
        this.cursor?.setState({ mode: 'hover', label: '' });
        gsap.to(button, {
          scale: 1.015,
          duration: 0.22,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      };

      const onMove = (event) => {
        const bounds = button.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * strength;
        const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * strength;
        gsap.to(button, {
          x,
          y,
          duration: 0.28,
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
          duration: 0.72,
          ease: 'elastic.out(1, 0.45)',
          overwrite: 'auto'
        });
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
