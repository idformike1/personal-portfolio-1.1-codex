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
  let direction = 1;

  const tick = () => {
    offset += 0.06 * direction;
    if (offset >= 50) offset = 0;
    if (offset <= 0) offset = 50;
    gsap.set(track, { xPercent: -offset });
  };

  const onScroll = ({ y, lastY }) => {
    direction = y > lastY ? -1 : 1;
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
