import gsap from 'gsap';

export const initMarquee = (root, scroll, reducedMotion) => {
  const track = root.querySelector('[data-marquee-track]');
  if (!track) return () => {};

  track.innerHTML += track.innerHTML;

  let direction = -1;
  const tween = gsap.to(track, {
    xPercent: -50,
    repeat: -1,
    duration: reducedMotion ? 40 : 18,
    ease: 'none'
  });

  const interval = window.setInterval(() => {
    const velocity = Math.max(1, Math.abs(scroll.getVelocity()));
    const nextDirection = scroll.getVelocity() >= 0 ? -1 : 1;
    if (nextDirection !== direction) {
      direction = nextDirection;
      gsap.to(tween, { timeScale: direction * Math.min(3.5, 1 + velocity * 0.18), duration: 0.4, ease: 'power2.out' });
    } else {
      gsap.to(tween, { timeScale: direction * Math.min(3.5, 1 + velocity * 0.18), duration: 0.3, ease: 'power2.out' });
    }
  }, 120);

  return () => {
    window.clearInterval(interval);
    tween.kill();
  };
};
