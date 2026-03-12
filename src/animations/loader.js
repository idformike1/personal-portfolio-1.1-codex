import gsap from 'gsap';

export const initLoader = ({ onComplete }) => {
  const loader = document.querySelector('[data-loader]');
  const words = loader?.querySelectorAll('[data-loader-words] span');
  let completed = false;

  const finish = () => {
    if (completed) return;
    completed = true;
    loader?.remove();
    document.querySelector('.site-main')?.classList.remove('is-loading');
    onComplete?.();
  };

  if (!loader || !words?.length) {
    finish();
    return;
  }

  gsap.set(loader, { autoAlpha: 1, yPercent: 0, pointerEvents: 'auto' });
  gsap.set(words, { autoAlpha: 0, yPercent: 100 });

  const timeline = gsap.timeline({
    defaults: { ease: 'power4.out' },
    onComplete: finish
  });

  words.forEach((word) => {
    timeline
      .to(word, { autoAlpha: 1, yPercent: 0, duration: 0.28 })
      .to(word, { autoAlpha: 0, yPercent: -100, duration: 0.22 }, '+=0.08');
  });

  timeline
    .to(
      loader,
      {
        clipPath: 'ellipse(120% 0% at 50% 0%)',
        duration: 1.1,
        ease: 'expo.inOut'
      },
      '+=0.05'
    )
    .set(loader, { autoAlpha: 0, pointerEvents: 'none' });

  window.setTimeout(finish, 5000);
};
