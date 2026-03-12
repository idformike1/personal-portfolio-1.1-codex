import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const initScrollTriggers = (container, scroll) => {
  const animations = [];
  const sections = [...container.querySelectorAll('[data-scroll-section]')];
  const siteMain = document.querySelector('.site-main');
  const setScrollState = (scrollY) => {
    siteMain?.classList.toggle('scrolled', scrollY > 64);
    siteMain?.classList.toggle('at-top', scrollY <= 64);
  };

  sections.forEach((section) => {
    const targets = section.querySelectorAll('.reveal-up, [data-project-row], .work-tile');
    if (!targets.length) return;

    const tween = gsap.from(targets, {
      y: 64,
      autoAlpha: 0,
      stagger: 0.06,
      duration: 0.95,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 82%',
        scroller: scroll.scrollerElement
      }
    });
    animations.push(tween);
  });

  const featuredItems = container.querySelectorAll('.featured-work__item');
  if (featuredItems.length) {
    gsap.set(featuredItems, { clearProps: 'all', autoAlpha: 1 });
  }

  const marquee = container.querySelector('[data-marquee-track]');
  if (marquee) {
    marquee.innerHTML += marquee.innerHTML;
    animations.push(
      gsap.to(marquee, {
        xPercent: -50,
        duration: 18,
        repeat: -1,
        ease: 'none'
      })
    );
  }

  const homeTrack = container.querySelector('[data-home-marquee]');
  if (homeTrack) {
    homeTrack.innerHTML += homeTrack.innerHTML;
    let offset = 0;
    let direction = -1;
    const tick = () => {
      offset += 0.035 * direction;
      if (offset <= -50) offset = 0;
      if (offset > 0) offset = -50;
      gsap.set(homeTrack, { xPercent: offset });
    };

    gsap.ticker.add(tick);
    animations.push({
      kill() {
        gsap.ticker.remove(tick);
      }
    });

    if (scroll.instance) {
      let lastY = scroll.instance.scroll?.y ?? scroll.instance.scroll?.instance?.scroll?.y ?? 0;
      const syncDirection = (instance) => {
        const scrollY = instance.scroll?.y ?? instance.scroll?.instance?.scroll?.y ?? 0;
        direction = scrollY < lastY ? 1 : -1;
        lastY = scrollY;
        setScrollState(scrollY);
      };

      scroll.instance.on('scroll', syncDirection);
      setScrollState(scroll.instance.scroll?.y ?? scroll.instance.scroll?.instance?.scroll?.y ?? 0);
      animations.push({
        kill() {
          scroll.instance?.off?.('scroll', syncDirection);
        }
      });
    }
  } else if (scroll.instance) {
    const syncHamburger = (instance) => {
      const scrollY = instance.scroll?.y ?? instance.scroll?.instance?.scroll?.y ?? 0;
      setScrollState(scrollY);
    };
    scroll.instance.on('scroll', syncHamburger);
    setScrollState(scroll.instance.scroll?.y ?? scroll.instance.scroll?.instance?.scroll?.y ?? 0);
    animations.push({
      kill() {
        scroll.instance?.off?.('scroll', syncHamburger);
      }
    });
  }

  return {
    destroy() {
      animations.forEach((animation) => animation.kill());
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    }
  };
};
