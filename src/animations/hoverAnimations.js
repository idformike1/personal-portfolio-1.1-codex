import gsap from 'gsap';

export const initHoverAnimations = (container, cursor, scroll) => {
  const destroyers = [];
  const navToggles = container.querySelectorAll('[data-nav-toggle]');
  const navOverlay = container.querySelector('[data-nav-overlay]');

  const toggleNav = () => {
    container.classList.toggle('nav-active');
    if (container.classList.contains('nav-active')) scroll.stop();
    else scroll.start();
  };

  navToggles.forEach((node) => {
    node.addEventListener('click', toggleNav);
    destroyers.push(() => node.removeEventListener('click', toggleNav));
  });

  navOverlay?.addEventListener('click', toggleNav);
  destroyers.push(() => navOverlay?.removeEventListener('click', toggleNav));

  const projectItems = [...container.querySelectorAll('[data-project-card], [data-project-row]')];
  projectItems.forEach((item) => {
    const image = item.querySelector('img');
    const title = item.querySelector('h3, h4');
    const enter = () => {
      cursor.setState(item.dataset.projectRow ? 'view project' : 'explore', item.dataset.preview, item.dataset.accent);
      gsap.to(image, { scale: 1.07, duration: 0.7, ease: 'power3.out' });
      gsap.to(title, { x: -12, duration: 0.45, ease: 'power3.out' });
    };
    const leave = () => {
      cursor.setState('default');
      gsap.to(image, { scale: 1, duration: 0.7, ease: 'power3.out' });
      gsap.to(title, { x: 0, duration: 0.45, ease: 'power3.out' });
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
      scroll.update();
    };
    button.addEventListener('click', onClick);
    destroyers.push(() => button.removeEventListener('click', onClick));
  });

  viewButtons.forEach((button) => {
    const onClick = () => {
      viewButtons.forEach((item) => item.classList.toggle('is-active', item === button));
      viewPanels.forEach((panel) => panel.classList.toggle('visible', panel.dataset.viewPanel === button.dataset.view));
      scroll.scrollToTop();
      scroll.update();
    };
    button.addEventListener('click', onClick);
    destroyers.push(() => button.removeEventListener('click', onClick));
  });

  const formatter = new Intl.DateTimeFormat([], {
    timeZone: 'Europe/Amsterdam',
    timeZoneName: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  const timeNode = container.querySelector('[data-local-time]');
  const updateTime = () => {
    if (timeNode) timeNode.textContent = formatter.format(new Date());
  };
  updateTime();
  const interval = window.setInterval(updateTime, 1000);

  return {
    destroy() {
      destroyers.forEach((fn) => fn());
      window.clearInterval(interval);
    }
  };
};
