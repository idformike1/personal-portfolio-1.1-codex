import gsap from 'gsap';

export class HoverPreview {
  constructor(container, cursor) {
    this.container = container;
    this.cursor = cursor;
    this.destroyers = [];
  }

  init() {
    if (this.container.dataset.barbaNamespace !== 'home') return this;

    const previewWrap = this.container.querySelector('[data-featured-preview]');
    const previewImage = this.container.querySelector('[data-featured-preview-image]');
    const previewTitle = this.container.querySelector('[data-featured-preview-title]');
    const previewMeta = this.container.querySelector('[data-featured-preview-meta]');
    const items = [...this.container.querySelectorAll('[data-project-card]')];

    items.forEach((item) => {
      const client = item.querySelector('.featured-work__client p');

      const onEnter = () => {
        if (previewImage && item.dataset.preview) previewImage.src = item.dataset.preview;
        if (previewTitle) previewTitle.textContent = item.querySelector('h3')?.textContent?.trim() || '';
        if (previewMeta) previewMeta.textContent = `${client?.textContent || ''}${item.dataset.year ? ` • ${item.dataset.year}` : ''}`;

        this.cursor?.setState({
          mode: 'view',
          label: 'View',
          image: item.dataset.preview,
          accent: item.dataset.accent
        });

        if (previewWrap) {
          gsap.to(previewWrap, {
            autoAlpha: 1,
            scale: 1,
            duration: 0.38,
            ease: 'power3.out',
            overwrite: 'auto'
          });
        }

        if (previewImage) {
          gsap.fromTo(previewImage, { scale: 1.06 }, {
            scale: 1,
            duration: 0.58,
            ease: 'power3.out',
            overwrite: 'auto'
          });
        }
      };

      const onMove = (event) => {
        const bounds = item.getBoundingClientRect();
        const y = bounds.top + bounds.height * 0.5;
        const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 18;
        const rotate = ((event.clientY - bounds.top) / bounds.height - 0.5) * -8;

        if (previewWrap) {
          gsap.to(previewWrap, {
            y: y - window.innerHeight * 0.35,
            x: 0,
            duration: 0.36,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        }

        if (previewImage) {
          gsap.to(previewImage, {
            x,
            duration: 0.42,
            ease: 'power3.out',
            overwrite: 'auto'
          });
        }

        this.cursor?.tilt(x * 0.4, rotate);
      };

      const onLeave = () => {
        this.cursor?.setState({ mode: 'default' });

        if (previewWrap) {
          gsap.to(previewWrap, {
            autoAlpha: 0,
            scale: 0.95,
            duration: 0.26,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        }

        if (previewImage) {
          gsap.to(previewImage, {
            x: 0,
            duration: 0.24,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        }
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
