import gsap from 'gsap';

export const initCursor = (container) => {
  const layer = container.querySelector('.cursor-layer');
  const dot = container.querySelector('[data-cursor-dot]');
  const labelWrap = container.querySelector('[data-cursor-label-wrap]');
  const label = container.querySelector('[data-cursor-label]');
  const preview = container.querySelector('[data-cursor-preview]');
  const previewInner = container.querySelector('[data-cursor-preview-inner]');
  const previewImage = container.querySelector('[data-cursor-preview-image]');

  if (window.matchMedia('(pointer: coarse)').matches) {
    layer?.remove();
    return { destroy() {} };
  }

  const state = {
    pointerX: window.innerWidth / 2,
    pointerY: window.innerHeight / 2,
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  };

  const onMove = (event) => {
    state.pointerX = event.clientX;
    state.pointerY = event.clientY;
    layer.classList.add('is-visible');
  };

  const tick = () => {
    state.x += (state.pointerX - state.x) * 0.2;
    state.y += (state.pointerY - state.y) * 0.2;
    gsap.set(dot, { x: state.x, y: state.y });
    gsap.set(labelWrap, { x: state.x, y: state.y });
    gsap.set(preview, { x: state.x, y: state.y });
  };

  gsap.ticker.add(tick);
  window.addEventListener('mousemove', onMove);

  return {
    setState(next = 'default', image = '', accent = '#e9eaeb') {
      label.textContent = next === 'default' ? '' : next;
      container.dataset.cursorState = next;
      if (image) previewImage.src = image;
      preview.style.setProperty('--preview-accent', accent);
      gsap.to(labelWrap, { scale: next === 'default' ? 0 : 1, duration: 0.28, ease: 'power3.out' });
      gsap.to(preview, { autoAlpha: next === 'default' ? 0 : 1, scale: next === 'default' ? 0.9 : 1, duration: 0.35, ease: 'power3.out' });
    },
    tilt(x, y) {
      gsap.to(previewInner, { rotateY: x, rotateX: y, duration: 0.35, ease: 'power3.out' });
    },
    destroy() {
      gsap.ticker.remove(tick);
      window.removeEventListener('mousemove', onMove);
    }
  };
};
