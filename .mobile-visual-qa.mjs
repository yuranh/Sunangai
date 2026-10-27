import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { setTimeout as delay } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(root, 'AUDITORIA_PRE_LANCAMENTO', 'evidencias', 'capturas-responsivas');
const chrome = path.join(os.homedir(), 'AppData', 'Local', 'ms-playwright', 'chromium-1243', 'chrome-win64', 'chrome.exe');
const profile = path.join(root, 'AUDITORIA_PRE_LANCAMENTO', 'evidencias', '.chromium-profile');
const pages = ['index.html', 'estudio-musical.html', 'agencia-artistica.html', 'design-grafico.html', 'producao-eventos.html', 'marketing.html'];
const viewports = [320, 375, 390, 430, 768, 1024, 1440];
const mime = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.mjs':'text/javascript; charset=utf-8', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.webp':'image/webp', '.svg':'image/svg+xml', '.mp4':'video/mp4', '.woff2':'font/woff2' };

fs.mkdirSync(outputDir, { recursive:true });
const server = createServer((req, res) => {
  let file;
  try { file = path.resolve(root, `.${decodeURIComponent(new URL(req.url, 'http://127.0.0.1').pathname)}`); }
  catch { res.writeHead(400).end(); return; }
  if (!file.startsWith(root + path.sep) && file !== root) { res.writeHead(403).end(); return; }
  if (file === root) file = path.join(root, 'index.html');
  fs.stat(file, (error, stat) => {
    if (error || !stat.isFile()) { res.writeHead(404).end(); return; }
    const headers = { 'Content-Type':mime[path.extname(file).toLowerCase()] || 'application/octet-stream', 'Accept-Ranges':'bytes' };
    const range = req.headers.range;
    if (range && path.extname(file).toLowerCase() === '.mp4') {
      const [startRaw, endRaw] = range.replace(/bytes=/, '').split('-');
      const start = Number(startRaw) || 0;
      const end = endRaw ? Math.min(Number(endRaw), stat.size - 1) : stat.size - 1;
      headers['Content-Range'] = `bytes ${start}-${end}/${stat.size}`;
      headers['Content-Length'] = end - start + 1;
      res.writeHead(206, headers);
      fs.createReadStream(file, { start, end }).pipe(res);
      return;
    }
    headers['Content-Length'] = stat.size;
    res.writeHead(200, headers);
    fs.createReadStream(file).pipe(res);
  });
});

await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}/`;
const port = 9229;
const browser = spawn(chrome, [
  '--headless=new', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage', '--no-first-run',
  `--remote-debugging-port=${port}`, '--remote-allow-origins=*', `--user-data-dir=${profile}`,
  '--autoplay-policy=no-user-gesture-required', `--window-size=1440,1000`, 'about:blank'
], { stdio:['ignore','ignore','pipe'] });
let browserErrors = '';
browser.stderr.on('data', chunk => { browserErrors += chunk.toString(); });

async function waitForDebugger() {
  for (let attempt = 0; attempt < 100; attempt++) {
    try { const response = await fetch(`http://127.0.0.1:${port}/json/list`); if (response.ok) return response.json(); }
    catch {}
    await delay(150);
  }
  throw new Error(`Chromium did not start. ${browserErrors.slice(-3000)}`);
}

let socket;
let nextId = 0;
const pending = new Map();
let activePage = '';
const browserDiagnostics = [];
function command(method, params = {}) {
  const id = ++nextId;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject, method }));
}

