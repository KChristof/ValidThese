// Génère public/logo-cb.png (512 px) et public/og-image.png (1200×630) à partir de public/logo-cb.svg.
// Usage : node scripts/make-images.mjs  (nécessite sharp : npm i -D sharp)
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';

const svg = await readFile('public/logo-cb.svg');
await sharp(svg, { density: 600 }).resize(512, 512, { fit: 'contain', background: '#ffffff' }).png().toFile('public/logo-cb.png');

const logo = await sharp(svg, { density: 600 }).resize(250, 280, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
const panel = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#06223d"/>
  <rect x="780" y="0" width="420" height="630" fill="#ffffff"/>
  <rect x="0" y="600" width="780" height="30" fill="#45a149"/>
  <text x="80" y="230" font-family="Arial, Helvetica, sans-serif" font-size="92" font-weight="800" fill="#ffffff">Valid<tspan fill="#8fd694">Thèse</tspan></text>
  <text x="80" y="300" font-family="Arial, Helvetica, sans-serif" font-size="34" fill="#c9d8e5">par CEBI Stats</text>
  <text x="80" y="420" font-family="Arial, Helvetica, sans-serif" font-size="36" font-weight="700" fill="#ffffff">Analyse statistique des thèses</text>
  <text x="80" y="468" font-family="Arial, Helvetica, sans-serif" font-size="36" font-weight="700" fill="#ffffff">en sciences de la santé</text>
  <text x="80" y="540" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="#8fd694">Abidjan · validthese.cebistats.com</text>
</svg>`;
await sharp(Buffer.from(panel)).composite([{ input: logo, left: 865, top: 175 }]).png().toFile('public/og-image.png');
console.log('Images générées');
