export const renderNavbar = ({ namespace, heroClass = '' }) => `
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
          <li><a href="/#about" data-route-link>About</a></li>
          <li><a href="/#contact" data-route-link>Contact</a></li>
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
        <a href="/#about" data-route-link>About</a>
        <a href="/#contact" data-route-link>Contact</a>
        <button class="nav-bar__menu" data-nav-toggle>
          <span></span>
          <span></span>
          <strong>Menu</strong>
        </button>
      </nav>
    </header>
`;
