import fs from 'node:fs';
import path from 'node:path';
const urls = JSON.parse(fs.readFileSync(new URL('./sitemap-urls.json', import.meta.url)));
const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map(u => `  <url><loc>${u}</loc></url>`).join('\n') +
  `\n</urlset>\n`;

const out = path.resolve('public', 'sitemap.xml');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, xml);
console.log(`✓ sitemap écrit -> ${out}`);
