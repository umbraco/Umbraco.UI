/**
 * Bundles the culori functions used by UUI color components into a single
 * ESM file at src/internal/vendor/culori.js.
 *
 * Run with: node scripts/vendor-culori.js
 * Re-run whenever culori is updated.
 */
import { build } from 'esbuild';
import { mkdir } from 'node:fs/promises';

await mkdir('src/internal/vendor', { recursive: true });

await build({
  entryPoints: ['scripts/culori-entry.mjs'],
  bundle: true,
  format: 'esm',
  outfile: 'src/internal/vendor/culori.js',
  external: [],
  treeShaking: true,
  minify: false,
  banner: {
    js: '// vendored from culori — re-run scripts/vendor-culori.js to update\n// culori is MIT licensed: https://github.com/Evercoder/culori\n',
  },
});

console.log('✓ src/internal/vendor/culori.js generated');
