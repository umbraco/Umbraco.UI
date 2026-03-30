/**
 * Post-build verification script.
 * Asserts that the dist output has the correct structure, side-effect imports,
 * and registration/element file separation. Run after `vite build`.
 *
 * The build can succeed while producing silently broken output (e.g. missing
 * bare side-effect imports means components won't register). This script
 * catches those regressions before they reach consumers.
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs';

let failures = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  pass: ${message}`);
  } else {
    console.error(`  FAIL: ${message}`);
    failures++;
  }
}

// ---------------------------------------------------------------------------
// 1. Key files exist
// ---------------------------------------------------------------------------
console.log('\n--- File existence ---');
assert(existsSync('dist/index.js'), 'dist/index.js exists');
assert(
  existsSync('dist/components/index.js'),
  'dist/components/index.js exists',
);
assert(
  existsSync('dist/components/button/button.js'),
  'dist/components/button/button.js exists',
);
assert(
  existsSync('dist/components/button/button.element.js'),
  'dist/components/button/button.element.js exists',
);
assert(existsSync('dist/themes/light.css'), 'dist/themes/light.css exists');
assert(existsSync('dist/themes/dark.css'), 'dist/themes/dark.css exists');

// ---------------------------------------------------------------------------
// 2. dist/index.js — bare side-effect imports
// ---------------------------------------------------------------------------
console.log('\n--- dist/index.js bare imports ---');
const indexJs = readFileSync('dist/index.js', 'utf8');
const indexBareImports = indexJs.match(/^import "[^"]+";$/gm) || [];

assert(
  indexBareImports.some(i => i.includes('internal/index.js')),
  'imports internal/index.js',
);
assert(
  indexBareImports.some(i => i.includes('styles/index.js')),
  'imports styles/index.js',
);
assert(
  indexBareImports.some(i => i.includes('components/index.js')),
  'imports components/index.js',
);
assert(
  indexBareImports.length === 3,
  `exactly 3 bare imports (got ${indexBareImports.length})`,
);

// ---------------------------------------------------------------------------
// 3. dist/components/index.js — registration bare imports
// ---------------------------------------------------------------------------
console.log('\n--- dist/components/index.js bare imports ---');
const compIndexJs = readFileSync('dist/components/index.js', 'utf8');
const compBareImports = compIndexJs.match(/^import "[^"]+";$/gm) || [];
const compElementBareImports = compBareImports.filter(i =>
  i.includes('.element.'),
);

assert(
  compBareImports.length > 0,
  `has registration bare imports (got ${compBareImports.length})`,
);
assert(
  compElementBareImports.length === 0,
  'no bare imports for .element. files',
);

// ---------------------------------------------------------------------------
// 4. Registration file: has defineElement + exports (cherry-pick pattern)
// ---------------------------------------------------------------------------
console.log('\n--- Registration file (button.js) ---');
const buttonJs = readFileSync('dist/components/button/button.js', 'utf8');

assert(buttonJs.includes('defineElement'), 'calls defineElement');
assert(
  buttonJs.includes('export') && buttonJs.includes('UUIButtonElement'),
  'exports UUIButtonElement',
);

// ---------------------------------------------------------------------------
// 5. Element file: pure class, no registration
// ---------------------------------------------------------------------------
console.log('\n--- Element file (button.element.js) ---');
const buttonElementJs = readFileSync(
  'dist/components/button/button.element.js',
  'utf8',
);

assert(
  !buttonElementJs.includes('defineElement'),
  'does NOT call defineElement',
);
assert(
  buttonElementJs.includes('from "lit"'),
  'imports from "lit" (externalized, not inlined)',
);

// ---------------------------------------------------------------------------
// 6. Source consistency: export count matches component folder count
// ---------------------------------------------------------------------------
console.log('\n--- Source consistency ---');
const srcComponentsIndex = readFileSync('src/components/index.ts', 'utf8');
const exportCount = (srcComponentsIndex.match(/^export \*/gm) || []).length;
const folderCount = readdirSync('src/components', {
  withFileTypes: true,
}).filter(d => d.isDirectory()).length;

assert(
  exportCount === folderCount,
  `src/components/index.ts exports (${exportCount}) match component folders (${folderCount})`,
);
assert(
  compBareImports.length === exportCount,
  `dist/components/index.js bare imports (${compBareImports.length}) match component count (${exportCount})`,
);

// ---------------------------------------------------------------------------
// Result
// ---------------------------------------------------------------------------
console.log('');
if (failures > 0) {
  console.error(`Build verification failed: ${failures} check(s) failed.`);
  process.exit(1);
} else {
  console.log('Build verification passed.');
}
