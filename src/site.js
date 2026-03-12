import { MotionEngine } from './engine/motionEngine.js';

export const mountSite = (container) => {
  const motion = new MotionEngine(container).init();

  return {
    scroll: motion.scroll,
    destroy() {
      motion.destroy();
    }
  };
};
