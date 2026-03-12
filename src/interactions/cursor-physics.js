export const initCursorPhysics = (root, cursor) => {
  const interactive = [...root.querySelectorAll('a, button')];
  const listeners = [];

  interactive.forEach((node) => {
    const enter = () => cursor.setState('hover', { label: node.dataset.cursorLabel || 'Open' });
    const leave = () => cursor.setState('default');
    node.addEventListener('mouseenter', enter);
    node.addEventListener('mouseleave', leave);
    listeners.push(() => {
      node.removeEventListener('mouseenter', enter);
      node.removeEventListener('mouseleave', leave);
    });
  });

  return () => listeners.forEach((off) => off());
};
