import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

const componentsDir = 'src/components';
const requested = process.argv[2];

// Resolve the requested name against the actual component folders and use the
// matched directory name (from the filesystem, not the CLI input) downstream,
// so untrusted CLI input never reaches the child process.
const packageName = readdirSync(componentsDir, { withFileTypes: true })
  .filter(entry => entry.isDirectory())
  .map(entry => entry.name)
  .find(name => name === requested);

if (!packageName) {
  console.error(
    `Unknown component: "${requested}". Expected one of the folders in ${componentsDir}/.`,
  );
  process.exit(1);
}

console.log('Test coverage for package: ' + packageName);

// Run vitest without a shell: invoke node directly on vitest's CLI entry and
// pass the path as a discrete argument array.
const require = createRequire(import.meta.url);
const vitestBin = join(
  dirname(require.resolve('vitest/package.json')),
  'vitest.mjs',
);

execFileSync(
  process.execPath,
  [vitestBin, 'run', join(componentsDir, packageName), '--coverage'],
  { stdio: 'inherit' },
);
