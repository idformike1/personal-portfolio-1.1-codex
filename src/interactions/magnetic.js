import gsap from 'gsap';

export const initMagneticInteractions = (root) => {
  const nodes = [...root.querySelectorAll('[data-magnetic]')];
  const listeners = [];

  if (window.matchMedia('(pointer: coarse)').matches) return () => {};

  nodes.forEach((node) => {
    const text = node.querySelector('span, strong, .btn-text');
    const move = (event) => {
      const bounds = node.getBoundingClientRect();
      const strength = Number(node.dataset.strength || 30);
      const textStrength = Number(node.dataset.strengthText || strength / 2);
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * strength;
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * strength;
      gsap.to(node, { x, y, duration: 0.8, ease: 'power3.out' });
      if (text) gsap.to(text, { x: x * (textStrength / strength), y: y * (textStrength / strength), duration: 0.8, ease: 'power3.out' });
    };
    const leave = () => {
      gsap.to([node, text], { x: 0, y: 0, duration: 1.2, ease: 'elastic.out(1, 0.45)' });
    };

    node.addEventListener('mousemove', move);
    node.addEventListener('mouseleave', leave);
    listeners.push(() => {
      node.removeEventListener('mousemove', move);
      node.removeEventListener('mouseleave', leave);
    });
  });

  return () => listeners.forEach((off) => off());
};
