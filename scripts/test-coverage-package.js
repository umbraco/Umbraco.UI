import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

const packageName = process.argv[2];

// Validate against the component folder naming convention as a first guard.
if (!packageName || !/^[a-z0-9][a-z0-9-]*$/.test(packageName)) {
  console.error(
    `Invalid package name: "${packageName}". Expected a component folder name (lowercase letters, digits and hyphens).`,
  );
  process.exit(1);
}

console.log('Test coverage for package: ' + packageName);

// Run vitest without a shell: invoke node directly on vitest's CLI entry and
// pass the path as a discrete argument, so the CLI input can never be parsed
// as an OS command.
const require = createRequire(import.meta.url);
const vitestBin = join(
  dirname(require.resolve('vitest/package.json')),
  'vitest.mjs',
);

execFileSync(
  process.execPath,
  [vitestBin, 'run', `src/components/${packageName}`, '--coverage'],
  { stdio: 'inherit' },
);
