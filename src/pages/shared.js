export const renderShell = ({ namespace, heroClass = '' }) => `
  <div class="cursor-layer" aria-hidden="true">
    <div class="cursor cursor--dot" data-cursor-dot></div>
    <div class="cursor cursor--label" data-cursor-label-wrap><span data-cursor-label>View</span></div>
    <div class="cursor-preview" data-cursor-preview>
      <div class="cursor-preview__inner" data-cursor-preview-inner>
        <img alt="" data-cursor-preview-image />
      </div>
    </div>
  </div>

  <div class="nav-overlay" data-nav-overlay></div>
  <aside class="fixed-nav theme-dark" data-nav-panel>
    <div class="fixed-nav__curve"></div>
    <div class="fixed-nav__inner">
      <div class="fixed-nav__group">
        <p class="eyebrow">Navigation</p>
        <div class="stripe"></div>
        <ul class="fixed-nav__links">
          <li class="${namespace === 'home' ? 'is-active' : ''}"><a href="/" data-route-link>Home</a></li>
          <li class="${namespace === 'work' ? 'is-active' : ''}"><a href="/work" data-route-link>Work</a></li>
          <li><a href="/" data-route-link>About</a></li>
          <li><a href="/" data-route-link>Contact</a></li>
        </ul>
      </div>
      <div class="fixed-nav__group">
        <div class="stripe"></div>
        <p class="eyebrow">Socials</p>
        <div class="fixed-nav__socials">
          <a href="https://www.awwwards.com/dennissnellenberg/" target="_blank" rel="noreferrer">Awwwards</a>
          <a href="https://www.instagram.com/codebydennis/" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://twitter.com/codebydennis" target="_blank" rel="noreferrer">Twitter</a>
          <a href="https://www.linkedin.com/in/dennissnellenberg/" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
    </div>
  </aside>

  <button class="floating-menu" data-nav-toggle>
    <span></span>
    <span></span>
  </button>

  <div class="site-scroll" data-scroll-container>
    <header class="nav-bar ${heroClass}" data-scroll-section>
      <div class="credits-top">
        <a href="/" class="nav-bar__brand" data-route-link>
          <span class="nav-bar__brand-mark">©</span>
          <span class="nav-bar__brand-copy"><span class="code-by">Code by</span> <span class="dennis-name">Dennis Snellenberg</span></span>
        </a>
      </div>
      <nav class="nav-bar__links">
        <a class="${namespace === 'work' ? 'is-active' : ''}" href="/work" data-route-link>Work</a>
        <a href="/" data-route-link>About</a>
        <a href="/" data-route-link>Contact</a>
        <button class="nav-bar__menu" data-nav-toggle>
          <span></span>
          <span></span>
          <strong>Menu</strong>
        </button>
      </nav>
    </header>
`;

export const renderFooter = () => `
    <div class="footer-rounded-div" data-scroll-section>
      <div class="rounded-div-wrap">
        <div class="rounded-div"></div>
      </div>
    </div>
    <div class="footer-wrap theme-dark" data-scroll-section>
      <footer class="footer section" data-scroll-section>
        <div class="container medium">
          <div class="row footer__headline-row">
            <div class="flex-col">
              <div class="arrow">↗</div>
              <h2 data-split="lines"><span><i class="profile-picture"></i> Let’s work</span><span>together</span></h2>
            </div>
          </div>
          <div class="row footer__cta-row">
            <div class="flex-col">
              <div class="stripe"></div>
              <a href="/" class="btn-round" data-route-link data-cursor="explore">Get in touch</a>
            </div>
          </div>
          <div class="row footer__links-row">
            <div class="flex-col">
              <a href="mailto:info@dennissnellenberg.com" class="footer__email">info@dennissnellenberg.com</a>
              <a href="tel:+31627847430" class="footer__phone">+31 6 27 84 74 30</a>
            </div>
          </div>
        </div>
        <div class="container footer__bottom">
          <div>
            <p class="eyebrow">Version</p>
            <p>2022 © Edition</p>
          </div>
          <div>
            <p class="eyebrow">Local time</p>
            <p data-local-time></p>
          </div>
          <div>
            <p class="eyebrow">Socials</p>
            <div class="footer__socials">
              <a href="https://www.awwwards.com/dennissnellenberg/" target="_blank" rel="noreferrer">Awwwards</a>
              <a href="https://www.instagram.com/codebydennis/" target="_blank" rel="noreferrer">Instagram</a>
              <a href="https://twitter.com/codebydennis" target="_blank" rel="noreferrer">Twitter</a>
              <a href="https://www.linkedin.com/in/dennissnellenberg/" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
`;
