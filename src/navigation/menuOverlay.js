import gsap from 'gsap';

export const initMenuOverlay = (container) => {
  const panel = container.querySelector('[data-nav-panel]');
  const links = panel?.querySelectorAll('.fixed-nav__links li');

  if (!panel || !links?.length) {
    return { destroy() {} };
  }

  let active = false;
  const observer = new MutationObserver(() => {
    const next = container.classList.contains('nav-active');
    if (next === active) return;
    active = next;
    gsap.to(links, {
      x: active ? 0 : 40,
      autoAlpha: active ? 1 : 0,
      duration: 0.45,
      stagger: 0.04,
      ease: 'power3.out'
    });
  });

  gsap.set(links, { x: 40, autoAlpha: 0 });
  observer.observe(container, { attributes: true, attributeFilter: ['class'] });

  return {
    destroy() {
      observer.disconnect();
    }
  };
};
