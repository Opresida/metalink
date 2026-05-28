#!/usr/bin/env node
/**
 * Gera a Open Graph image (1200x630) da META LINK CONSULTORIA.
 * Identidade "Sistema Vivo": fundo navy + grid + nós vermelhos + tipografia mono/serif.
 *
 * Uso: pnpm og:generate
 * Output: ./public/og-image.png
 */

import { chromium } from 'playwright';
import { writeFile, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = join(__dirname, '..', 'public', 'og-image.png');
const LOGO_PATH = join(__dirname, '..', 'public', 'icon-metalink.png');

const logoBase64 = (await readFile(LOGO_PATH)).toString('base64');
const logoDataUrl = `data:image/png;base64,${logoBase64}`;

const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,400&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; overflow: hidden; }
  body {
    background: #0A0E1A;
    color: #E8ECF5;
    font-family: 'Fraunces', serif;
    position: relative;
    padding: 56px 64px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  body::before {
    content: '';
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
    background-size: 56px 56px;
  }
  body::after {
    content: '';
    position: absolute;
    top: -200px; right: -200px;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(225,44,57,.18) 0%, transparent 70%);
  }
  .top, .mid, .bot { position: relative; z-index: 2; }
  .top { display: flex; justify-content: space-between; align-items: center; }
  .brand { display: flex; align-items: center; gap: 16px; }
  .brand img { width: 44px; height: 44px; }
  .brand-text {
    font-family: 'JetBrains Mono', monospace;
    font-size: 18px; font-weight: 500;
    letter-spacing: 0.12em; text-transform: uppercase;
  }
  .brand-text em { font-style: normal; color: #E12C39; }
  .live {
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px; color: #6B7591;
    display: flex; gap: 16px; align-items: center;
  }
  .live span:last-child { color: #E12C39; display: flex; align-items: center; gap: 8px; }
  .live span:last-child::before {
    content: ''; width: 8px; height: 8px; border-radius: 50%; background: #E12C39;
    box-shadow: 0 0 12px rgba(225,44,57,.6);
  }
  .mid { padding-left: 0; }
  .eyebrow {
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
    color: #E12C39;
    letter-spacing: 0.04em;
    margin-bottom: 28px;
    display: flex; align-items: center; gap: 12px;
  }
  .eyebrow::before {
    content: ''; width: 32px; height: 1px; background: #E12C39;
  }
  .title {
    font-family: 'Fraunces', serif;
    font-size: 92px;
    font-weight: 300;
    line-height: 0.98;
    letter-spacing: -0.035em;
    color: #E8ECF5;
    margin-bottom: 32px;
  }
  .title em {
    font-style: italic;
    color: #E12C39;
    font-weight: 400;
  }
  .sub {
    font-family: 'Fraunces', serif;
    font-size: 22px;
    font-weight: 300;
    line-height: 1.5;
    color: #6B7591;
    max-width: 720px;
  }
  .bot {
    display: flex; justify-content: space-between; align-items: flex-end;
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    color: #3E4660;
  }
  .bot-coords { display: flex; gap: 24px; }
  .bot-coords span span { color: #6B7591; }
  .bot-tag { color: #6B7591; }
  .dot-grid {
    position: absolute;
    top: 200px; right: 80px;
    width: 280px; height: 280px;
    z-index: 1;
  }
  .dot {
    position: absolute;
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #E12C39;
    box-shadow: 0 0 12px rgba(225,44,57,.5);
  }
  .line-svg {
    position: absolute; inset: 0; z-index: 1;
  }
</style>
</head>
<body>
  <svg class="line-svg" viewBox="0 0 1200 630" preserveAspectRatio="none">
    <line x1="864" y1="232" x2="996" y2="304" stroke="rgba(225,44,57,.4)" stroke-width="0.5"/>
    <line x1="996" y1="304" x2="912" y2="416" stroke="rgba(225,44,57,.4)" stroke-width="0.5"/>
    <line x1="912" y1="416" x2="1064" y2="380" stroke="rgba(225,44,57,.4)" stroke-width="0.5"/>
    <line x1="864" y1="232" x2="1064" y2="380" stroke="rgba(225,44,57,.25)" stroke-width="0.5"/>
    <line x1="864" y1="232" x2="912" y2="416" stroke="rgba(225,44,57,.2)" stroke-width="0.5"/>
  </svg>
  <div class="dot-grid">
    <div class="dot" style="top: 32px; left: 80px;"></div>
    <div class="dot" style="top: 104px; left: 212px;"></div>
    <div class="dot" style="top: 216px; left: 128px;"></div>
    <div class="dot" style="top: 180px; left: 280px;"></div>
  </div>

  <div class="top">
    <div class="brand">
      <img src="${logoDataUrl}" alt="META LINK" />
      <span class="brand-text">META<em>//</em>LINK</span>
    </div>
    <div class="live">
      <span>manaus·amazonas</span>
      <span>desde 2018</span>
    </div>
  </div>

  <div class="mid">
    <p class="eyebrow">inteligência · inovação · amazônia</p>
    <h1 class="title">Inteligência e inovação<br/>para a <em>Amazônia</em>.</h1>
    <p class="sub">Transformamos desafios amazônicos em soluções estruturantes, tecnológicas e sustentáveis — estratégia, tecnologia, ciência e território em um único movimento.</p>
  </div>

  <div class="bot">
    <div class="bot-coords">
      <span>lat <span style="color:#E12C39">-3.1190</span></span>
      <span>lng <span style="color:#E12C39">-60.0217</span></span>
      <span>desde <span style="color:#E12C39">2018</span></span>
    </div>
    <span class="bot-tag">/* meta//link · amazônia · 2026 */</span>
  </div>
</body>
</html>`;

async function main() {
  console.log('[og-image] launching...');
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => document.fonts.ready.then(() => true));
  await page.waitForTimeout(400);
  const buffer = await page.screenshot({ type: 'png', fullPage: false });
  await writeFile(OUTPUT_PATH, buffer);
  await browser.close();
  console.log(`[og-image:ok] ${OUTPUT_PATH}`);
}

main().catch((e) => { console.error('[og-image:error]', e); process.exit(1); });
