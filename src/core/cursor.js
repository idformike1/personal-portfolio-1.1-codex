import gsap from 'gsap';

export class CursorEngine {
  constructor({ root, reducedMotion = false }) {
    this.root = root;
    this.reducedMotion = reducedMotion;
    this.dot = root.querySelector('[data-cursor-dot]');
    this.ring = root.querySelector('[data-cursor-ring]');
    this.label = root.querySelector('[data-cursor-label]');
    this.preview = root.querySelector('[data-cursor-preview]');
    this.previewInner = root.querySelector('[data-preview-tilt]');
    this.previewImage = root.querySelector('[data-preview-image]');
    this.pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.states = {
      dot: { x: this.pointer.x, y: this.pointer.y, ease: 0.35 },
      ring: { x: this.pointer.x, y: this.pointer.y, ease: 0.18 },
      preview: { x: this.pointer.x, y: this.pointer.y, ease: 0.1 }
    };
    this.ticker = null;
  }

  init() {
    if (window.matchMedia('(pointer: coarse)').matches) {
      this.root.classList.add('is-hidden');
      return;
    }

    const onMove = (event) => {
      this.pointer.x = event.clientX;
      this.pointer.y = event.clientY;
      this.root.classList.add('is-active');
    };

    const onLeave = () => this.root.classList.remove('is-active');

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);

    this.cleanup = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };

    this.ticker = gsap.ticker.add(() => this.render());
  }

  render() {
    Object.values(this.states).forEach((state) => {
      state.x += (this.pointer.x - state.x) * state.ease;
      state.y += (this.pointer.y - state.y) * state.ease;
    });

    gsap.set(this.dot, { x: this.states.dot.x, y: this.states.dot.y });
    gsap.set(this.ring, { x: this.states.ring.x, y: this.states.ring.y });
    gsap.set(this.preview, { x: this.states.preview.x, y: this.states.preview.y });
  }

  setState(state, { label = 'View', image = '', accent = '#ffffff' } = {}) {
    this.root.dataset.state = state;
    this.label.textContent = label;
    this.previewImage.src = image;
    this.preview.style.setProperty('--preview-accent', accent);

    if (state === 'preview') {
      gsap.to(this.preview, {
        autoAlpha: 1,
        scale: 1,
        duration: this.reducedMotion ? 0 : 0.45,
        ease: 'power3.out'
      });
    } else {
      gsap.to(this.preview, {
        autoAlpha: 0,
        scale: 0.88,
        duration: this.reducedMotion ? 0 : 0.35,
        ease: 'power3.out'
      });
    }
  }

  tilt(dx, dy) {
    gsap.to(this.previewInner, {
      rotateY: dx,
      rotateX: dy,
      duration: this.reducedMotion ? 0 : 0.4,
      ease: 'power3.out'
    });
  }

  destroy() {
    this.cleanup?.();
    gsap.ticker.remove(this.render);
  }
}
