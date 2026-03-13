export const renderFooter = () => `
    <div class="footer-rounded-div" data-scroll-section>
      <div class="rounded-div-wrap">
        <div class="rounded-div"></div>
      </div>
    </div>
    <div class="footer-wrap footer-footer-wrap theme-dark" data-scroll-section>
      <footer class="footer section" id="contact">
        <div class="container medium">
          <div class="row footer__headline-row">
            <div class="flex-col">
              <div class="arrow">↗</div>
              <h2><span><i class="profile-picture"></i> Let’s work</span><span>together</span></h2>
            </div>
          </div>
          <div class="row footer__cta-row">
            <div class="flex-col">
              <div class="stripe"></div>
              <div class="btn-fixed">
                <a href="mailto:info@dennissnellenberg.com" class="btn-round" data-cursor="explore">Get in touch</a>
              </div>
            </div>
          </div>
          <div class="row footer__links-row">
            <div class="flex-col">
              <a href="mailto:info@dennissnellenberg.com" class="footer__contact-button footer__email">info@dennissnellenberg.com</a>
              <a href="tel:+31627847430" class="footer__contact-button footer__phone">+31 6 27 84 74 30</a>
            </div>
          </div>
        </div>
        <div class="container footer__bottom">
          <div>
            <p class="eyebrow">Version</p>
            <p>2026</p>
          </div>
          <div>
            <p class="eyebrow">Local time</p>
            <p data-local-time>Local time: --:--</p>
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
      <div class="overlay-gradient"></div>
    </div>
  </div>
`;
