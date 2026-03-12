import { initCursor } from '../animations/cursor.js';
import { initHoverEffects } from '../animations/hoverEffects.js';
import { initHamburger } from '../navigation/hamburger.js';
import { initMenuOverlay } from '../navigation/menuOverlay.js';

export class InteractionController {
  constructor(container, scrollController) {
    this.container = container;
    this.scrollController = scrollController;
    this.parts = [];
  }

  init() {
    const cursor = initCursor(this.container);
    this.parts.push(cursor);
    this.parts.push(initHoverEffects(this.container, cursor, this.scrollController));
    this.parts.push(initHamburger(this.container, this.scrollController));
    this.parts.push(initMenuOverlay(this.container));
    return this;
  }

  destroy() {
    this.parts.forEach((part) => part?.destroy?.());
    this.parts = [];
  }
}
