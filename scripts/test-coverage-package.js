import { execSync } from 'node:child_process';

const packageName = process.argv[2];
console.log('Test coverage for package: ' + packageName);

execSync(
  `vitest run "src/components/${packageName}" --coverage`,
  { stdio: 'inherit' },
);
