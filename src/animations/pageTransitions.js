import gsap from 'gsap';

export const initPageTransitions = ({ barba, renderRoute, onMount, getMounted }) => {
  barba.init({
    preventRunning: true,
    transitions: [
      {
        name: 'route-swap',
        async leave(data) {
          const current = data.current.container;
          await gsap.to(current, {
            autoAlpha: 0,
            y: -80,
            duration: 0.55,
            ease: 'power3.inOut'
          });
          getMounted?.()?.destroy?.();
          current.remove();
        },
        async enter(data) {
          const wrapper = document.querySelector('[data-barba="wrapper"]');
          const path = data.next.url.path;
          window.history.replaceState({}, '', path);
          wrapper.insertAdjacentHTML('beforeend', renderRoute(path));
          const next = wrapper.querySelector('[data-barba="container"]:last-child');
          onMount(next);
          await gsap.fromTo(
            next,
            {
              autoAlpha: 0,
              clipPath: 'inset(0 0 100% 0)'
            },
            {
              autoAlpha: 1,
              clipPath: 'inset(0 0 0% 0)',
              duration: 0.85,
              ease: 'expo.out'
            }
          );
        }
      }
    ]
  });
};
