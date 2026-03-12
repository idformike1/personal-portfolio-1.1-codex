import gsap from 'gsap';

export const initHoverEffects = (container, cursor) => {
  if (container.dataset.barbaNamespace !== 'home') {
    return { destroy() {} };
  }

  const destroyers = [];
  const previewWrap = container.querySelector('[data-featured-preview]');
  const previewImage = container.querySelector('[data-featured-preview-image]');
  const previewTitle = container.querySelector('[data-featured-preview-title]');
  const previewMeta = container.querySelector('[data-featured-preview-meta]');
  let activeItem = null;

  const projectItems = [...container.querySelectorAll('[data-project-card], [data-project-row]')];
  projectItems.forEach((item) => {
    const title = item.querySelector('h3, h4');
    const image = previewImage;

    const enter = () => {
      activeItem = item;
      cursor.setState(item.dataset.projectRow ? 'view project' : 'explore', item.dataset.preview, item.dataset.accent);
      if (previewImage && item.dataset.preview) previewImage.src = item.dataset.preview;
      if (previewTitle && title) previewTitle.textContent = title.textContent.trim();
      if (previewMeta) previewMeta.textContent = `${item.dataset.services || ''}${item.dataset.year ? ` • ${item.dataset.year}` : ''}`;
      if (previewWrap) {
        gsap.to(previewWrap, {
          autoAlpha: 1,
          scale: 1,
          duration: 0.45,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      }
      if (image) gsap.fromTo(image, { scale: 1.08 }, { scale: 1, duration: 0.7, ease: 'power3.out', overwrite: 'auto' });
      if (title) gsap.to(title, { x: -12, duration: 0.45, ease: 'power3.out' });
    };

    const leave = () => {
      activeItem = null;
      cursor.setState('default');
      if (previewImage) {
        gsap.to(previewImage, {
          x: 0,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      }
      if (previewWrap) {
        gsap.to(previewWrap, {
          x: 0,
          y: 0,
          autoAlpha: 0,
          scale: 0.92,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      }
      if (title) gsap.to(title, { x: 0, duration: 0.45, ease: 'power3.out' });
    };

    const move = (event) => {
      if (activeItem !== item) return;
      const bounds = item.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 18;
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 18;
      if (previewImage) gsap.to(previewImage, { x, y, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
      if (previewWrap) gsap.to(previewWrap, { x: 24, y: -8, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
      cursor.tilt(x * 0.35, y * -0.35);
    };

    item.addEventListener('mouseenter', enter);
    item.addEventListener('mouseleave', leave);
    item.addEventListener('mousemove', move);

    destroyers.push(() => {
      item.removeEventListener('mouseenter', enter);
      item.removeEventListener('mouseleave', leave);
      item.removeEventListener('mousemove', move);
    });
  });

  return {
    destroy() {
      destroyers.forEach((destroy) => destroy());
    }
  };
};
