import sharp from "/Users/vincent.qu/portfolio/node_modules/.pnpm/sharp@0.34.5/node_modules/sharp/lib/index.js";
import path from "node:path";

const SRC = path.resolve("public/oswald-wallpapers.png");
const OUT = path.resolve("public/oswald-circle.png");
const SIZE = 512; // final square favicon size

const img = sharp(SRC);
const meta = await img.metadata();
const side = Math.min(meta.width, meta.height); // center square side
const left = Math.round((meta.width - side) / 2);
const top = Math.round((meta.height - side) / 2);

// Center-square crop, resized to SIZE, then masked by a full-bleed circle.
const square = await sharp(SRC)
  .extract({ left, top, width: side, height: side })
  .resize(SIZE, SIZE)
  .png()
  .toBuffer();

const mask = Buffer.from(
  `<svg width="${SIZE}" height="${SIZE}"><circle cx="${SIZE / 2}" cy="${SIZE / 2}" r="${SIZE / 2}" fill="#fff"/></svg>`,
);

await sharp(square)
  .composite([{ input: mask, blend: "dest-in" }])
  .png()
  .toFile(OUT);

console.log(`Wrote ${OUT} (${SIZE}x${SIZE}, circular, from ${meta.width}x${meta.height} center crop)`);
