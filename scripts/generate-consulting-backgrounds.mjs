// scripts/generate-consulting-backgrounds.mjs
// Génère 9 fonds .webp "Graphite & Cuivre" (2560x1200) dans /public/consulting/
// Nécessite Node 18+ et sharp : npm i -D sharp

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const W = 2560, H = 1200;
const OUT_DIR = path.resolve("public/consulting");

// Palettes R2 (graphite + cuivre + acier)
const C = {
  graphite1: "#151719",
  graphite2: "#1E2226",
  steel: "#7FA6C9",
  copper: "#D98E4A",
  ivory: "#FFE9D2",
  glowBlue: "#BBD5F5",
};

// util: dégradé linéaire de base
const baseGradient = (c1, c2, angle=25) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs>
      <linearGradient id="g" gradientTransform="rotate(${angle})">
        <stop offset="0%" stop-color="${c1}"/>
        <stop offset="100%" stop-color="${c2}"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
  </svg>`;

// overlay: bande sombre à gauche (lisibilité H1)
const leftSafe = (opacity=0.55, width=0.48) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs>
      <linearGradient id="mask" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="black" stop-opacity="${opacity}"/>
        <stop offset="${Math.round(width*100)}%" stop-color="black" stop-opacity="0.01"/>
        <stop offset="100%" stop-color="black" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#mask)"/>
  </svg>`;

// overlay: grille fine
const grid = (step=120, color="rgba(200,210,230,0.18)") => {
  let lines = "";
  for (let x=0; x<=W; x+=step) lines += `<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="${color}" stroke-width="1"/>`;
  for (let y=0; y<=H; y+=step) lines += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="${color}" stroke-width="1"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${lines}</svg>`;
};

// overlay: diagonales
const diagonals = (step=30, color="rgba(180,200,230,0.18)") => {
  let lines = "";
  for (let i=-W; i<=W*2; i+=step) {
    lines += `<line x1="${i}" y1="0" x2="${i+H}" y2="${H}" stroke="${color}" stroke-width="2"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${lines}</svg>`;
};

// overlay: anneaux concentriques
const rings = (cx=W*0.72, cy=H*0.5, from=120, to=520, step=60, color="rgba(200,220,255,0.18)") => {
  let circles = "";
  for (let r=from; r<=to; r+=step) circles += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="2"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${circles}</svg>`;
};