try {
  const targets = await waitForDebugger();
  socket = new WebSocket(targets.find(target => target.type === 'page').webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.addEventListener('open', resolve, { once:true }); socket.addEventListener('error', reject, { once:true }); });
  socket.addEventListener('message', event => {
    const message = JSON.parse(event.data);
    if (!message.id && message.method === 'Runtime.exceptionThrown') {
      const details = message.params.exceptionDetails;
      browserDiagnostics.push({ page:activePage, type:'javascript-exception', text:details?.text || details?.exception?.description || 'JavaScript exception' });
    }
    if (!message.id && message.method === 'Log.entryAdded') {
      const entry = message.params.entry;
      if (entry.level === 'error') browserDiagnostics.push({ page:activePage, type:'browser-console', text:entry.text?.slice(0,500) || 'Browser console error' });
    }
    if (!message.id && message.method === 'Network.responseReceived' && message.params.response.status >= 400) {
      browserDiagnostics.push({ page:activePage, type:'http-response', status:message.params.response.status, url:message.params.response.url });
    }
    if (message.id && pending.has(message.id)) {
      const task = pending.get(message.id); pending.delete(message.id);
      if (message.error) task.reject(new Error(`${task.method}: ${message.error.message}`)); else task.resolve(message.result || {});
    }
  });
  await command('Page.enable');
  await command('Runtime.enable');
  await command('Log.enable');
  await command('Network.enable');
  await command('Emulation.setDeviceMetricsOverride', { width:390, height:844, deviceScaleFactor:1, mobile:true });

  async function evaluate(expression, awaitPromise = false) {
    const response = await command('Runtime.evaluate', { expression, returnByValue:true, awaitPromise });
    if (response.exceptionDetails) throw new Error(response.exceptionDetails.text || 'Page evaluation failed');
    return response.result?.value;
  }
  async function navigate(url) {
    activePage = new URL(url).pathname.split('/').pop();
    await command('Page.navigate', { url });
    await evaluate(`new Promise(resolve => { if (document.readyState === 'complete') resolve(true); else { addEventListener('load', () => resolve(true), { once:true }); setTimeout(() => resolve(false), 8000); } })`, true);
    await evaluate('document.fonts.ready.then(() => true)', true);
    await delay(250);
  }
  async function screenshot(file, width) {
    const metrics = await command('Page.getLayoutMetrics');
    const height = Math.max(1, Math.ceil(metrics.cssContentSize.height));
    const shot = await command('Page.captureScreenshot', { format:'png', fromSurface:true, captureBeyondViewport:true, clip:{ x:0, y:0, width, height, scale:1 } });
    fs.writeFileSync(file, Buffer.from(shot.data, 'base64'));
  }

  const report = { generatedAt:new Date().toISOString(), base, viewports, pages:[], interactionChecks:[], browserDiagnostics, notes:[] };
  for (const page of pages) {
    for (const width of viewports) {
      const height = width <= 430 ? 844 : width <= 768 ? 1024 : width <= 1024 ? 900 : 1000;
      const mobile = width <= 600;
      await command('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor:1, mobile });
      await navigate(new URL(page, base).href);
      await evaluate("localStorage.setItem('site_lang','pt')");
      await evaluate("document.querySelectorAll('img[loading=lazy]').forEach(img => img.loading='eager')");
      await evaluate(`Promise.all([...document.images].map(img => new Promise(resolve => {
        if (img.complete) return resolve(img.naturalWidth > 0);
        img.addEventListener('load', () => resolve(true), { once:true });
        img.addEventListener('error', () => resolve(false), { once:true });
        setTimeout(() => resolve(false), 10000);
      })))`, true);
      await delay(80);
      await evaluate(`(async () => {
        const step = Math.max(240, Math.floor(innerHeight * 0.72));
        for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise(resolve => setTimeout(resolve, 45));
        }
        window.scrollTo(0, 0);
        await new Promise(resolve => setTimeout(resolve, 180));
        return true;
      })()`, true);
      if (page === 'index.html') {
        await evaluate("document.querySelector('.marketing-background-video')?.scrollIntoView({block:'center'})");
        await delay(450);
        await evaluate('window.scrollTo(0,0)');
        await delay(120);
      }
      const metrics = await evaluate(`(() => {
        const rect = el => { const r=el.getBoundingClientRect(); return {left:Math.round(r.left),right:Math.round(r.right),top:Math.round(r.top),bottom:Math.round(r.bottom),width:Math.round(r.width),height:Math.round(r.height)}; };
        const visible = el => { const s=getComputedStyle(el),r=el.getBoundingClientRect(); return s.display!=='none'&&s.visibility!=='hidden'&&r.width>0&&r.height>0; };
        const out=[...document.querySelectorAll('body *')].filter(el=>visible(el)&&!el.matches('script,style,source'))
          .filter(el=>{const r=el.getBoundingClientRect();return r.left < -2 || r.right > innerWidth+2;})
          .slice(0,16).map(el=>({tag:el.tagName.toLowerCase(),id:el.id||'',className:typeof el.className==='string'?el.className:'svg',...rect(el)}));
        const clipped=[...document.querySelectorAll('h1,h2,h3,p,a,button,li')].filter(visible).filter(el=>!el.matches('.events-heading,[aria-hidden="true"]'))
          .filter(el=>el.scrollWidth>el.clientWidth+3 && getComputedStyle(el).overflowX!=='auto')
          .slice(0,12).map(el=>({tag:el.tagName.toLowerCase(),id:el.id||'',text:(el.innerText||'').trim().slice(0,60),scrollWidth:el.scrollWidth,clientWidth:el.clientWidth}));
        const toggle=document.querySelector('.events-menu-toggle,.menu-toggle');
        const menu=document.querySelector('#main-menu');
        const video=document.querySelector('video');
        return {viewport:innerWidth+'x'+innerHeight,documentWidth:document.documentElement.scrollWidth,horizontalOverflow:document.documentElement.scrollWidth>innerWidth+1,
          overflowingElements:out,clippedText:clipped,h1:document.querySelector('h1')?rect(document.querySelector('h1')):null,
          menuButton:toggle?{visible:visible(toggle),label:toggle.getAttribute('aria-label')||'',expanded:toggle.getAttribute('aria-expanded')}:null,
          menuLinks:menu?[...menu.querySelectorAll('a')].length:0,serviceCards:document.querySelectorAll('.service,.event-card,.studio-service').length,
          images:[...document.images].map(i=>({src:i.getAttribute('src'),loaded:i.complete&&i.naturalWidth>0})),video:video?{src:video.currentSrc||video.querySelector('source')?.src,controls:video.controls,readyState:video.readyState,paused:video.paused,error:video.error?.code||0}:null,
          footerVisible:Boolean(document.querySelector('footer'))};
      })()`);
      const capture = `${path.basename(page,'.html')}-${width}.png`;
      await screenshot(path.join(outputDir,capture),width);
      report.pages.push({ page, width, height, screenshot:capture, ...metrics });

      if (width <= 600) {
        const interaction = await evaluate(`(() => {
          const button=document.querySelector('.events-menu-toggle,.menu-toggle'),menu=document.querySelector('#main-menu');
          if(!button||!menu)return {page:'${page}',width:${width},toggleFound:Boolean(button),menuFound:Boolean(menu)};
          button.click(); const opened=button.getAttribute('aria-expanded')==='true'&&getComputedStyle(menu).display!=='none';
          button.click(); const closed=button.getAttribute('aria-expanded')==='false'&&getComputedStyle(menu).display==='none';
          return {page:'${page}',width:${width},toggleFound:true,opened,closed};
        })()`);
        if (width === 390) report.interactionChecks.push(interaction);
      }
    }
  }
  activePage = 'index.html';
  await command('Emulation.setDeviceMetricsOverride', { width:390, height:844, deviceScaleFactor:1, mobile:true });
  await navigate(new URL('index.html', base).href);
  await evaluate("document.activeElement?.blur()");
  let tabReachedMenu = false;
  for (let attempt=0; attempt<12 && !tabReachedMenu; attempt++) {
    await command('Input.dispatchKeyEvent',{type:'keyDown',key:'Tab',code:'Tab',windowsVirtualKeyCode:9});
    await command('Input.dispatchKeyEvent',{type:'keyUp',key:'Tab',code:'Tab',windowsVirtualKeyCode:9});
    tabReachedMenu = await evaluate("document.activeElement?.matches('.menu-toggle')===true");
  }
  const keyboardMenu = await evaluate(`(()=>{
    const button=document.querySelector('.menu-toggle');
    const style=getComputedStyle(button);
    return {buttonFocusable:document.activeElement===button,tabReachedMenu:${tabReachedMenu},focusVisible:button.matches(':focus-visible'),focusIndicator:style.outlineStyle+':'+style.outlineWidth};
  })()`);
  await command('Input.dispatchKeyEvent',{type:'rawKeyDown',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});
  await command('Input.dispatchKeyEvent',{type:'char',key:'Enter',code:'Enter',text:'\r',unmodifiedText:'\r',windowsVirtualKeyCode:13});
  await command('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});
  const keyboardActivated=await evaluate(`(()=>({expanded:document.querySelector('.menu-toggle').getAttribute('aria-expanded'),visible:getComputedStyle(document.querySelector('#main-menu')).display!=='none'}))()`);
  keyboardMenu.keyboardActivationTested=true;
  keyboardMenu.openViaKeyboard=keyboardActivated.expanded==='true'&&keyboardActivated.visible;
  keyboardMenu.enterActivated=keyboardMenu.openViaKeyboard;
  if(!keyboardMenu.openViaKeyboard){
    await command('Input.dispatchKeyEvent',{type:'rawKeyDown',key:' ',code:'Space',windowsVirtualKeyCode:32});
    await command('Input.dispatchKeyEvent',{type:'keyUp',key:' ',code:'Space',windowsVirtualKeyCode:32});
    const spaceActivated=await evaluate(`(()=>({expanded:document.querySelector('.menu-toggle').getAttribute('aria-expanded'),visible:getComputedStyle(document.querySelector('#main-menu')).display!=='none'}))()`);
    keyboardMenu.spaceActivated=spaceActivated.expanded==='true'&&spaceActivated.visible;
    keyboardMenu.openViaKeyboard=keyboardMenu.openViaKeyboard||keyboardMenu.spaceActivated;
  }
  const menuStateAfterKeyboard=await evaluate(`(()=>({expanded:document.querySelector('.menu-toggle').getAttribute('aria-expanded'),visible:getComputedStyle(document.querySelector('#main-menu')).display!=='none'}))()`);
  keyboardMenu.openViaActivation=menuStateAfterKeyboard.expanded==='true'&&menuStateAfterKeyboard.visible;
  await command('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});
  await command('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});
  keyboardMenu.closedByEscape=(await evaluate("document.querySelector('.menu-toggle').getAttribute('aria-expanded')==='false'"));
  const contactKeyboard = await evaluate(`(()=>{
    const contact=document.querySelector('.contact-pill');
    contact?.focus();
    return {focusable:document.activeElement===contact,focusVisible:contact?.matches(':focus-visible')||false,href:contact?.getAttribute('href')||null};
  })()`);
  report.keyboardMenu = keyboardMenu;
  report.keyboardMenu.contactLink=contactKeyboard;
  report.links = await evaluate(`(()=>[...document.querySelectorAll('a[href]')].map(a=>({text:(a.innerText||a.getAttribute('aria-label')||'').trim().slice(0,80),href:a.getAttribute('href'),target:a.target||'',hasAccessibleName:Boolean((a.innerText||'').trim()||a.getAttribute('aria-label')||a.querySelector('img[alt]'))})))()`);
  report.seo = await evaluate(`(()=>({title:document.title,description:document.querySelector('meta[name=description]')?.content||null,lang:document.documentElement.lang,viewport:document.querySelector('meta[name=viewport]')?.content||null,canonical:document.querySelector('link[rel=canonical]')?.href||null,openGraph:[...document.querySelectorAll('meta[property^="og:"]')].map(m=>m.getAttribute('property')),headings:[...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(h=>({tag:h.tagName,text:(h.innerText||'').trim().slice(0,80)})),unnamedLinks:[...document.querySelectorAll('a[href]')].filter(a=>!(a.innerText||'').trim()&&!a.getAttribute('aria-label')&&!a.querySelector('img[alt]')).length,unnamedButtons:[...document.querySelectorAll('button')].filter(b=>!(b.innerText||'').trim()&&!b.getAttribute('aria-label')).length,imagesWithoutAlt:[...document.images].filter(i=>!i.hasAttribute('alt')||(!i.alt.trim()&&!i.getAttribute('role'))).map(i=>i.getAttribute('src'))}))()`);

  const manifest = `<!doctype html><meta charset="utf-8"><title>Sunangai mobile responsive captures</title><style>body{margin:0;background:#080808;color:#f7f4eb;font:16px Arial;padding:24px}h1,h2{color:#f4b400}section{margin:36px 0} .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:14px}figure{margin:0;background:#111;border:1px solid #765800;padding:8px}img{display:block;width:100%;height:310px;object-fit:contain;background:#030303}figcaption{padding:8px 2px}a{color:#f4b400}</style><h1>Capturas responsivas — Sunangai Project</h1><p>Comparação em 320, 375, 390, 430, 768, 1024 e 1440 px. Clique numa captura para abrir em tamanho original.</p>${pages.map(page=>`<section><h2>${page}</h2><div class="grid">${viewports.map(width=>{const name=`${path.basename(page,'.html')}-${width}.png`;return `<figure><a href="${name}"><img loading="lazy" src="${name}" alt="${page} em ${width}px"></a><figcaption>${width}px</figcaption></figure>`;}).join('')}</div></section>`).join('')}`;
  fs.writeFileSync(path.join(outputDir,'index.html'),manifest);
  fs.writeFileSync(path.join(outputDir,'report.json'),JSON.stringify(report,null,2));
  console.log(JSON.stringify({ outputDir, captures:report.pages.length, interactions:report.interactionChecks, overflows:report.pages.filter(item=>item.horizontalOverflow).map(item=>({page:item.page,width:item.width,documentWidth:item.documentWidth,elements:item.overflowingElements})), failedImages:report.pages.filter(item=>item.images.some(image=>!image.loaded)).map(item=>({page:item.page,width:item.width,images:item.images.filter(image=>!image.loaded)})), videoStates:report.pages.filter(item=>item.video).filter(item=>!item.video.controls||item.video.error).map(item=>({page:item.page,width:item.width,video:item.video})) },null,2));
} finally {
  try { socket?.close(); } catch {}
  browser.kill();
  server.close();
}
