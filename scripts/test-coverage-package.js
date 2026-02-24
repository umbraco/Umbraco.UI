import { execSync } from 'node:child_process';

const packageName = process.argv[2];
console.log('Test coverage for package: ' + packageName);

execSync(
  `web-test-runner "src/components/${packageName}/**/*.test.ts" --node-resolve --coverage`,
  { stdio: 'inherit' },
);
