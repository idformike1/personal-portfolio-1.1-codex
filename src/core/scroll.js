import LocomotiveScroll from 'locomotive-scroll';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export class ScrollEngine {
  constructor(container) {
    this.container = container;
    this.scrollerElement = container.querySelector('[data-scroll-container]');
    this.instance = null;
    this.onResize = this.onResize.bind(this);
  }

  init() {
    this.instance = new LocomotiveScroll({
      el: this.scrollerElement,
      smooth: !window.matchMedia('(max-width: 767px)').matches,
      lerp: 0.09,
      tablet: { smooth: false },
      smartphone: { smooth: false }
    });

    this.instance.on('scroll', ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(this.scrollerElement, {
      scrollTop: (value) => {
        if (arguments.length) {
          this.instance.scrollTo(value, { duration: 0, disableLerp: true });
        }
        return this.instance.scroll.instance.scroll.y;
      },
      getBoundingClientRect: () => ({
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight
      }),
      pinType: this.scrollerElement.style.transform ? 'transform' : 'fixed'
    });

    ScrollTrigger.defaults({ scroller: this.scrollerElement });
    ScrollTrigger.addEventListener('refresh', () => this.instance?.update());
    window.addEventListener('resize', this.onResize);
    ScrollTrigger.refresh();
  }

  onResize() {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = window.setTimeout(() => this.update(), 120);
  }

  stop() {
    this.instance?.stop();
  }

  start() {
    this.instance?.start();
  }

  update() {
    this.instance?.update();
    ScrollTrigger.refresh();
  }

  scrollToTop() {
    this.instance?.scrollTo(0, { duration: 0.8, disableLerp: true });
  }

  destroy() {
    window.removeEventListener('resize', this.onResize);
    clearTimeout(this.resizeTimer);
    this.instance?.destroy();
  }
}
