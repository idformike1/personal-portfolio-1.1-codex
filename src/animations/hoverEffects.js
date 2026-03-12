import gsap from 'gsap';

export const initHoverEffects = (container, cursor, scroll) => {
  const destroyers = [];
  const magneticButtons = [...container.querySelectorAll('.btn-round, .pill, .archive-pill, .view-toggle, .nav-bar__menu, .floating-menu, [data-magnetic]')];

  magneticButtons.forEach((button) => {
    const strength = button.classList.contains('btn-round') ? 24 : 14;
    const move = (event) => {
      const bounds = button.getBoundingClientRect();
      const x = (event.clientX - bounds.left - bounds.width / 2) / bounds.width;
      const y = (event.clientY - bounds.top - bounds.height / 2) / bounds.height;
      gsap.to(button, {
        x: x * strength,
        y: y * strength,
        duration: 0.35,
        ease: 'power3.out'
      });
    };
    const leave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.65,
        ease: 'elastic.out(1, 0.45)'
      });
    };
    button.addEventListener('pointermove', move);
    button.addEventListener('pointerleave', leave);
    destroyers.push(() => {
      button.removeEventListener('pointermove', move);
      button.removeEventListener('pointerleave', leave);
    });
  });

  const projectItems = [...container.querySelectorAll('[data-project-card], [data-project-row]')];
  projectItems.forEach((item) => {
    const image = item.querySelector('img');
    const title = item.querySelector('h3, h4');

    const enter = () => {
      cursor.setState(item.dataset.projectRow ? 'view project' : 'explore', item.dataset.preview, item.dataset.accent);
      if (image) gsap.to(image, { scale: 1.07, duration: 0.7, ease: 'power3.out' });
      if (title) gsap.to(title, { x: -12, duration: 0.45, ease: 'power3.out' });
    };

    const leave = () => {
      cursor.setState('default');
      if (image) gsap.to(image, { scale: 1, x: 0, y: 0, duration: 0.7, ease: 'power3.out' });
      if (title) gsap.to(title, { x: 0, duration: 0.45, ease: 'power3.out' });
    };

    const move = (event) => {
      if (!image) return;
      const bounds = item.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 16;
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 16;
      gsap.to(image, { x, y, duration: 0.5, ease: 'power3.out' });
      cursor.tilt(x * 0.35, y * -0.35);
    };

    item.addEventListener('mouseenter', enter);
    item.addEventListener('mouseleave', leave);
    item.addEventListener('mousemove', move);

    destroyers.push(() => {
      item.removeEventListener('mouseenter', enter);
      item.removeEventListener('mouseleave', leave);
      item.removeEventListener('mousemove', move);
    });
  });

  const filterButtons = [...container.querySelectorAll('[data-filter]')];
  const viewButtons = [...container.querySelectorAll('[data-view]')];
  const viewPanels = [...container.querySelectorAll('[data-view-panel]')];
  const filterTargets = [...container.querySelectorAll('[data-categories]')];

  filterButtons.forEach((button) => {
    const onClick = () => {
      filterButtons.forEach((item) => item.classList.toggle('is-active', item === button));
      const filter = button.dataset.filter;
      filterTargets.forEach((item) => {
        const visible = filter === 'all' || item.dataset.categories.includes(filter);
        item.classList.toggle('visible', visible);
        item.classList.toggle('is-hidden', !visible);
      });
      window.requestAnimationFrame(() => scroll.update());
    };

    button.addEventListener('click', onClick);
    destroyers.push(() => button.removeEventListener('click', onClick));
  });

  viewButtons.forEach((button) => {
    const onClick = () => {
      viewButtons.forEach((item) => item.classList.toggle('is-active', item === button));
      viewPanels.forEach((panel) => panel.classList.toggle('visible', panel.dataset.viewPanel === button.dataset.view));
      scroll.scrollToTop();
      window.requestAnimationFrame(() => scroll.update());
    };

    button.addEventListener('click', onClick);
    destroyers.push(() => button.removeEventListener('click', onClick));
  });

  return {
    destroy() {
      destroyers.forEach((destroy) => destroy());
    }
  };
};
