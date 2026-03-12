import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollEngine } from './scroll.js';
import { CursorEngine } from './cursor.js';
import { initMagneticInteractions } from '../interactions/magnetic.js';
import { initHoverPreview } from '../interactions/hover-preview.js';
import { initCursorPhysics } from '../interactions/cursor-physics.js';
import { initParallaxEngine } from '../interactions/parallax-engine.js';
import { initMarquee } from '../animations/marquee.js';
import { initTextReveal } from '../animations/text-reveal.js';
import { initParallaxAnimations } from '../animations/parallax.js';

export class MotionOrchestrator {
  constructor({ reducedMotion = false }) {
    this.reducedMotion = reducedMotion;
    this.scroll = null;
    this.cursor = null;
    this.cleanups = [];
  }

  mount(container) {
    this.destroy();
    this.container = container;
    this.scrollRoot = container.querySelector('[data-scroll-root]');
    this.scroll = new ScrollEngine({
      root: this.scrollRoot,
      reducedMotion: this.reducedMotion
    });
    this.cursor = new CursorEngine({
      root: container,
      reducedMotion: this.reducedMotion
    });

    this.scroll.init();
    this.cursor.init();
    this.initSections();
    this.initUtilities();
  }

  initSections() {
    this.cleanups.push(initMagneticInteractions(this.container));
    this.cleanups.push(initHoverPreview(this.container, this.cursor));
    this.cleanups.push(initCursorPhysics(this.container, this.cursor));
    this.cleanups.push(initParallaxEngine(this.container, this.scroll));
    this.cleanups.push(initMarquee(this.container, this.scroll, this.reducedMotion));
    this.cleanups.push(initTextReveal(this.container, this.reducedMotion));
    this.cleanups.push(initParallaxAnimations(this.container, this.reducedMotion));

    const footerCurve = this.container.querySelector('.footer-curve');
    if (footerCurve) {
      gsap.to(footerCurve, {
        borderTopLeftRadius: '50% 100%',
        borderTopRightRadius: '50% 100%',
        scrollTrigger: {
          trigger: footerCurve,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true
        }
      });
    }

    const hero = this.container.querySelector('.hero');
    const floatingMenu = this.container.querySelector('.floating-menu');
    if (hero && floatingMenu) {
      ScrollTrigger.create({
        trigger: hero,
        start: 'bottom top+=120',
        onEnter: () => floatingMenu.classList.add('is-visible'),
        onLeaveBack: () => floatingMenu.classList.remove('is-visible')
      });
    }
  }

  initUtilities() {
    const navToggles = this.container.querySelectorAll('[data-nav-toggle]');
    const navOverlay = this.container.querySelector('[data-nav-overlay]');
    const container = this.container;

    const toggleNav = () => {
      container.classList.toggle('nav-open');
      if (container.classList.contains('nav-open')) this.scroll.stop();
      else this.scroll.start();
    };

    navToggles.forEach((button) => button.addEventListener('click', toggleNav));
    navOverlay?.addEventListener('click', toggleNav);

    const filterButtons = [...this.container.querySelectorAll('[data-filter]')];
    const viewButtons = [...this.container.querySelectorAll('[data-view]')];
    const rows = [...this.container.querySelectorAll('[data-project-row], [data-gallery-card]')];
    const panels = [...this.container.querySelectorAll('[data-view-panel]')];

    filterButtons.forEach((button) =>
      button.addEventListener('click', () => {
        filterButtons.forEach((item) => item.classList.toggle('is-active', item === button));
        const value = button.dataset.filter;
        rows.forEach((row) => {
          const show = value === 'all' || row.dataset.categories.includes(value);
          row.classList.toggle('is-hidden', !show);
        });
        this.scroll.refresh();
        ScrollTrigger.refresh();
      })
    );

    viewButtons.forEach((button) =>
      button.addEventListener('click', () => {
        viewButtons.forEach((item) => item.classList.toggle('is-active', item === button));
        panels.forEach((panel) => panel.classList.toggle('is-active', panel.dataset.viewPanel === button.dataset.view));
        this.scroll.scrollToTop();
        this.scroll.refresh();
        ScrollTrigger.refresh();
      })
    );

    const timeNode = this.container.querySelector('[data-local-time]');
    if (timeNode) {
      const formatter = new Intl.DateTimeFormat([], {
        timeZone: 'Europe/Amsterdam',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZoneName: 'short'
      });
      const update = () => {
        timeNode.textContent = formatter.format(new Date());
      };
      update();
      const interval = window.setInterval(update, 1000);
      this.cleanups.push(() => window.clearInterval(interval));
    }
  }

  transitionOut(container) {
    this.scroll?.stop();
    document.querySelector('.site-main')?.classList.add('is-transitioning');
    return gsap
      .timeline()
      .to('[data-transition-screen]', {
        yPercent: 0,
        duration: this.reducedMotion ? 0 : 0.7,
        ease: 'power4.inOut'
      })
      .to(
        container,
        {
          yPercent: -10,
          autoAlpha: 0,
          duration: this.reducedMotion ? 0 : 0.45,
          ease: 'power3.inOut'
        },
        0
      );
  }

  transitionIn(container) {
    this.scroll?.scrollToTop(true);
    this.scroll?.start();
    return gsap
      .timeline()
      .fromTo(
        container,
        { autoAlpha: 0, yPercent: 8 },
        {
          autoAlpha: 1,
          yPercent: 0,
          duration: this.reducedMotion ? 0 : 0.8,
          ease: 'expo.out'
        }
      )
      .to(
        '[data-transition-screen]',
        {
          yPercent: -110,
          duration: this.reducedMotion ? 0 : 0.8,
          ease: 'power4.inOut',
          onComplete: () => document.querySelector('.site-main')?.classList.remove('is-transitioning')
        },
        0.1
      );
  }

  destroy() {
    this.cleanups.forEach((cleanup) => cleanup?.());
    this.cleanups = [];
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    this.scroll?.destroy();
    this.cursor?.destroy();
  }
}
