export default async function run(page) {
  const sizes = [
    { name: 'wide-desktop', width: 1920, height: 1080 },
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'small-desktop', width: 1280, height: 800 },
    { name: 'wide-tablet', width: 980, height: 820 },
    { name: 'compact-desktop', width: 1100, height: 800 },
    { name: 'small-desktop', width: 1024, height: 768 },
    { name: 'medium-tablet', width: 900, height: 800 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'narrow-tablet', width: 600, height: 800 },
    { name: 'tablet-landscape', width: 1024, height: 768 },
    { name: 'mobile', width: 390, height: 844 },
    { name: 'small-mobile', width: 360, height: 800 },
    { name: 'narrow-mobile', width: 320, height: 740 },
  ];

  const results = [];
  for (const size of sizes) {
    await page.setViewportSize({ width: size.width, height: size.height });
    await page.evaluate(() => localStorage.setItem('site_lang', 'pt'));
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.evaluate(() => document.fonts.ready);
    await page.locator('.partners').scrollIntoViewIfNeeded();
    await page.waitForFunction(() => [...document.querySelectorAll('.partners-logos img')].every(img => img.complete && img.naturalWidth > 0));
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: `responsive-qa-${size.name}.png`, fullPage: true });
    results.push(await page.evaluate(({ name }) => {
      const rect = element => {
        const { x, y, width: w, height, right, bottom } = element.getBoundingClientRect();
        return { x: Math.round(x), y: Math.round(y), width: Math.round(w), height: Math.round(height), right: Math.round(right), bottom: Math.round(bottom) };
      };
      const menuButton = document.querySelector('.menu-toggle');
      const heroTitle = document.querySelector('.hero-title');
      const header = document.querySelector('.hero');
      const logos = [...document.querySelectorAll('.partners-logos img')];
      const overflowing = [...document.querySelectorAll('body *')]
        .filter(el => !el.matches('script, style, source') && el.getBoundingClientRect().width > 0)
        .filter(el => {
          const bounds = el.getBoundingClientRect();
          return bounds.left < -3 || bounds.right > innerWidth + 3;
        }).map(el => `${el.tagName.toLowerCase()}.${[...el.classList].join('.')}`).slice(0, 10);
      return {
        name,
        viewport: `${innerWidth}x${innerHeight}`,
        documentWidth: document.documentElement.scrollWidth,
        loadedMedia: { video: document.querySelector('video')?.readyState, heroBackground: getComputedStyle(header, '::before').backgroundImage.includes('fundo.png') },
        failedImages: [...document.images].filter(img => !img.complete || !img.naturalWidth).map(img => img.getAttribute('src')),
        horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
        overflowElements: overflowing,
        submenuItemsFitViewport: [...header.querySelectorAll('.submenu a')].every(el => el.getBoundingClientRect().left >= -1 && el.getBoundingClientRect().right <= innerWidth + 1),
        stylesApplied: getComputedStyle(heroTitle).fontSize,
        mobileMenuButtonVisible: getComputedStyle(menuButton).display !== 'none',
        mobileHeaderActionsVisible: innerWidth > 600 ? null : [...header.querySelectorAll('.topbar > .menu-toggle')].every(el => { const bounds = el.getBoundingClientRect(); return getComputedStyle(el).display !== 'none' && bounds.width > 0 && bounds.height > 0 && bounds.right <= innerWidth; }),
        valuesListFitsViewport: [...document.querySelectorAll('.pillar li')].every(el => el.getBoundingClientRect().right <= innerWidth + 1),
        navigationFitsViewport: [...header.querySelectorAll('.topbar > *')].filter(el => getComputedStyle(el).display !== 'none').every(el => el.getBoundingClientRect().left >= -1 && el.getBoundingClientRect().right <= innerWidth + 1),
        logoLoaded: logos.length === 5 && logos.every(img => img.complete && img.naturalWidth > 0),
        hero: rect(header),
        heading: rect(heroTitle),
        heroHeadingFitsHeader: rect(heroTitle).bottom <= rect(header).bottom,
        serviceCards: document.querySelectorAll('.service').length,
        partnerLogoCount: logos.length,
        desktopFooterHasFourColumns: innerWidth > 980 ? getComputedStyle(document.querySelector('.footer-grid')).gridTemplateColumns.split(' ').length === 4 : null,
      };
    }, size));
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => localStorage.setItem('site_lang', 'pt'));
  await page.reload({ waitUntil: 'domcontentloaded' });
  const menuButton = page.locator('.menu-toggle');
  await menuButton.click();
  const mobileMenu = await page.evaluate(() => ({ expanded: document.querySelector('.menu-toggle').getAttribute('aria-expanded'), visible: getComputedStyle(document.querySelector('.menu')).display !== 'none', links: [...document.querySelector('.menu').querySelectorAll('a')].filter(a => a.getBoundingClientRect().width > 0).length, horizontalOverflow: document.documentElement.scrollWidth > innerWidth }));
  const menuButtonLabelWhenOpen = await page.getAttribute('.menu-toggle', 'aria-label');
  await page.locator('.menu a[href="#inicio"]').click();
  const closedAfterNavigation = await page.evaluate(() => ({ expanded: document.querySelector('.menu-toggle').getAttribute('aria-expanded'), accessibleLabel: document.querySelector('.menu-toggle').getAttribute('aria-label'), visible: getComputedStyle(document.querySelector('.menu')).display !== 'none' }));

  const serviceRoutes = [
    ['#studio-btn', 'estudio-musical.html'],
    ['#agency-btn', 'agencia-artistica.html'],
    ['#events-btn', 'producao-eventos.html'],
    ['#design-btn', 'design-grafico.html'],
    ['#marketing-btn', 'marketing.html'],
  ];
  const originalPageCount = page.context().pages().length;
  const serviceNavigation = [];
  for (const [selector, route] of serviceRoutes) {
    await page.goto(new URL('index.html', page.url()).href, { waitUntil: 'domcontentloaded' });
    await page.locator(selector).click();
    await page.waitForURL(url => new URL(url).pathname.endsWith(`/${route}`));
    if (page.context().pages().length !== originalPageCount) throw new Error(`${selector} opened a new tab`);
    serviceNavigation.push({ selector, route, sameTab: true });
  }

  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto(new URL('index.html', page.url()).href, { waitUntil: 'domcontentloaded' });
  const wideTablet = await page.evaluate(() => ({ viewport: innerWidth, menuButtonVisible: getComputedStyle(document.querySelector('.menu-toggle')).display !== 'none', navWidth: Math.round(document.querySelector('.menu').getBoundingClientRect().width), menuRight: Math.round(document.querySelector('.menu').getBoundingClientRect().right), documentWidth: document.documentElement.scrollWidth }));

  const routeLayouts = [];
  for (const viewport of [{ width: 1440, height: 900 }, { width: 820, height: 900 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport);
    for (const route of ['estudio-musical.html', 'agencia-artistica.html', 'producao-eventos.html', 'design-grafico.html', 'marketing.html']) {
      await page.goto(new URL(route, page.url()).href, { waitUntil: 'domcontentloaded' });
      await page.evaluate(() => document.fonts.ready);
      const layout = await page.evaluate(({ route, viewport }) => {
        const heading = document.querySelector('main h1');
        return {
          route,
          viewport: `${viewport.width}x${viewport.height}`,
          horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
          headingVisible: Boolean(heading && heading.getBoundingClientRect().width > 0),
          menuButtonVisible: innerWidth <= 600 ? getComputedStyle(document.querySelector('.menu-toggle')).display !== 'none' : null,
        };
      }, { route, viewport });
      if (layout.horizontalOverflow || !layout.headingVisible) throw new Error(`Responsive layout failed: ${route} at ${layout.viewport}`);
      routeLayouts.push(layout);
    }
  }

  return { viewports: results, mobileMenu, menuButtonLabelWhenOpen, closedAfterNavigation, serviceNavigation, wideTablet, routeLayouts };
}
