import { initHamburger } from '../navigation/hamburger.js';
import { initMenuOverlay } from '../navigation/menuOverlay.js';
import { CursorSystem } from '../interactions/cursorSystem.js';
import { ButtonMagnet } from '../interactions/buttonMagnet.js';
import { HoverPreview } from '../interactions/hoverPreview.js';
import { HighlightAnimations } from '../interactions/highlightAnimations.js';

export class InteractionController {
  constructor(container, scrollController) {
    this.container = container;
    this.scrollController = scrollController;
    this.parts = [];
  }

  init() {
    const cursor = new CursorSystem(this.container).init();
    this.parts.push(cursor);
    this.parts.push(new ButtonMagnet(this.container, cursor).init());
    this.parts.push(new HoverPreview(this.container, cursor).init());
    this.parts.push(new HighlightAnimations(this.container).init());
    this.parts.push(initHamburger(this.container, this.scrollController));
    this.parts.push(initMenuOverlay(this.container));
    return this;
  }

  destroy() {
    this.parts.forEach((part) => part?.destroy?.());
    this.parts = [];
  }
}
