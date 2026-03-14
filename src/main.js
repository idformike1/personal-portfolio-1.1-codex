import './styles/variables.css';
import './styles/global.css';
import './styles/components.css';
import './styles/layout.css';
import 'locomotive-scroll/dist/locomotive-scroll.css';

import { buildHomePage } from './pages/homePage.js';
import { buildWorkPage } from './pages/workPage.js';
import { buildAboutPage } from './pages/aboutPage.js';
import { runLoaderAnimation } from './animations/loaderAnimation.js';
import { TransitionEngine } from './engine/transitionEngine.js';
import { mountSite } from './site.js';

const app = document.querySelector('[data-app]');

const getRouteConfig = (pathname = window.location.pathname) => {
  if (pathname === '/work') {
    return {
      namespace: 'work',
      body: buildWorkPage()
    };
  }

  if (pathname === '/about') {
    return {
      namespace: 'about',
      body: buildAboutPage()
    };
  }

  return {
    namespace: 'home',
    body: buildHomePage()
  };
};

const renderRoute = (pathname = window.location.pathname) => {
  const route = getRouteConfig(pathname);
  return `
    <div class="page-root" data-barba="container" data-barba-namespace="${route.namespace}">
      ${route.body}
    </div>
  `;
};

app.innerHTML = `
  <main class="site-main" data-barba="wrapper">
    <div class="loading-screen" data-loader>
      <div class="loading-screen__top"></div>
      <div class="loading-screen__words" data-loader-words>
        <span>Hello</span>
        <span>Bonjour</span>
        <span>Ciao</span>
        <span>Hola</span>
        <span>Hallo</span>
      </div>
      <div class="loading-screen__bottom"></div>
    </div>
    ${renderRoute()}
  </main>
`;

const state = {
  renderRoute,
  mounted: null
};

const mountCurrent = (container) => {
  state.mounted?.destroy?.();
  state.mounted = mountSite(container);
};

mountCurrent(document.querySelector('[data-barba="container"]'));

runLoaderAnimation({
  onComplete: () => {
    new TransitionEngine({
      renderRoute,
      onMount: mountCurrent,
      getMounted: () => state.mounted
    }).init();
  }
});
