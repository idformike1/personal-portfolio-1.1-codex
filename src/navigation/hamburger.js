import gsap from 'gsap';

export const initHamburger = (container, scroll) => {
  const toggles = container.querySelectorAll('[data-nav-toggle]');
  const overlay = container.querySelector('[data-nav-overlay]');
  const floating = container.querySelector('.floating-menu');
  const navLinks = container.querySelectorAll('.fixed-nav a[data-route-link], .nav-bar a[data-route-link]');
  const destroyers = [];
  let visible = false;

  const showFloating = (nextVisible) => {
    if (!floating || nextVisible === visible) return;
    visible = nextVisible;
    gsap.to(floating, {
      autoAlpha: visible ? 1 : 0,
      scale: visible ? 1 : 0.72,
      duration: 0.35,
      ease: 'power3.out',
      overwrite: 'auto'
    });
  };

  const toggle = () => {
    container.classList.toggle('nav-active');
    if (container.classList.contains('nav-active')) scroll.stop();
    else scroll.start();
    if (container.classList.contains('nav-active')) showFloating(true);
  };

  floating && gsap.set(floating, { autoAlpha: 0, scale: 0.72 });

  const offScroll = scroll.onScroll?.(({ y }) => {
    showFloating(y >= 100);
  });

  toggles.forEach((toggleButton) => {
    toggleButton.addEventListener('click', toggle);
    destroyers.push(() => toggleButton.removeEventListener('click', toggle));
  });

  overlay?.addEventListener('click', toggle);
  destroyers.push(() => overlay?.removeEventListener('click', toggle));

  navLinks.forEach((link) => {
    const onNav = () => {
      if (!container.classList.contains('nav-active')) return;
      container.classList.remove('nav-active');
      scroll.start();
      showFloating(true);
    };
    link.addEventListener('click', onNav);
    destroyers.push(() => link.removeEventListener('click', onNav));
  });

  return {
    destroy() {
      offScroll?.();
      destroyers.forEach((destroy) => destroy());
    }
  };
};
