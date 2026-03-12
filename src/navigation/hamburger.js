export const initHamburger = (container, scroll) => {
  const toggles = container.querySelectorAll('[data-nav-toggle]');
  const overlay = container.querySelector('[data-nav-overlay]');
  const destroyers = [];

  const toggle = () => {
    container.classList.toggle('nav-active');
    if (container.classList.contains('nav-active')) scroll.stop();
    else scroll.start();
  };

  toggles.forEach((toggleButton) => {
    toggleButton.addEventListener('click', toggle);
    destroyers.push(() => toggleButton.removeEventListener('click', toggle));
  });

  overlay?.addEventListener('click', toggle);
  destroyers.push(() => overlay?.removeEventListener('click', toggle));

  return {
    destroy() {
      destroyers.forEach((destroy) => destroy());
    }
  };
};
