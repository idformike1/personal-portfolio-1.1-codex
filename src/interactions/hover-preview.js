import gsap from 'gsap';

export const initHoverPreview = (root, cursor) => {
  const rows = [...root.querySelectorAll('[data-project-row]')];
  const listeners = [];

  rows.forEach((row) => {
    const enter = () => {
      root.style.setProperty('--surface-accent', row.dataset.accent);
      row.classList.add('is-expanded');
      cursor.setState('preview', {
        label: 'View',
        image: row.dataset.image,
        accent: row.dataset.accent
      });
    };

    const leave = () => {
      row.classList.remove('is-expanded');
      cursor.setState('default');
    };

    const move = (event) => {
      const bounds = row.getBoundingClientRect();
      const dx = ((event.clientX - bounds.left) / bounds.width - 0.5) * 12;
      const dy = ((event.clientY - bounds.top) / bounds.height - 0.5) * -12;
      cursor.tilt(dx, dy);
    };

    row.addEventListener('mouseenter', enter);
    row.addEventListener('mouseleave', leave);
    row.addEventListener('mousemove', move);

    listeners.push(() => {
      row.removeEventListener('mouseenter', enter);
      row.removeEventListener('mouseleave', leave);
      row.removeEventListener('mousemove', move);
    });
  });

  return () => listeners.forEach((off) => off());
};
