import gsap from 'gsap';

export const createTransitionEngine = ({ orchestrator, render }) => ({
  name: 'page-transition',
  async leave(data) {
    await orchestrator.transitionOut(data.current.container);
    data.current.container.remove();
  },
  async enter() {
    const wrapper = document.querySelector('[data-barba="wrapper"]');
    wrapper.insertAdjacentHTML('beforeend', render());
  },
  async afterEnter() {
    const next = document.querySelector('[data-barba="container"]');
    orchestrator.mount(next);
    await orchestrator.transitionIn(next);
  },
  once({ next }) {
    gsap.set(next.container, { autoAlpha: 1 });
  }
});
