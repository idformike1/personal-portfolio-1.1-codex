export const createScrollTriggers = (container, scroll, config = {}) => {
  const siteMain = document.querySelector('.site-main');
  const onScroll = ({ y }) => {
    siteMain?.classList.toggle('scrolled', y > 64);
    siteMain?.classList.toggle('at-top', y <= 64);
    config.onScroll?.({ y });
  };

  scroll.onScroll(onScroll);
  onScroll({ y: scroll.getScrollY?.() ?? 0 });

  return {
    destroy() {
      scroll.offScroll(onScroll);
    }
  };
};
