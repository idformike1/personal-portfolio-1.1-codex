import gsap from 'gsap';

export const initHamburger = (container, scroll) => {
  const toggles = container.querySelectorAll('[data-nav-toggle]');
  const overlay = container.querySelector('[data-nav-overlay]');
  const floating = container.querySelector('.floating-menu');
  const navLinks = container.querySelectorAll('.fixed-nav a[data-route-link], .nav-bar a[data-route-link]');
  const destroyers = [];

  const toggle = () => {
    container.classList.toggle('nav-active');
    if (container.classList.contains('nav-active')) scroll.stop();
    else scroll.start();
  };

  // Ensure route swaps don't leave stale inline styles that can permanently hide the button.
  if (floating) gsap.set(floating, { clearProps: 'opacity,visibility,transform' });

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
    };
    link.addEventListener('click', onNav);
    destroyers.push(() => link.removeEventListener('click', onNav));
  });

  return {
    destroy() {
      destroyers.forEach((destroy) => destroy());
    }
  };
};
