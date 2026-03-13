import gsap from 'gsap';

export class CursorSystem {
  constructor(container) {
    this.container = container;
    this.layer = container.querySelector('.cursor-layer');
    this.dot = container.querySelector('[data-cursor-dot]');
    this.labelWrap = container.querySelector('[data-cursor-label-wrap]');
    this.label = container.querySelector('[data-cursor-label]');
    this.preview = container.querySelector('[data-cursor-preview]');
    this.previewInner = container.querySelector('[data-cursor-preview-inner]');
    this.previewImage = container.querySelector('[data-cursor-preview-image]');
    this.pointer = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      currentX: window.innerWidth / 2,
      currentY: window.innerHeight / 2
    };
    this.onMove = this.onMove.bind(this);
    this.tick = this.tick.bind(this);
  }

  init() {
    if (window.matchMedia('(pointer: coarse)').matches || !this.layer) {
      this.layer?.remove();
      return this;
    }

    this.dotX = gsap.quickSetter(this.dot, 'x', 'px');
    this.dotY = gsap.quickSetter(this.dot, 'y', 'px');
    this.labelX = gsap.quickSetter(this.labelWrap, 'x', 'px');
    this.labelY = gsap.quickSetter(this.labelWrap, 'y', 'px');
    this.previewX = gsap.quickSetter(this.preview, 'x', 'px');
    this.previewY = gsap.quickSetter(this.preview, 'y', 'px');

    window.addEventListener('mousemove', this.onMove);
    gsap.ticker.add(this.tick);

    return this;
  }

  onMove(event) {
    this.pointer.x = event.clientX;
    this.pointer.y = event.clientY;
    this.layer.classList.add('is-visible');
  }

  tick() {
    this.pointer.currentX += (this.pointer.x - this.pointer.currentX) * 0.22;
    this.pointer.currentY += (this.pointer.y - this.pointer.currentY) * 0.22;
    this.dotX(this.pointer.currentX);
    this.dotY(this.pointer.currentY);
    this.labelX(this.pointer.currentX);
    this.labelY(this.pointer.currentY);
    this.previewX(this.pointer.currentX);
    this.previewY(this.pointer.currentY);
  }

  setState({ mode = 'default', label = '', image = '', accent = '#e9eaeb' } = {}) {
    this.container.dataset.cursorState = mode;
    this.label.textContent = label;
    if (image) this.previewImage.src = image;
    this.preview.style.setProperty('--preview-accent', accent);

    gsap.to(this.labelWrap, {
      scale: mode === 'default' ? 0 : 1,
      autoAlpha: mode === 'default' ? 0 : 1,
      duration: 0.24,
      ease: 'power3.out',
      overwrite: 'auto'
    });

    gsap.to(this.preview, {
      scale: mode === 'view' ? 1 : 0.92,
      autoAlpha: mode === 'view' ? 1 : 0,
      duration: 0.3,
      ease: 'power3.out',
      overwrite: 'auto'
    });

    gsap.to(this.dot, {
      scale: mode === 'hover' ? 0.45 : 1,
      duration: 0.25,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  }

  tilt(x, y) {
    gsap.to(this.previewInner, {
      rotateY: x,
      rotateX: y,
      duration: 0.3,
      ease: 'power3.out',
      overwrite: 'auto'
    });
  }

  destroy() {
    window.removeEventListener('mousemove', this.onMove);
    gsap.ticker.remove(this.tick);
  }
}
