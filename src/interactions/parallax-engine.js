import gsap from 'gsap';

export const initParallaxEngine = (root, scroll) => {
  const media = [...root.querySelectorAll('.gallery-card__media, .cursor-preview__inner')];
  const onMove = (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 8;
    const y = (event.clientY / window.innerHeight - 0.5) * 8;
    gsap.to(media, {
      x,
      y: y + scroll.getVelocity() * 0.5,
      duration: 0.9,
      ease: 'power3.out',
      overwrite: true
    });
  };

  window.addEventListener('mousemove', onMove);
  return () => window.removeEventListener('mousemove', onMove);
};
