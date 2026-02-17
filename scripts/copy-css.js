import { cpSync, mkdirSync } from 'node:fs';

// Copy CSS files that aren't processed by Vite/tsc
const copies = [
  ['src/themes', 'dist/themes'],
  ['src/styles/custom-properties', 'dist/styles/custom-properties'],
  ['src/styles/typography', 'dist/styles/typography'],
  ['src/styles/uui-font.css', 'dist/styles/uui-font.css'],
  ['src/styles/uui-text.css', 'dist/styles/uui-text.css'],
  ['src/styles/custom-properties.css', 'dist/styles/custom-properties.css'],
];

for (const [src, dest] of copies) {
  cpSync(src, dest, { recursive: true });
}

console.log('CSS files copied to dist/');
