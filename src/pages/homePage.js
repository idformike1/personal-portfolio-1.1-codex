import { projects } from '../data/projects.js';
import { renderFeaturedWorkList } from '../components/workList.js';
import { renderFooter, renderShell } from './shared.js';

const featured = renderFeaturedWorkList(projects);
const gallery = projects
  .slice(0, 8)
  .map(
    (project) => `
      <a class="home-gallery__tile" href="/work" data-route-link aria-label="${project.title}">
        <div class="home-gallery__frame">
          <img src="${project.image}" alt="${project.title}" loading="lazy" decoding="async" />
        </div>
      </a>
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

    <section class="home-intro section" id="about" data-scroll-section>
      <div class="container">
        <div class="row">
          <div class="flex-col">
            <h2 data-split="chars">Helping brands thrive in the digital world.</h2>
          </div>
          <div class="flex-col">
            <p>
              Helping brands thrive in the digital world. Located in The Netherlands. Delivering tailor-made digital designs and building interactive websites from scratch.
            </p>
            <a href="/#about" class="btn-round btn-round--small" data-route-link data-cursor="explore">About me</a>
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

    <section class="home-gallery section" data-scroll-section>
      <div class="container">
        <div class="home-gallery__grid" aria-label="Selected work">
          ${gallery}
        </div>
      </div>
    </section>
  ${renderFooter()}
`;
