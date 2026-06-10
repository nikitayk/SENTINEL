/**
 * Renders docs/engineering-decisions.html to a print-quality PDF via the system
 * Chrome (puppeteer-core) — A4, backgrounds on, with a footer page number.
 *   node scripts/make-pdf.mjs
 */
import puppeteer from 'puppeteer-core';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CHROME =
  process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const htmlPath = resolve(root, 'docs/engineering-decisions.html');
const outPath = resolve(root, 'docs/SENTINEL-Engineering-Decisions.pdf');

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--force-color-profile=srgb'],
});
try {
  const page = await browser.newPage();
  await page.goto('file://' + htmlPath, { waitUntil: 'networkidle0' });
  await page.pdf({
    path: outPath,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '<span></span>',
    footerTemplate:
      '<div style="width:100%;font-size:8px;color:#9aa3b2;font-family:Arial;' +
      'padding:0 14mm;display:flex;justify-content:space-between;">' +
      '<span>SENTINEL — Engineering Decision Record</span>' +
      '<span>Page <span class="pageNumber"></span> / <span class="totalPages"></span></span></div>',
    margin: { top: '14mm', bottom: '16mm', left: '14mm', right: '14mm' },
  });
  console.log('wrote', outPath.replace(root + '/', ''));
} finally {
  await browser.close();
}
