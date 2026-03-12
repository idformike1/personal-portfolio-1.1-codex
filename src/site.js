import { ScrollEngine } from './core/scroll.js';
import { initCursor } from './animations/cursor.js';
import { initTextReveal } from './animations/textReveal.js';
import { initHoverAnimations } from './animations/hoverAnimations.js';
import { initRevealSections } from './animations/revealSections.js';

export const mountSite = (container) => {
  const scroll = new ScrollEngine(container);
  scroll.init();

  const cursor = initCursor(container);
  const textReveal = initTextReveal(container);
  const hover = initHoverAnimations(container, cursor, scroll);
  const reveals = initRevealSections(container, scroll);

  const cleanup = [cursor, textReveal, hover, reveals];

  return {
    scroll,
    destroy() {
      cleanup.forEach((item) => item?.destroy?.());
      scroll.destroy();
    }
  };
};
