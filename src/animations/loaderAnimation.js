import gsap from 'gsap';

const WORDS = ['Hello', 'Bonjour', 'Ciao', 'Hola', 'Hallo'];

export const runLoaderAnimation = ({ onComplete }) => {
  const loader = document.querySelector('[data-loader]');
  const wordsWrap = loader?.querySelector('[data-loader-words]');
  let completed = false;

  const finish = () => {
    if (completed) return;
    completed = true;
    loader?.remove();
    document.querySelector('.site-main')?.classList.remove('is-loading');
    onComplete?.();
  };

  if (!loader || !wordsWrap) {
    finish();
    return;
  }

  wordsWrap.innerHTML = WORDS.map((word) => `<span>${word}</span>`).join('');
  const words = wordsWrap.querySelectorAll('span');

  gsap.set(loader, { autoAlpha: 1, pointerEvents: 'auto' });
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
    .to(loader, {
      autoAlpha: 0,
      duration: 0.45,
      ease: 'power2.out'
    })
    .set(loader, { pointerEvents: 'none' });

  window.setTimeout(finish, 5000);
};
