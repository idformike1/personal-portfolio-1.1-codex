import gsap from 'gsap';

export const initPageTransitions = ({ renderRoute, onMount, getMounted }) => {
  const wrapper = document.querySelector('[data-barba="wrapper"]');
  if (!wrapper) return;

  let isTransitioning = false;

  const swapTo = async (path, { replace = false } = {}) => {
    if (isTransitioning || path === window.location.pathname) return;
    isTransitioning = true;

    const current = wrapper.querySelector('[data-barba="container"]');
    const mounted = getMounted?.();

    try {
      await gsap.to(current, {
        autoAlpha: 0,
        y: -48,
        duration: 0.45,
        ease: 'power3.inOut'
      });

      mounted?.destroy?.();
      current?.remove();
      if (replace) window.history.replaceState({}, '', path);
      else window.history.pushState({}, '', path);

      wrapper.insertAdjacentHTML('beforeend', renderRoute(path));
      const next = wrapper.querySelector('[data-barba="container"]:last-child');
      onMount(next);

      await gsap.fromTo(
        next,
        { autoAlpha: 0, clipPath: 'inset(0 0 100% 0)' },
        {
          autoAlpha: 1,
          clipPath: 'inset(0 0 0% 0)',
          duration: 0.8,
          ease: 'expo.out'
        }
      );
    } finally {
      isTransitioning = false;
    }
  };

  document.addEventListener('click', (event) => {
    const link = event.target.closest('[data-route-link]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
    event.preventDefault();
    swapTo(new URL(href, window.location.origin).pathname);
  });

  window.addEventListener('popstate', () => {
    swapTo(window.location.pathname, { replace: true });
  });
};
