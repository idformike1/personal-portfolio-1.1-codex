import { LocomotiveEngine } from './scroll/locomotive.js';
import { initScrollTriggers } from './scroll/scrollTriggers.js';
import { initCursor } from './animations/cursor.js';
import { initTextReveal } from './animations/textReveal.js';
import { initHoverEffects } from './animations/hoverEffects.js';
import { initHamburger } from './navigation/hamburger.js';
import { initMenuOverlay } from './navigation/menuOverlay.js';

export const mountSite = (container) => {
  const scroll = new LocomotiveEngine(container);
  scroll.init();

  const navigation = initHamburger(container, scroll);
  const menuOverlay = initMenuOverlay(container);
  const cursor = initCursor(container);
  const textReveal = initTextReveal(container);
  const hover = initHoverEffects(container, cursor, scroll);
  const reveals = initScrollTriggers(container, scroll);

  const cleanup = [navigation, menuOverlay, cursor, textReveal, hover, reveals];

  return {
    scroll,
    destroy() {
      cleanup.forEach((item) => item?.destroy?.());
      scroll.destroy();
    }
  };
};
