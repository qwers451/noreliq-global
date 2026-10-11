/**
 * Превью работ для ленты проектов и строки «Selected work» на главной.
 *
 * Все превью собраны по одной схеме: общий светлый фон с осевой разметкой,
 * как у обложек-иконок (project-covers.mjs), и экран продукта целиком —
 * со скруглением и мягкой тенью. Экран не кадрируется по краям ячейки,
 * поэтому превью не выглядит обрезанным, а ячейка в вёрстке держит ту же
 * пропорцию 16:10, что и сам файл.
 *
 * Высокие кадры (Корт 01) берутся первым «экраном» 16:10 — так их видит
 * пользователь в окне браузера. Мобильное приложение — три экрана в ряд.
 *
 * Запуск: node scripts/project-previews.mjs, затем
 * node scripts/responsive-images.mjs для адаптивных вариантов.
 */
import sharp from "sharp";

sharp.cache(false);

const W = 2400;
const H = 1500;
const CX = W / 2;
const CY = H / 2;
const LINE = "#1c1d1f";

/** Фон один на все превью — так лента читается одной серией. */
const backdrop = (shadows) => `
  <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#f7f6f3"/>
        <stop offset="100%" stop-color="#e4e2dd"/>
      </linearGradient>
      <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="28" stdDeviation="40" flood-color="${LINE}" flood-opacity="0.2"/>
      </filter>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <g stroke="${LINE}" stroke-opacity="0.08" stroke-width="2" fill="none">
      <line x1="${CX}" y1="0" x2="${CX}" y2="${H}"/>
      <line x1="0" y1="${CY}" x2="${W}" y2="${CY}"/>
      <circle cx="${CX}" cy="${CY}" r="500"/>
    </g>
    <g filter="url(#soft)" fill="#fff">
      ${shadows.map((s) => `<rect x="${s.x}" y="${s.y}" width="${s.w}" height="${s.h}" rx="${s.r}"/>`).join("")}
    </g>
  </svg>`;

/** Экран со скруглёнными углами: маска dest-in срезает углы картинки. */
async function screen(file, w, h, r, crop) {
  let img = sharp(file);
  if (crop) img = img.extract(crop);
  const resized = await img.resize(w, h, { fit: "cover", position: "top" }).toBuffer();
  const mask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="${w}" height="${h}" rx="${r}" fill="#fff"/></svg>`,
  );
  return sharp(resized).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
}

async function desktop(out, file, crop) {
  // Экран 16:10 по центру, поля одинаковые со всех сторон по пропорции.
  const w = 1760;
  const h = 1100;
  const x = (W - w) / 2;
  const y = (H - h) / 2;
  const shot = await screen(file, w, h, 22, crop);
  const info = await sharp(Buffer.from(backdrop([{ x, y, w, h, r: 22 }])))
    .composite([{ input: shot, left: x, top: y }])
    .webp({ quality: 90 })
    .toFile(out);
  console.log(out, `${info.width}×${info.height}`, `${Math.round(info.size / 1024)} КБ`);
}

async function phones(out, files) {
  // Три экрана телефона одной высоты; пропорция исходников 786 × 1704.
  const h = 1180;
  const w = Math.round((h * 786) / 1704);
  const gap = 80;
  const total = files.length * w + (files.length - 1) * gap;
  const y = (H - h) / 2;
  const boxes = files.map((_, i) => ({ x: (W - total) / 2 + i * (w + gap), y, w, h, r: 56 }));
  const shots = await Promise.all(files.map((f) => screen(f, w, h, 56)));
  const info = await sharp(Buffer.from(backdrop(boxes)))
    .composite(shots.map((input, i) => ({ input, left: Math.round(boxes[i].x), top: y })))
    .webp({ quality: 90 })
    .toFile(out);
  console.log(out, `${info.width}×${info.height}`, `${Math.round(info.size / 1024)} КБ`);
}

const P = "public/projects/";
// У главной m-des.ru справа узкая полоса фона страницы — в превью
// она читалась бы как сбой, поэтому срезаем её с сохранением 16:10.
await desktop(`${P}m-des/preview.webp`, `${P}m-des/home.webp`, { left: 0, top: 0, width: 1976, height: 1235 });
await desktop(`${P}devcontest/preview.webp`, `${P}devcontest/solution.webp`);
// Дашборд Корт 01 высокий: берём его первый экран 16:10.
await desktop(`${P}court-01/preview.webp`, `${P}court-01/dashboard.webp`, { left: 0, top: 0, width: 2000, height: 1250 });
await phones(`${P}meet-up/preview.webp`, [`${P}meet-up/menu.webp`, `${P}meet-up/map.webp`, `${P}meet-up/booking.webp`]);
