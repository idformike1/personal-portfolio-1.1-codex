import gsap from 'gsap';

export class HighlightAnimations {
  constructor(container) {
    this.container = container;
    this.destroyers = [];
  }

  init() {
    if (this.container.dataset.barbaNamespace !== 'home') return this;

    const items = [...this.container.querySelectorAll('[data-project-card]')];

    items.forEach((item) => {
      const title = item.querySelector('.featured-work__title h3');
      const line = item.querySelector('.featured-work__highlight');
      if (!title || !line) return;

      const timeline = gsap.timeline({ paused: true });
      timeline
        .to(title, {
          x: -12,
          duration: 0.42,
          ease: 'power3.out'
        }, 0)
        .to(line, {
          scaleX: 1,
          duration: 0.42,
          ease: 'power3.out'
        }, 0);

      const onEnter = () => timeline.play();
      const onLeave = () => timeline.reverse();

      item.addEventListener('mouseenter', onEnter);
      item.addEventListener('mouseleave', onLeave);

      this.destroyers.push(() => {
        item.removeEventListener('mouseenter', onEnter);
        item.removeEventListener('mouseleave', onLeave);
        timeline.kill();
      });
    });

    return this;
  }

  destroy() {
    this.destroyers.forEach((destroy) => destroy());
    this.destroyers = [];
  }
}
