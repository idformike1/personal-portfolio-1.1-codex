import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollController } from './scrollController.js';
import { InteractionController } from './interactionController.js';
import { initTextReveal } from '../animations/textReveal.js';
import { initHeroAnimation } from '../animations/heroAnimation.js';
import { initSectionReveal } from '../animations/sectionReveal.js';
import { initFooterReveal } from '../animations/footerReveal.js';

gsap.registerPlugin(ScrollTrigger);
gsap.defaults({
  duration: 0.6,
  ease: 'power3.out'
});

export class MotionEngine {
  constructor(container) {
    this.container = container;
    this.cleanups = [];
  }

  init() {
    this.scrollController = new ScrollController(this.container).init();
    this.interactionController = new InteractionController(this.container, this.scrollController).init();

    this.cleanups.push(initHeroAnimation(this.container, this.scrollController));
    this.cleanups.push(initTextReveal(this.container, this.scrollController));
    this.cleanups.push(initSectionReveal(this.container, this.scrollController));
    this.cleanups.push(initFooterReveal(this.container, this.scrollController));
    this.cleanups.push(this.initLocalTime());
    this.scrollController.update();

    return this;
  }

  initLocalTime() {
    const node = this.container.querySelector('[data-local-time]');
    if (!node) return { destroy() {} };

    const update = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      node.textContent = `Local time: ${hours}:${minutes}`;
    };

    update();
    const timer = window.setInterval(update, 1000 * 30);

    return {
      destroy() {
        window.clearInterval(timer);
      }
    };
  }

  get scroll() {
    return this.scrollController;
  }

  destroy() {
    this.cleanups.forEach((cleanup) => cleanup?.destroy?.());
    this.cleanups = [];
    this.interactionController?.destroy?.();
    this.scrollController?.destroy?.();
  }
}
