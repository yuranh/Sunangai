import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const pages = fs.readdirSync(root).filter(name => name.endsWith('.html')).sort();
const errors = [];
let internalPageLinks = 0;
let inlineScripts = 0;

for (const filename of fs.readdirSync(root).filter(name => name.endsWith('.css'))) {
  const css = fs.readFileSync(path.join(root, filename), 'utf8');
  for (const match of css.matchAll(/url\(([^)]+)\)/gi)) {
    const resource = match[1].trim().replace(/^['"]|['"]$/g, '');
    if (/^(?:https?:|data:|blob:|#)/i.test(resource)) continue;
    const target = path.resolve(root, path.dirname(filename), decodeURIComponent(resource.split(/[?#]/)[0]));
    if (!target.startsWith(root + path.sep) || !fs.existsSync(target)) errors.push(`${filename}: missing CSS asset "${resource}"`);
  }
}

for (const filename of pages) {
  const html = fs.readFileSync(path.join(root, filename), 'utf8');
  const title = html.match(/<title>([^<]+)<\/title>/i);
  const description = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
  const headings = [...html.matchAll(/<h1\b/gi)];
  if (!title) errors.push(`${filename}: missing title`);
  if (!description) errors.push(`${filename}: missing meta description`);
  if (headings.length !== 1) errors.push(`${filename}: expected one H1, found ${headings.length}`);

  const ids = [...html.matchAll(/\bid="([^"]+)"/gi)].map(match => match[1]);
  const idSet = new Set();
  for (const id of ids) {
    if (idSet.has(id)) errors.push(`${filename}: duplicate id "${id}"`);
    idSet.add(id);
  }
  for (const match of html.matchAll(/\baria-controls="([^"]+)"/gi)) {
    if (!idSet.has(match[1])) errors.push(`${filename}: aria-controls points to missing id "${match[1]}"`);
  }

  for (const match of html.matchAll(/\b(?:src|poster)="([^"]+)"/gi)) {
    const resource = match[1];
    if (/^(?:https?:|data:|blob:)/i.test(resource)) continue;
    const target = path.resolve(root, decodeURIComponent(resource.split(/[?#]/)[0]));
    if (!target.startsWith(root + path.sep) || !fs.existsSync(target)) errors.push(`${filename}: missing local asset "${resource}"`);
  }
  for (const match of html.matchAll(/url\(([^)]+)\)/gi)) {
    const resource = match[1].trim().replace(/^['"]|['"]$/g, '');
    if (/^(?:https?:|data:|blob:)/i.test(resource)) continue;
    const target = path.resolve(root, decodeURIComponent(resource.split(/[?#]/)[0]));
    if (!target.startsWith(root + path.sep) || !fs.existsSync(target)) errors.push(`${filename}: missing background asset "${resource}"`);
  }

  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    if (!/\balt\s*=/.test(match[0])) errors.push(`${filename}: image missing alt attribute`);
  }

  for (const match of html.matchAll(/<a\b[^>]*>/gi)) {
    const tag = match[0];
    const href = tag.match(/\bhref="([^"]*)"/i)?.[1];
    if (href == null) continue;
    if (href === '#') errors.push(`${filename}: empty placeholder link`);
    if (href.startsWith('#')) {
      const id = decodeURIComponent(href.slice(1));
      if (id && !idSet.has(id)) errors.push(`${filename}: missing fragment target "${id}"`);
      continue;
    }
    if (/^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(href)) continue;
    const [local, fragment] = href.split('#');
    const target = path.resolve(root, decodeURIComponent(local.split('?')[0]));
    if (!target.startsWith(root + path.sep) && target !== root) {
      errors.push(`${filename}: link escapes site root: ${href}`);
      continue;
    }
    if (!fs.existsSync(target)) errors.push(`${filename}: missing local destination "${href}"`);
    if (local.endsWith('.html')) {
      internalPageLinks++;
      if (/\btarget="_blank"/i.test(tag)) errors.push(`${filename}: internal link opens a new tab: ${href}`);
      if (fragment && fs.existsSync(target)) {
        const targetHtml = fs.readFileSync(target, 'utf8');
        if (!new RegExp(`\\bid="${fragment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`).test(targetHtml)) {
          errors.push(`${filename}: missing destination fragment "${href}"`);
        }
      }
    }
    if (/\btarget="_blank"/i.test(tag) && /^https?:/i.test(href) && !/\brel="[^"]*noopener/i.test(tag)) {
      errors.push(`${filename}: external new-tab link missing noopener: ${href}`);
    }
  }

  for (const match of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)) {
    const attributes = match[0].slice(0, match[0].indexOf('>'));
    if (/\bsrc=/i.test(attributes) || !match[1].trim()) continue;
    inlineScripts++;
    try { new Function(match[1]); }
    catch (error) { errors.push(`${filename}: inline script syntax error: ${error.message}`); }
  }

  if (/window\s*\.\s*open\s*\(/i.test(html)) errors.push(`${filename}: uses window.open()`);
  if (/class="lang-btn"|class="lang-switch"/.test(html)) errors.push(`${filename}: obsolete language selector remains`);
}

const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
for (const [id, route] of [
  ['studio-btn', 'estudio-musical.html'],
  ['agency-btn', 'agencia-artistica.html'],
  ['events-btn', 'producao-eventos.html'],
  ['design-btn', 'design-grafico.html'],
  ['marketing-btn', 'marketing.html'],
]) {
  const tag = [...index.matchAll(/<a\b[^>]*>/gi)].map(match => match[0]).find(value => value.includes(`id="${id}"`));
  if (!tag || !tag.includes(`href="${route}"`) || /\btarget="_blank"/i.test(tag)) {
    errors.push(`index.html: ${id} does not navigate in the same tab to ${route}`);
  }
}

if (errors.length) {
  console.error(errors.map(error => `FAIL ${error}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log(`PASS: ${pages.length} HTML pages, ${internalPageLinks} internal page links, ${inlineScripts} inline scripts, metadata, IDs, fragments and same-tab navigation.`);
}
