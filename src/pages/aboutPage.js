import { renderFooter, renderShell } from './shared.js';

export const buildAboutPage = () => `
  ${renderShell({ namespace: 'about' })}
    <section class="default-header about-header" data-scroll-section>
      <div class="container medium">
        <div class="row">
          <div class="flex-col">
            <h1 data-split="lines">
              <span>Helping brands thrive</span>
              <span>in the digital world</span>
            </h1>
          </div>
        </div>
        <div class="row about-header__copy">
          <div class="flex-col">
            <p>
              I combine design, development and motion to build next-level digital products.
              Based in The Netherlands, working globally.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="about-services section" data-scroll-section>
      <div class="container">
        <div class="row about-services__head">
          <div class="flex-col">
            <p class="eyebrow">Services</p>
            <h2 data-split="chars">I can help you with</h2>
          </div>
        </div>

        <div class="about-services__grid">
          <article class="about-card" data-reveal>
            <h4>Design</h4>
            <p>UX, UI and visual identity for web products with clear hierarchy and strong typography.</p>
          </article>
          <article class="about-card" data-reveal>
            <h4>Development</h4>
            <p>Modern front-end engineering with performance-first motion and interaction systems.</p>
          </article>
          <article class="about-card" data-reveal>
            <h4>Animation</h4>
            <p>GSAP-based timelines, scroll-driven scenes, and micro-interactions with premium feel.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="about-awwwards section theme-dark" data-scroll-section>
      <div class="container">
        <div class="row">
          <div class="flex-col">
            <p class="eyebrow">Recognition</p>
            <h2 data-split="chars">Awwwards Jury</h2>
            <p class="about-awwwards__copy">
              I occasionally review and vote on sites as part of the Awwwards jury.
            </p>
            <a class="archive-pill" href="https://www.awwwards.com/" target="_blank" rel="noreferrer">
              Visit Awwwards
            </a>
          </div>
        </div>
      </div>
    </section>
  ${renderFooter()}
`;
