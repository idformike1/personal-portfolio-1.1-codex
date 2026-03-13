export const renderFeaturedWorkList = (projects) => projects
  .slice(0, 4)
  .map(
    (project, index) => `
      <li class="featured-work__item" data-project-card data-project-index="${index}" data-preview="${project.image}" data-accent="${project.accent}" data-services="${project.services}" data-year="${project.year}">
        <a href="/work" data-route-link data-cursor="view project">
          <div class="featured-work__row">
            <div class="featured-work__title">
              <h3>${project.title}</h3>
              <span class="featured-work__highlight" aria-hidden="true"></span>
            </div>
            <div class="featured-work__client">
              <p>${project.location}</p>
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

export const renderWorkRows = (projects) => projects
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

export const renderWorkTiles = (projects) => projects
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
