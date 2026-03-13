import { initPageTransitions } from '../animations/pageTransitions.js';

export class TransitionEngine {
  constructor(config) {
    this.config = config;
    this.instance = null;
  }

  init() {
    this.instance = initPageTransitions(this.config);
    return this.instance;
  }
}
