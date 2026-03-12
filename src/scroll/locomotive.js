import LocomotiveScroll from 'locomotive-scroll';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export class LocomotiveEngine {
  constructor(container) {
    this.container = container;
    this.scrollerElement = container.querySelector('[data-scroll-container]');
    this.instance = null;
    this.onResize = this.onResize.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  init() {
    if (!this.scrollerElement) return;

    this.instance = new LocomotiveScroll({
      el: this.scrollerElement,
      smooth: false,
      lerp: 0.09,
      tablet: { smooth: false },
      smartphone: { smooth: false }
    });

    this.instance.on('scroll', ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(this.scrollerElement, {
      scrollTop: (value) => {
        if (value !== undefined) {
          this.instance.scrollTo(value, { duration: 0, disableLerp: true });
          return value;
        }
        return this.getScrollY();
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
    ScrollTrigger.addEventListener('refresh', this.onRefresh);
    window.addEventListener('resize', this.onResize);
    ScrollTrigger.refresh();
  }

  getScrollY() {
    if (!this.instance) return window.scrollY || 0;
    return this.instance.scroll?.y
      ?? this.instance.scroll?.instance?.scroll?.y
      ?? this.instance.scroll?.instance?.delta?.y
      ?? 0;
  }

  onRefresh() {
    this.instance?.update();
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
    if (!this.instance) return;
    this.instance.update();
    ScrollTrigger.refresh();
  }

  scrollToTop() {
    this.instance?.scrollTo(0, { duration: 0.8, disableLerp: true });
  }

  destroy() {
    window.removeEventListener('resize', this.onResize);
    clearTimeout(this.resizeTimer);
    ScrollTrigger.removeEventListener('refresh', this.onRefresh);
    this.instance?.destroy();
    this.instance = null;
  }
}
