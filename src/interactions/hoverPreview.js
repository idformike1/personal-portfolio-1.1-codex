import gsap from 'gsap';

export class HoverPreview {
  constructor(container, cursor) {
    this.container = container;
    this.cursor = cursor;
    this.destroyers = [];
  }

  init() {
    if (this.container.dataset.barbaNamespace !== 'home') return this;

    const items = [...this.container.querySelectorAll('[data-project-card]')];

    items.forEach((item) => {
      const onEnter = () => {
        this.cursor?.setState({
          mode: 'view',
          label: 'View',
          image: item.dataset.preview,
          accent: item.dataset.accent
        });
      };

      const onMove = (event) => {
        const x = event.clientX + 56;
        const y = event.clientY - 32;
        const rotateY = ((event.clientX / window.innerWidth) - 0.5) * 8;
        const rotateX = ((event.clientY / window.innerHeight) - 0.5) * -8;

        this.cursor?.tilt(rotateY, rotateX);
      };

      const onLeave = () => {
        this.cursor?.setState({ mode: 'default' });
      };

      item.addEventListener('mouseenter', onEnter);
      item.addEventListener('mousemove', onMove);
      item.addEventListener('mouseleave', onLeave);

      this.destroyers.push(() => {
        item.removeEventListener('mouseenter', onEnter);
        item.removeEventListener('mousemove', onMove);
        item.removeEventListener('mouseleave', onLeave);
      });
    });

    return this;
  }

  destroy() {
    this.destroyers.forEach((destroy) => destroy());
    this.destroyers = [];
  }
}