// overlay: “cartes/documents” (Ressources)
const docCards = (n=7, color="rgba(255,240,220,0.18)") => {
  let rects = "";
  const baseW = W*0.44, baseH = H*0.34;
  for (let i=0;i<n;i++) {
    const w = baseW + i*32, h = baseH + i*24;
    const x = W*0.62 - w/2 + i*12;
    const y = H*0.42 - h/2 + i*10;
    const op = Math.max(0.08, 0.18 - i*0.02);
    rects += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" ry="18" fill="none" stroke="rgba(255,240,220,${op})" stroke-width="2"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${rects}</svg>`;
};

// overlay: réseau courbes (Cas clients)
const network = (color="rgba(200,220,240,0.24)") => {
  const seg = [];
  for (let i=0;i<10;i++){
    const x1 = Math.floor(Math.random()*W*0.4);
    const y1 = Math.floor(100+Math.random()*(H-200));
    const x2 = Math.floor(W*0.55 + Math.random()*W*0.45);
    const y2 = Math.floor(100+Math.random()*(H-200));
    const mx = (x1+x2)/2 + (Math.random()*240-120);
    const my = (y1+y2)/2 + (Math.random()*360-180);
    seg.push(`M${x1},${y1} Q${mx},${my} ${x2},${y2}`);
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    ${seg.map(d=>`<path d="${d}" fill="none" stroke="${color}" stroke-width="2"/>`).join("")}
  </svg>`;
};

// overlay: lueurs cuivre/acier
const glow = (cx, cy, r, hex="#D98E4A", opacity=0.35) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <radialGradient id="glo" cx="50%" cy="50%">
      <stop offset="0%" stop-color="${hex}" stop-opacity="${opacity}"/>
      <stop offset="100%" stop-color="${hex}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#glo)"/>
</svg>
`;

// overlay: axes “tarifs”
const axes = () => {
  const x0 = Math.round(W*0.58), y0 = Math.round(H*0.25), yb = Math.round(H*0.8), xr = Math.round(W*0.9);
  let ticks = "";
  for (let i=0;i<6;i++){
    const y = Math.round(yb - i*(H*0.09));
    ticks += `<line x1="${x0-12}" y1="${y}" x2="${x0+12}" y2="${y}" stroke="rgba(200,220,240,0.18)" stroke-width="2"/>`;
  }
  for (let i=0;i<6;i++){
    const x = Math.round(x0 + i*(W*0.05));
    ticks += `<line x1="${x}" y1="${yb-12}" x2="${x}" y2="${yb+12}" stroke="rgba(200,220,240,0.18)" stroke-width="2"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <line x1="${x0}" y1="${y0}" x2="${x0}" y2="${yb}" stroke="rgba(200,220,240,0.24)" stroke-width="2"/>
    <line x1="${x0}" y1="${yb}" x2="${xr}" y2="${yb}" stroke="rgba(200,220,240,0.24)" stroke-width="2"/>
    ${ticks}
  </svg>`;
};

async function makeBg(name, layers) {
  const base = Buffer.from(baseGradient(C.graphite1, C.graphite2, 25));
  const composites = [];
  for (const l of layers) {
    composites.push({ input: Buffer.from(l.svg), top: 0, left: 0, blend: l.blend ?? "over" });
  }
  const outPath = path.join(OUT_DIR, name);
  fs.mkdirSync(OUT_DIR, { recursive: true });
  await sharp(base).resize(W,H).composite(composites).webp({ quality: 90 }).toFile(outPath);
  console.log("✓", outPath);
}

async function run() {
  await makeBg("consulting_hub_hero.webp", [
    { svg: grid(120) },
    { svg: diagonals(34, "rgba(170,190,220,0.16)") },
    { svg: glow(W*0.78, H*0.62, 520, C.copper, 0.35) },
    { svg: glow(W*0.62, H*0.28, 360, C.steel, 0.34) },
    { svg: leftSafe(0.55, 0.45) },
  ]);

  await makeBg("expertises_banner.webp", [
    { svg: baseGradient("#121416", "#1C2126", 12) },
    { svg: grid(100, "rgba(180,200,230,0.18)") },
    { svg: diagonals(56, "rgba(170,190,220,0.06)") },
    { svg: leftSafe(0.48, 0.42) },
  ]);

  await makeBg("cas_clients_hero.webp", [
    { svg: baseGradient("#101216", "#1B2126", 90) },
    { svg: network() },
    { svg: glow(W*0.70, H*0.30, 320, C.steel, 0.38) },
    { svg: glow(W*0.82, H*0.62, 320, C.copper, 0.34) },
    { svg: glow(W*0.55, H*0.78, 300, C.glowBlue, 0.3) },
    { svg: leftSafe(0.5, 0.46) },
  ]);

  await makeBg("ressources_hero.webp", [
    { svg: baseGradient("#14171A", "#1F252B", 35) },
    { svg: docCards(7) },
    { svg: glow(W*0.72, H*0.50, 420, C.steel, 0.32) },
    { svg: leftSafe(0.5, 0.45) },
  ]);

  await makeBg("faq_banner.webp", [
    { svg: baseGradient("#12151A", "#1A2026", 65) },
    { svg: rings(W*0.72, H*0.5, 120, 520, 60, "rgba(200,220,255,0.18)") },
    { svg: leftSafe(0.5, 0.45) },
  ]);

  await makeBg("tarifs_banner.webp", [
    { svg: baseGradient("#111418", "#1C2228", 15) },
    { svg: diagonals(30, "rgba(180,200,230,0.18)") },
    { svg: axes() },
    { svg: leftSafe(0.48, 0.44) },
  ]);

  await makeBg("offre_audit_72h_hero.webp", [
    { svg: baseGradient("#121318", "#1E232A", 25) },
    { svg: grid(96, "rgba(170,190,220,0.20)") },
    { svg: glow(W*0.30, H*0.60, 380, C.steel, 0.32) },
    { svg: leftSafe(0.5, 0.46) },
  ]);

  await makeBg("offre_sprint_hero.webp", [
    { svg: baseGradient("#14171A", "#1F252B", 10) },
    { svg: diagonals(22, "rgba(170,190,220,0.22)") },
    { svg: glow(W*0.78, H*0.58, 360, C.copper, 0.34) },
    { svg: leftSafe(0.48, 0.44) },
  ]);

  await makeBg("offre_run_mensuel_hero.webp", [
    { svg: baseGradient("#12161A", "#1B2128", 80) },
    { svg: rings(W*0.76, H*0.55, 120, 520, 56, "rgba(127,166,201,0.22)") },
    { svg: glow(W*0.76, H*0.55, 420, C.copper, 0.31) },
    { svg: leftSafe(0.48, 0.44) },
  ]);
}

run().catch((e) => { console.error(e); process.exit(1); });
