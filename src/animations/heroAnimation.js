import gsap from 'gsap';

export const initHeroAnimation = (container, scrollController) => {
  const track = container.querySelector('[data-home-marquee]');
  const siteMain = document.querySelector('.site-main');

  if (!track) {
    const onScroll = ({ y }) => {
      siteMain?.classList.toggle('scrolled', y > 64);
      siteMain?.classList.toggle('at-top', y <= 64);
    };
    const off = scrollController.onScroll(onScroll);
    onScroll({ y: scrollController.instance ? scrollController.instance.scroll?.y ?? 0 : 0 });
    return { destroy: off };
  }

  track.innerHTML += track.innerHTML;
  let offset = 0;
  let velocity = 0.06;

  const tick = () => {
    offset += velocity;
    if (offset >= 50) offset -= 50;
    if (offset <= 0) offset += 50;
    gsap.set(track, { xPercent: -offset });
  };

  const onScroll = ({ y, lastY }) => {
    const delta = y - lastY;
    const targetVelocity = delta > 0 ? -0.1 : delta < 0 ? 0.1 : velocity;
    velocity += (targetVelocity - velocity) * 0.2;
    siteMain?.classList.toggle('scrolled', y > 64);
    siteMain?.classList.toggle('at-top', y <= 64);
  };

  gsap.ticker.add(tick);
  const off = scrollController.onScroll(onScroll);

  return {
    destroy() {
      gsap.ticker.remove(tick);
      off?.();
    }
  };
};
