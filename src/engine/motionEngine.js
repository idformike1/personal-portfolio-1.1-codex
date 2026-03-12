import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollEngineController } from './scrollEngine.js';
import { InteractionController } from './interactionController.js';
import { initTextReveal } from '../animations/textReveal.js';
import { initHeroAnimation } from '../animations/heroAnimation.js';
import { initSectionReveal } from '../animations/sectionReveal.js';

gsap.registerPlugin(ScrollTrigger);

export class MotionEngine {
  constructor(container) {
    this.container = container;
    this.cleanups = [];
  }

  init() {
    this.scrollController = new ScrollEngineController(this.container).init();
    this.interactionController = new InteractionController(this.container, this.scrollController).init();

    this.cleanups.push(initHeroAnimation(this.container, this.scrollController));
    this.cleanups.push(initTextReveal(this.container, this.scrollController));
    this.cleanups.push(initSectionReveal(this.container, this.scrollController));

    return this;
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
