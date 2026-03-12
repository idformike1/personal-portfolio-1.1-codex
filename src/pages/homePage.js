import { projects } from '../data/projects.js';
import { renderFooter, renderShell } from './shared.js';

const featured = projects.slice(0, 4)
  .map(
    (project, index) => `
      <li class="featured-work__item" data-project-card data-project-index="${index}" data-preview="${project.image}" data-accent="${project.accent}" data-services="${project.services}" data-year="${project.year}">
        <a href="/work" data-route-link data-cursor="view project">
          <div class="featured-work__row">
            <div class="featured-work__title">
              <h3>${project.title}</h3>
            </div>
            <div class="featured-work__service">
              <p>${project.services}</p>
            </div>
            <div class="featured-work__year">
              <p>${project.year}</p>
            </div>
          </div>
        </a>
      </li>
    `
  )
  .join('');

export const buildHomePage = () => `
  ${renderShell({ namespace: 'home', heroClass: 'theme-dark' })}
    <section class="home-header theme-dark" data-scroll-section>
      <div class="home-header__image" data-scroll data-scroll-speed="-2.5">
        <img src="https://dennissnellenberg.com/assets/img/DSC07033.jpg" alt="Dennis Snellenberg" />
      </div>
      <div class="home-header__hanger">
        <p><span>Located</span><span>in the</span><span>Netherlands</span></p>
        <div class="digital-ball" data-parallax-speed="0.2">
          <div class="globe"></div>
        </div>
      </div>
      <div class="container home-header__copy">
        <div class="row">
          <div class="flex-col">
            <div class="header-above-h4">↘</div>
            <h4><span>Freelance</span><span>Designer & Developer</span></h4>
          </div>
        </div>
      </div>
      <div class="home-header__name">
        <div class="home-header__name-track" data-home-marquee>
          <span>Snellenberg</span><span class="spacer">—</span><span>Dennis</span>
        </div>
      </div>
    </section>

    <section class="home-intro section" data-scroll-section>
      <div class="container">
        <div class="row">
          <div class="flex-col">
            <h2 data-split="chars">Helping brands thrive in the digital world.</h2>
          </div>
          <div class="flex-col">
            <p>
              Helping brands thrive in the digital world. Located in The Netherlands. Delivering tailor-made digital designs and building interactive websites from scratch.
            </p>
            <a href="/work" class="btn-round btn-round--small" data-route-link data-cursor="explore">About me</a>
          </div>
        </div>
      </div>
    </section>

    <section class="featured-work section" data-scroll-section>
      <div class="container">
        <div class="featured-work__head">
          <p class="eyebrow">Recent work</p>
          <a href="/work" data-route-link>All projects</a>
        </div>
        <div class="featured-work__preview" data-featured-preview aria-hidden="true">
          <div class="featured-work__preview-media">
            <img src="${projects[0].image}" alt="" data-featured-preview-image />
          </div>
          <div class="featured-work__preview-copy">
            <p class="eyebrow" data-featured-preview-meta>${projects[0].services} • ${projects[0].year}</p>
            <p data-featured-preview-title>${projects[0].title}</p>
          </div>
        </div>
        <ul class="featured-work__list">
          ${featured}
        </ul>
      </div>
    </section>

    <section class="archive-cta section" data-scroll-section>
      <div class="container">
        <a href="/work" class="archive-pill" data-route-link>More work <sup>11</sup></a>
      </div>
    </section>
  ${renderFooter()}
`;
