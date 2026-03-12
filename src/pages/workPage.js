import { projects } from '../data/projects.js';
import { renderFooter, renderShell } from './shared.js';

const rows = projects
  .map(
    (project, index) => `
      <li class="project-row ${project.categories.join(' ')} visible" data-project-row data-categories="${project.categories.join(' ')}" data-preview="${project.image}" data-accent="${project.accent}" data-project-index="${index}">
        <a href="/" class="row" data-route-link data-cursor="view project">
          <div class="flex-col">
            <h4><span>${project.title}</span></h4>
          </div>
          <div class="flex-col">
            <p>${project.location}</p>
          </div>
          <div class="flex-col">
            <p>${project.services}</p>
          </div>
          <div class="flex-col">
            <p>${project.year}</p>
          </div>
        </a>
      </li>
    `
  )
  .join('');

const tiles = projects
  .map(
    (project, index) => `
      <li class="work-tile ${project.categories.join(' ')} visible" data-project-card data-categories="${project.categories.join(' ')}" data-preview="${project.image}" data-accent="${project.accent}" data-project-index="${index}">
        <a href="/" data-route-link data-cursor="view project">
          <div class="work-tile__image" style="--project-accent:${project.accent}">
            <img src="${project.image}" alt="${project.title}" loading="lazy" decoding="async" />
          </div>
          <div class="work-tile__meta">
            <h4>${project.title}</h4>
            <div class="stripe"></div>
            <p>${project.services}</p>
            <p>${project.year}</p>
          </div>
        </a>
      </li>
    `
  )
  .join('');

export const buildWorkPage = () => `
  ${renderShell({ namespace: 'work' })}
    <section class="default-header work-header" data-scroll-section>
      <div class="container medium">
        <div class="row">
          <div class="flex-col" data-split="lines">
            <h1><span>Creating next level</span><span>digital products</span></h1>
          </div>
        </div>
      </div>
    </section>

    <section class="hero-marquee hero-marquee--work" data-scroll-section>
      <div class="hero-marquee__track" data-marquee-track>
        <span>WORK</span><span>WORK</span><span>WORK</span><span>WORK</span><span>WORK</span>
      </div>
    </section>

    <section class="work-filters" data-scroll-section>
      <div class="container">
        <div class="filter-row">
          <div class="toggle-row">
            <button class="pill is-active" data-filter="all">All</button>
            <button class="pill" data-filter="design">Design <small>7</small></button>
            <button class="pill" data-filter="development">Development <small>11</small></button>
          </div>
          <div class="grid-row">
            <button class="view-toggle view-toggle--rows is-active" data-view="rows"><span></span></button>
            <button class="view-toggle" data-view="columns">Grid</button>
          </div>
        </div>
      </div>
    </section>

    <section class="section-wrap-work" data-scroll-section>
      <section class="work-grid small-work-grid grid-rows-part visible" data-view-panel="rows">
        <div class="container">
          <div class="grid-sub-title">
            <div class="flex-col"><h5>Client</h5></div>
            <div class="flex-col"><h5>Location</h5></div>
            <div class="flex-col"><h5>Services</h5></div>
            <div class="flex-col"><h5>Year</h5></div>
          </div>
          <ul class="work-items">
            ${rows}
          </ul>
        </div>
      </section>
      <section class="work-tiles grid-columns-part" data-view-panel="columns">
        <div class="container">
          <ul class="work-tiles__list">
            ${tiles}
          </ul>
        </div>
      </section>
    </section>

    <section class="archive-cta section" data-scroll-section>
      <div class="container">
        <a href="/" class="pill archive-pill" data-route-link>Archive <small>66</small></a>
      </div>
    </section>
  ${renderFooter()}
`;
