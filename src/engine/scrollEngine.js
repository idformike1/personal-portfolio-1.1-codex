import { LocomotiveEngine } from '../scroll/locomotive.js';
import { createScrollTriggers } from '../scroll/scrollTriggers.js';

export class ScrollEngineController {
  constructor(container) {
    this.container = container;
    this.engine = new LocomotiveEngine(container);
    this.triggers = null;
  }

  init(config = {}) {
    this.engine.init();
    this.triggers = createScrollTriggers(this.container, this.engine, config);
    return this;
  }

  onScroll(callback) {
    this.engine.onScroll(callback);
    return () => this.engine.offScroll(callback);
  }

  get scrollerElement() {
    return this.engine.scrollerElement;
  }

  get instance() {
    return this.engine.instance;
  }

  update() {
    this.engine.update();
  }

  stop() {
    this.engine.stop();
  }

  start() {
    this.engine.start();
  }

  scrollToTop() {
    this.engine.scrollToTop();
  }

  destroy() {
    this.triggers?.destroy?.();
    this.engine.destroy();
  }
}
