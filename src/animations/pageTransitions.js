import gsap from 'gsap';

export const initPageTransitions = ({ renderRoute, onMount, getMounted }) => {
  const wrapper = document.querySelector('[data-barba="wrapper"]');
  if (!wrapper) return;

  let isTransitioning = false;

  const scrollToHash = (hash) => {
    if (!hash) return;
    const target = document.querySelector(hash);
    if (!target) return;
    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const swapTo = async (path, { replace = false } = {}) => {
    const [nextPath, hash = ''] = path.split('#');
    const normalizedHash = hash ? `#${hash}` : '';

    if (!nextPath) return;

    if (isTransitioning) return;
    if (nextPath === window.location.pathname) {
      if (normalizedHash) {
        if (replace) window.history.replaceState({}, '', `${nextPath}${normalizedHash}`);
        else window.history.pushState({}, '', `${nextPath}${normalizedHash}`);
        scrollToHash(normalizedHash);
      }
      return;
    }
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
      if (replace) window.history.replaceState({}, '', `${nextPath}${normalizedHash}`);
      else window.history.pushState({}, '', `${nextPath}${normalizedHash}`);

      wrapper.insertAdjacentHTML('beforeend', renderRoute(nextPath));
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

      if (normalizedHash) scrollToHash(normalizedHash);
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
    const next = new URL(href, window.location.origin);
    swapTo(`${next.pathname}${next.hash}`);
  });

  window.addEventListener('popstate', () => {
    swapTo(`${window.location.pathname}${window.location.hash}`, { replace: true });
  });
};
